var express = require("express");
var router = express.Router();
const path = require("path");
const fs = require("fs");

// read file
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

// read folder
function getFolderContent(folderPath, res) {
  fs.readdir(folderPath, (err, files) => {
    if (err) return res.status(500).send("Error reading folder");

    const fileDetiles = [];

    files.forEach((file) => {
      const filePath = path.join(folderPath, file);

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
}

//delete file
function deletFile(filePath, res) {
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

//delete empty folder
function deletFolder(folderPath, res) {
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
        return res.status(404).send("file is not empty. can't delete");
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

// show user items
router.get("/:userName", async (req, res) => {
  const userPath = path.join("./", "users", req.params.userName);

  fs.access(userPath, fs.constants.F_OK, (err) => {
    if (err) {
      console.log(err);
      return res.status(404).send("User folder not found");
    }

    getFolderContent(userPath, res);
  });
});

//check if item is folder or file
router.get("/:userName/:item", async (req, res) => {
  const itemPath = path.join(
    "./",
    "users",
    req.params.userName,
    req.params.item
  );

  const userPath = path.join("./", "users", req.params.userName);
  fs.stat(itemPath, (err, stats) => {
    if (err) return res.status(500).send("Error reading folder");
    stats.isDirectory()
      ? getFolderContent(itemPath, res)
      : getFileContent(userPath, req, res);
  });
});

//read item in the folder
router.get("/:userName/:folder/:item", async (req, res) => {
  const nstedFilePath = path.join(
    "./",
    "users",
    req.params.userName,
    req.params.folder
  );
  fs.access(nstedFilePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.log(err);
      return res.status(404).send("User folder not found");
    }

    getFileContent(nstedFilePath, req, res);
  });
});

//Delete file or empty folder
router.delete("/:userName/:item", async (req, res) => {
  const itemPath = path.join(
    "./",
    "users",
    req.params.userName,
    req.params.item
  );
  fs.stat(itemPath, (err, stats) => {
    if (err) return res.status(500).send("Error reading folder");
    stats.isDirectory() ? deletFolder(itemPath, res) : deletFile(itemPath, res);
  });
});

//delete file in the folder
router.delete("/:userName/:folder/:file", async (req, res) => {
  const filePath = path.join(
    "./",
    "users",
    req.params.userName,
    req.params.folder,
    req.params.file
  );

  deletFile(filePath, res);
});

module.exports = router;
