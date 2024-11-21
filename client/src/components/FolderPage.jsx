import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Item from "./Item";
import { useParams } from "react-router-dom";

const FolderPage = ({ user, currentUser }) => {
  const { folder } = useParams();
  const [data, setData] = useState([]);
  const navigate = useNavigate() 
  console.log("user: ", user);
  console.log("folder: ", folder);
  const url = "http://localhost:3000/users";

  useEffect(() => {
    async function fetchFolderPge() {
      try {
        if (currentUser && user){
        const response = await fetch(
          folder ? `${url}/${user}/${folder}` : `${url}/${user}`
        );
        if (!response.ok) throw Error("Did not recive data ");
        const fetchData = await response.json();
        setData(fetchData);
        console.log(data);
        return data;
      }else{navigate('/login')}
      } catch (err) {
        alert(err, "you have an error");
      }
    }
    fetchFolderPge();
  }, [folder]);
  return (
    <div className="item-container">
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
