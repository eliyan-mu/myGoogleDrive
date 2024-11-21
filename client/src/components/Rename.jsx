import React, { useState } from "react";
import { useParams } from "react-router-dom";
const Rename = ({ item, user, data, rename, setRename, setData }) => {
  const { folder } = useParams();
  const [newName, setNewName] = useState(item.name);
  const url = "http://localhost:3000/users";

  async function handleRename(e) {
    e.preventDefault();
    try {
      const response = await fetch(
        folder
          ? `${url}/${user}/${folder}/${item.name}`
          : `${url}/${user}/${item.name}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify({
            newName: newName,
          }),
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        alert(errorMessage);
        return;
      }
      alert("renamed sucssefully");
      setRename(!rename);

      const updatedData = data.map((dataItem) => {
        if (dataItem.name === item.name) {
          return { ...dataItem, name: newName };
        }
        return dataItem;
      });
      setData(updatedData);
      console.log("data2: ", data);
    } catch (error) {
      console.log("error: ", error);
      alert("you have an error: ", error);
    }
  }
  return (
    <>
      <div>
        <label htmlFor="rename">rename:</label>
        <input
          type="text"
          id="rename"
          name="rename"
          value={newName}
          onChange={(e) => {
            setNewName(e.target.value);
          }}
          onClick={(e) => e.preventDefault()}
        />
        <button onClick={handleRename}> save</button>
      </div>
    </>
  );
};

export default Rename;
