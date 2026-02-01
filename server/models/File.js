const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  originalName: String,
  name: String,
  size: Number,
  storagePath: String,
  uploadDate: { type: Date, default: Date.now },
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
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});

mongoose.model("files", fileSchema);
