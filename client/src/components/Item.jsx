import React from "react";
// import { FaFolder, FaFile } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const Item = ({ item }) => {
  const { folder } = useParams();

  return (
    <Link
      to={
        folder
          ? `/folder/${folder}/file/${item.name}`
          : item.type === "file"
          ? `/file/${item.name}`
          : `/folder/${item.name}`
      }
      // onClick={() => setFile(item.name)}
    >
      <h2>Name: {item.name}</h2>
      <h2>Type: {item.type}</h2>
      <h3>Size: {item.size}</h3>
    </Link>
  );
};

export default Item;
