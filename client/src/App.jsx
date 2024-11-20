import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import FilePage from "./components/FilePage";
import FolderPage from "./components/FolderPage";
import Register from "./components/Register";
function App() {
  const curretUser = {
    name: "eliyan",
  };

  console.log("curretUser.name: ", curretUser.name);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<FolderPage show={curretUser.name} />} />
          <Route path="/file/:file" element={<FilePage />} />
          <Route path="/folder/:folder" element={<FolderPage />} />
          <Route path="/folder/:folder/:file" element={<FilePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
