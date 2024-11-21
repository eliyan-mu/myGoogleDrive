const fs = require("fs");
const path = require("path");

function getFolderContent(folderPath, res) {
  fs.readdir(folderPath, (err, files) => {
    if (err) return res.status(500).send("Error reading folder");

    const fileDetails = [];

    files.forEach((file) => {
      const filePath = path.join(folderPath, file);

      fs.stat(filePath, (err, stats) => {
        if (err) return res.status(500).send("Error reading folder");
        fileDetails.push({
          name: file,
          type: stats.isDirectory() ? "folder" : "file",
          size: stats.size,
        });

        if (fileDetails.length === files.length) {
          res.json(fileDetails);
        }
      });
    });
  });
}

module.exports = getFolderContent;
