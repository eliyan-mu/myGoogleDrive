import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Item from "./Item";
import { useParams } from "react-router-dom";

const FolderPage = ({ user }) => {
  const { folder } = useParams();
  const [data, setData] = useState([]);
  console.log("user: ", user);
  console.log("folder: ", folder);
  const url = "http://localhost:3000/users";
  useEffect(() => {
    async function fetchFolderPge() {
      try {
        const response = await fetch(
          folder ? `${url}/${user}/${folder}` : `${url}/${user}`
        );
        if (!response.ok) throw Error("Did not recive data ");
        const fetchData = await response.json();
        setData(fetchData);
        console.log(data);
        return data;
      } catch (err) {
        alert(err, "you have an error");
      }
    }
    fetchFolderPge();
  }, [folder]);
  return (
    <div>
      <h1>folder page</h1>
      {data.length > 0 ? (
        data.map((item) => (
          <Item
            key={item.name}
            item={item}
            user={user}
            setData={setData}
            data={data}
          />
        ))
      ) : (
        <p>No items found.</p>
      )}
    </div>
  );
};

export default FolderPage;
