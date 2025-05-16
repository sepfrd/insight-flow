import "@/styles/modal.css";
import { useState } from "react";

import styles from "./Uploader.module.css";

const Uploader = ({ title, handleUpload }) => {
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
    <div className={styles.uploader}>
      <div className={`modal__overlay ${styles.uploaderModal}`}>
        <div className={styles.uploaderTitle}>{title}</div>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className={styles.uploaderInput}
        />
        {preview && (
          <div>
            <img
              src={preview}
              alt="Preview"
              className={styles.uploaderPreview}
            />
          </div>
        )}
        <button
          onClick={() => handleUpload(file)}
          className={styles.uploaderButton}>
          Upload
        </button>
      </div>
    </div>
  );
};

export default Uploader;
