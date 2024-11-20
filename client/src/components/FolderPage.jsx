import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Item from "./Item";

const FolderPage = ({ show }) => {
  const [data, setData] = useState([]);
  console.log("show: ", show);
  const url = "http://localhost:3000/users";
  useEffect(() => {
    async function fetchFolderPge() {
      try {
        const response = await fetch(`${url}/${show}`);
        if (!response.ok) throw Error("Did not recive data ");
        const fetchData = await response.json();
        setData(fetchData);
        console.log(data);
        return data;
      } catch (err) {
        console.log(err, "you have an error");
      }
    }
    fetchFolderPge();
  }, []);
  return (
    <div>
      <h1>folder page</h1>
      {data.length > 0 ? (
        data.map((item) => <Item key={item.name} item={item} />)
      ) : (
        <p>No items found.</p>
      )}
    </div>
  );
};

export default FolderPage;
