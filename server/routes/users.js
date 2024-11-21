var express = require("express");
var router = express.Router();
const path = require("path");
const fs = require("fs");
const getFileContent = require("../controllers/getFileContent");
const getFolderContent = require("../controllers/getFolderContent");
const deleteFile = require("../controllers/deleteFile");
const deleteFolder = require("../controllers/deleteFolder");
const rename = require("../controllers/rename");

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
    stats.isDirectory()
      ? deleteFolder(itemPath, res)
      : deleteFile(itemPath, res);
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

  deleteFile(filePath, res);
});

//Rename file in folder
router.put("/:userName/:folder/:file", async (req, res) => {
  const filePath = path.join(
    "./",
    "users",
    req.params.userName,
    req.params.folder,
    req.params.file
  );
  rename(filePath, req, res);
});

//rename
router.put("/:userName/:item", async (req, res) => {
  console.log("userName: ");
  const filePath = path.join(
    "./",
    "users",
    req.params.userName,
    req.params.item
  );
  console.log("filePath: ", filePath);
  rename(filePath, req, res);
});

module.exports = router;
