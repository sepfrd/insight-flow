import { useState } from "react";
import "../styles/editable-blog-post.css";
import "../styles/modal.css";

export default function EditableBlogPostModal({ initialTitle = "", initialBody = "", formTitle, onCancel, onSubmit }) {
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
        <h2 className="editable-blog-post__header">{formTitle}</h2>
        <label
          for="title"
          className="editable-blog-post__label">
          Title
        </label>
        <input
          name="title"
          type="text"
          placeholder="Enter blog title"
          className="editable-blog-post__input"
          required
          value={blogPost.title}
          onChange={handleChange}
        />

        <label
          for="body"
          className="editable-blog-post__label">
          Body
        </label>
        <textarea
          name="body"
          type="text"
          placeholder="Write your blog post here..."
          className="editable-blog-post__textarea"
          required
          value={blogPost.body}
          onChange={handleChange}></textarea>

        <div className="editable-blog-post__buttons">
          <button
            className="editable-blog-post__cancel-button"
            onClick={onCancel}>
            Cancel
          </button>
          <button
            className="editable-blog-post__submit-button"
            onClick={() => onSubmit(blogPost)}>
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
