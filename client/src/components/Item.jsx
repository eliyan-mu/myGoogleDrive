import React from "react";
import { FaFolder, FaFile } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "../Item.css"; // Import the CSS file

const Item = ({ item, user, setData, data }) => {
  console.log("data1: ", data);
  const { folder } = useParams();
  const url = "http://localhost:3000/users";
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        folder
          ? `${url}/${user}/${folder}/${item.name}`
          : `${url}/${user}/${item.name}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        alert(errorMessage);
        return;
      }
      alert("deleted sucssefully");
      console.log("data: ", data);
      const updatedData = data.filter(
        (dataItem) => dataItem.name !== item.name
      );
      setData(updatedData);
    } catch (error) {
      console.log("error: ", error);
      alert("you have an error: ", error);
    }
  };

  return (
    <Link
      to={
        folder
          ? `/folder/${folder}/file/${item.name}`
          : item.type === "file"
          ? `/file/${item.name}`
          : `/folder/${item.name}`
      }
      className="item-link"
    >
      <div className={`item ${item.type}`}>
        {item.type === "folder" ? (
          <FaFolder className="item-icon folder-icon" />
        ) : (
          <FaFile className="item-icon file-icon" />
        )}
        <div className="item-info">
          <h2 className="item-name">{item.name}</h2>
          <h3 className="item-type">Type: {item.type}</h3>
          <h4 className="item-size">Size: {item.size}</h4>
          <button onClick={handleDelete}>delete</button>
        </div>
      </div>
    </Link>
  );
};

export default Item;
