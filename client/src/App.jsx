import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import FilePage from "./components/FilePage";
import FolderPage from "./components/FolderPage";
import Register from "./components/Register";
function App() {
  const [currentUser, setCurrentUser] = useState({});

  // console.log("curretUser.name: ", currentUser.name);
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <FolderPage user={currentUser.name} currentUser={currentUser} />
            }
          />
          <Route
            path="/file/:file"
            element={
              <FilePage name={currentUser.name} currentUser={currentUser} />
            }
          />
          <Route
            path="/folder/:folder"
            element={
              <FolderPage user={currentUser.name} currentUser={currentUser} />
            }
          />
          <Route
            path="/folder/:folder/file/:file"
            element={
              <FilePage name={currentUser.name} currentUser={currentUser} />
            }
          />
          <Route
            path="/register"
            element={<Register setCurrentUser={setCurrentUser} />}
          />
          <Route
            path="/login"
            element={<Login setCurrentUser={setCurrentUser} />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
