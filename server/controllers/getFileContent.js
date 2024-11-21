const fs = require("fs");

function getFileContent(filePath, req, res) {
  console.log("filePath: ", filePath);
  const options = {
    root: filePath,
  };
  try {
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        console.log(err);
        return res.status(404).send("User folder not found");
      }
      console.log("req.params.item: ", req.params.item);
      res.sendFile(req.params.item, options, (err) => {
        if (err) {
          console.log(err);
          return res.status(404).send("User folder not found");
        }
      });
    });
  } catch (err) {
    console.error(err);
  }
}

module.exports = getFileContent;
