import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const FilePage = ({ name }) => {
  const { file } = useParams();
  const { folder } = useParams();
  const [data, setData] = useState([]);

  const url = "http://localhost:3000/users";
  useEffect(() => {
    async function fetchFile() {
      try {
        const response = await fetch(
          folder ? `${url}/${name}/${folder}/${file}` : `${url}/${name}/${file}`
        );
        if (!response.ok) throw Error("Did not recive data ");
        const fetchData = await response.text();
        setData(fetchData);
        console.log(data);
        return data;
      } catch (err) {
        console.log(err, "you have an error");
      }
    }
    fetchFile();
  }, []);

  return (
    <div>
      <h1>File Page</h1>
      <h2>{file}</h2>
      <h3>{data}</h3>
    </div>
  );
};

export default FilePage;
