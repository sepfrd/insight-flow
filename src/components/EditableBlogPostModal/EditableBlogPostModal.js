import "@/styles/modal.css";
import { useState } from "react";
import styles from "./EditableBlogPostModal.module.css";

const EditableBlogPostModal = ({ initialTitle = "", initialBody = "", formTitle, onCancel, onSubmit }) => {
  const [blogPost, setBlogPost] = useState({ title: initialTitle, body: initialBody });

  const handleChange = (e) => {
    setBlogPost((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <div className="modal__overlay">
        <h2 className={styles.editableBlogPostHeader}>{formTitle}</h2>
        <label
          for="title"
          className={styles.editableBlogPostLabel}>
          Title
        </label>
        <input
          name="title"
          type="text"
          placeholder="Enter blog title"
          className={styles.editableBlogPostInput}
          required
          value={blogPost.title}
          onChange={handleChange}
        />

        <label
          for="body"
          className={styles.editableBlogPostLabel}>
          Body
        </label>
        <textarea
          name="body"
          type="text"
          placeholder="Write your blog post here..."
          className={styles.editableBlogPostTextArea}
          required
          value={blogPost.body}
          onChange={handleChange}></textarea>

        <div className={styles.editableBlogPostButtons}>
          <button
            className={styles.editableBlogPostCancelButton}
            onClick={onCancel}>
            Cancel
          </button>
          <button
            className={styles.editableBlogPostSubmitButton}
            onClick={() => onSubmit(blogPost)}>
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default EditableBlogPostModal;
