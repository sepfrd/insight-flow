import { useState } from "react";
import "../styles/editable-blog-post.css";

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
      <div className="editable-blog-post">
        <h2>{formTitle}</h2>

        <label for="title">Title</label>
        <input
          name="title"
          type="text"
          placeholder="Enter blog title"
          required
          value={blogPost.title}
          onChange={handleChange}
        />

        <label for="body">Body</label>
        <textarea
          name="body"
          type="text"
          placeholder="Write your blog post here..."
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
