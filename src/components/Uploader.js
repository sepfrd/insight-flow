import React, { useState } from "react";
import "../styles/modal.css";
import "../styles/uploader.css";

export default function Uploader({ title, handleUpload }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (event) => {
    const selected = event.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  return (
    <div className="uploader">
      <div className="uploader__modal modal__overlay">
        <div className="uploader__title">{title}</div>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="uploader__input"
        />
        {preview && (
          <div>
            <img
              src={preview}
              alt="Preview"
              className="uploader__preview"
            />
          </div>
        )}
        <button
          onClick={() => handleUpload(file)}
          className="uploader__button">
          Upload
        </button>
      </div>
    </div>
  );
}
