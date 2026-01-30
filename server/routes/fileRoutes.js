const mongoose = require("mongoose");
const File = mongoose.model("files");
const User = mongoose.model("users");

const multer = require("multer");
const path = require("path");

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

module.exports = (app) => {
  app.post("/files/upload", upload.array("files", 10), async (req, res) => {
    try {
      const token = req.cookies?.token;
      if (!token) {
        return res.status(401).send("Unauthorized");
      }

      const user = await User.findById(token);
      if (!user) {
        return res.status(401).send("Unauthorized");
      }

      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: "Nessun file ricevuto" });
      }

      const savedFiles = await Promise.all(
        req.files.map((f) => {
          const newFile = new File({
            originalName: f.originalname,
            storagePath: f.path,
            owner: user.id,
            columnConfigs: [],
          });
          return newFile.save();
        }),
      );

      res.json(savedFiles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/files", async (req, res) => {
    try {
      const token = req.cookies?.token;
      if (!token) {
        return res.status(401).send("Unauthorized");
      }

      const user = await User.findById(token);
      if (!user) {
        return res.status(401).send("Unauthorized");
      }

      const files = await File.find({ owner: user.id });
      res.json(files);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/files/:id", async (req, res) => {
    try {
      const token = req.cookies?.token;
      if (!token) {
        return res.status(401).send("Unauthorized");
      }

      const user = await User.findById(token);
      if (!user) {
        return res.status(401).send("Unauthorized");
      }

      const file = await File.findById(req.params.id);
      if (!file) {
        return res.status(404).json({ error: "File not found" });
      }

      if (file.owner.toString() !== user.id.toString()) {
        return res.status(403).json({ error: "Unauthorized" });
      }

      res.json(file);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.put("/files/:id", async (req, res) => {
    try {
      const token = req.cookies?.token;
      if (!token) {
        return res.status(401).send("Unauthorized");
      }

      const user = await User.findById(token);
      if (!user) {
        return res.status(401).send("Unauthorized");
      }

      const file = await File.findById(req.params.id);
      if (!file) {
        return res.status(404).json({ error: "File not found" });
      }

      if (file.owner.toString() !== user.id.toString()) {
        return res.status(403).json({ error: "Unauthorized" });
      }

      const updatedFile = await File.findByIdAndUpdate(req.params.id, req.body);
      res.json(updatedFile);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.delete("/files/:id", async (req, res) => {
    try {
      const token = req.cookies?.token;
      if (!token) {
        return res.status(401).send("Unauthorized");
      }

      const user = await User.findById(token);
      if (!user) {
        return res.status(401).send("Unauthorized");
      }

      const file = await File.findById(req.params.id);
      if (!file) {
        return res.status(404).json({ error: "File not found" });
      }

      if (file.owner.toString() !== user.id.toString()) {
        return res.status(403).json({ error: "Unauthorized" });
      }

      const deletedFile = await File.findByIdAndDelete(req.params.id);
      res.json(deletedFile);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};
