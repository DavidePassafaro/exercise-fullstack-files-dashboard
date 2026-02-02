const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  name: String,
  originalName: String,
  type: {
    type: String,
    enum: ["csv"],
    default: "csv",
  },
  size: Number,
  uploadDate: { type: Date, default: Date.now },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  storagePath: String,
  columnConfigs: [
    {
      columnName: String,
      dataType: {
        type: String,
        enum: ["text", "number", "date"],
        default: "text",
      },
    },
  ],
});

mongoose.model("files", fileSchema);
