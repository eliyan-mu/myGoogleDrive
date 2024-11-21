const fs = require("fs");
const path = require("path");

function rename(itemPath, req, res) {
  console.log("itemPath: ", itemPath);
  fs.access(itemPath, fs.constants.F_OK, (err) => {
    if (err) {
      console.log(err);
      return res.status(404).send("File not found");
    }
    const newFilePath = path.join(path.dirname(itemPath), req.body.newName);
    console.log("newFilePath: ", newFilePath);

    fs.rename(itemPath, newFilePath, () => {
      if (err) {
        console.log("Error in unlink file", err);
        return res.status(500).send("Error renamed the file");
      }
      res.status(200).send("File renamed successfully");
    });
  });
}

module.exports = rename;
