const fs = require("fs");

function deleteFolder(folderPath, res) {
  fs.access(folderPath, fs.constants.F_OK, (err) => {
    if (err) {
      console.log(err);
      return res.status(404).send("File not found");
    }
    fs.readdir(folderPath, (err, files) => {
      if (err) {
        console.log("Error reading folder:", err);
        return;
      }

      if (files.length !== 0) {
        return res.status(404).send("Folder is not empty. Can't delete");
      } else {
        fs.rmdir(folderPath, (err) => {
          if (err) {
            console.log("Error deleting folder:", err);
          } else {
            res.status(200).send("Folder deleted successfully");
          }
        });
      }
    });
  });
}

module.exports = deleteFolder;
