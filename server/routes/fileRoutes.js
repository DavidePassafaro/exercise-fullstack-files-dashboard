const path = require("path");
const multer = require("multer");
const { fileTypeFromFile } = require("file-type");
const mongoose = require("mongoose");
const File = mongoose.model("files");
const User = mongoose.model("users");

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // Rename file with timestamp to avoid collisions
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Authentication middleware
const requireAuth = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).send("Unauthorized: No token provided");
    }

    const user = await User.findById(token);
    if (!user) {
      return res.status(401).send("Unauthorized: User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error during authentication" });
  }
};

// File existence and ownership middleware
const requireFileExistenceAndOwnership = async (req, res, next) => {
  try {
    const file = await File.findById(req.params.id);

    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }

    if (file.owner.toString() !== req.user.id.toString()) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    req.targetFile = file;
    next();
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error during file verification" });
  }
};

// File Type utility function
const getFileType = async (file) => {
  const typeInfo = await fileTypeFromFile(file.path);
  const extension = path.extname(file.originalname).toLowerCase();

  const excelMimes = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-excel",
    "application/x-cfb",
  ];

  if (typeInfo && excelMimes.includes(typeInfo.mime)) {
    return "excel";
  }

  if (extension === ".csv" || file.mimetype === "text/csv") {
    return "csv";
  }

  if (extension === ".xlsx" || extension === ".xls") {
    return "excel";
  }

  return "unknown";
};

module.exports = (app) => {
  app.post(
    "/files/upload",
    requireAuth,
    upload.array("files", 10),
    async (req, res) => {
      try {
        if (!req.files || req.files.length === 0) {
          return res.status(400).json({ error: "No files uploaded" });
        }

        const savedFiles = await Promise.all(
          req.files.map(async (f) => {
            const newFile = new File({
              name: f.originalname,
              originalName: f.originalname,
              type: await getFileType(f),
              size: f.size,
              storagePath: f.path,
              owner: req.user.id,
              columnConfigs: [],
            });
            return newFile.save();
          }),
        );

        res.json(savedFiles);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },
  );

  app.get("/files", requireAuth, async (req, res) => {
    try {
      const files = await File.find({ owner: req.user.id });
      res.json(files);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get(
    "/files/:id",
    requireAuth,
    requireFileExistenceAndOwnership,
    async (req, res) => {
      try {
        res.json(req.targetFile);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },
  );

  app.put(
    "/files/:id",
    requireAuth,
    requireFileExistenceAndOwnership,
    async (req, res) => {
      try {
        const updatedFile = await File.findByIdAndUpdate(
          req.params.id,
          req.body,
        );
        res.json(updatedFile);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },
  );

  app.delete(
    "/files/:id",
    requireAuth,
    requireFileExistenceAndOwnership,
    async (req, res) => {
      try {
        const deletedFile = await File.findByIdAndDelete(req.params.id);
        res.json(deletedFile);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },
  );
};
