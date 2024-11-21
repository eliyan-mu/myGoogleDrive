const fs = require("fs");

function deleteFile(filePath, res) {
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.log(err);
      return res.status(404).send("File not found");
    }
    fs.unlink(filePath, (err) => {
      if (err) {
        console.log("Error in unlink file", err);
        return res.status(500).send("Error deleting the file");
      }
      res.status(200).send("File deleted successfully");
    });
  });
}

module.exports = deleteFile;
