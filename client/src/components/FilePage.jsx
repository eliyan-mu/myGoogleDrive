import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const FilePage = ({ name, currentUser }) => {
  const { file } = useParams();
  const { folder } = useParams();
  const [data, setData] = useState([]);
  const navigate = useNavigate() 
  const url = "http://localhost:3000/users";

  useEffect(() => {
    async function fetchFile() {
      try {
        if (currentUser && name){
        const response = await fetch(
          folder ? `${url}/${name}/${folder}/${file}` : `${url}/${name}/${file}`
        );
        if (!response.ok) throw Error("Did not recive data ");
        const fetchData = await response.text();
        setData(fetchData);
        console.log(data);
        return data;
      }else{navigate('/login')}
      } catch (err) {
        console.log(err, "you have an error");
      }
    }
    fetchFile();
  }, []);

  return (
    <div className="file-wrapper">
      <h2>{file}</h2>
      <h3>{data}</h3>
    </div>
  );
};

export default FilePage;
