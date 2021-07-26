import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

FileUpload.propTypes = {};

const BASE_URL = "http://localhost:8081";

function FileUpload(props) {
  const [imageData, setImageData] = useState(null);

  const uploadImage = async (imageData) => {
    const response = await axios.post(BASE_URL + `/upload`, imageData, {
      onUploadProgress: (progressEvent) => {
        console.log(
          "Uploading : " +
            ((progressEvent.loaded / progressEvent.total) * 100).toString() +
            "%"
        );
      },
    });
  };

  const handleImageChange = (e) => {
    let file = e.target.files[0];
    const imageData = new FormData();
    imageData.append("imageFile", file);
    setImageData(imageData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handle Submit");
    uploadImage(imageData);
  };

  return (
    <div className="file-upload">
      <h1>File upload</h1>

      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleImageChange} />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default FileUpload;
