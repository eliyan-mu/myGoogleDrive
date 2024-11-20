var express = require("express");
var router = express.Router();
const path = require("path");
const fs = require("fs");

// show user items
router.get("/:userName", async (req, res) => {
  const userPath = path.join("./", "users", req.params.userName);

  fs.access(userPath, fs.constants.F_OK, (err) => {
    if (err) {
      console.log(err);
      return res.status(404).send("User folder not found");
    }

    fs.readdir(userPath, (err, files) => {
      if (err) return res.status(500).send("Error reading folder");

      const fileDetiles = [];

      files.forEach((file) => {
        const filePath = path.join(userPath, file);

        fs.stat(filePath, (err, stats) => {
          if (err) return res.status(500).send("Error reading folder");
          fileDetiles.push({
            name: file,
            type: stats.isDirectory() ? "directory" : "file",
            size: stats.size,
          });

          if (fileDetiles.length === files.length) {
            res.json(fileDetiles);
          }
        });
      });
    });
  });
});

// read file (not in folder)
router.get("/:userName/:file", async (req, res) => {
  const filePath = path.join(
    "./",
    "users",
    req.params.userName
    // req.params.file
  );
  console.log("filePath: ", filePath);
  const options = {
    root: filePath,
  };
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.log(err);
      return res.status(404).send("User folder not found");
    }
    console.log("req.params.file: ", req.params.file);
    res.sendFile(req.params.file, options, (err) => {
      if (err) {
        console.log(err);
        return res.status(404).send("User folder not found");
      }
    });
  });
});
module.exports = router;
