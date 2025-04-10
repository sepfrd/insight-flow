import { useState } from "react";
import "../styles/create-blog-post.css";

export default function EditableBlogPostModal({ initialTitle = "", initialBody = "", formTitle, onCancel, onSubmit }) {
  const [title, setTitle] = useState(initialTitle);
  const [body, setBody] = useState(initialBody);

  return (
    <>
      <div class="blog-post-form">
        <h2>{formTitle}</h2>

        <label for="title">Title</label>
        <input
          type="text"
          id="title"
          placeholder="Enter blog title"
          required
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <label for="body">Body</label>
        <textarea
          id="body"
          placeholder="Write your blog post here..."
          required
          value={body}
          onChange={(event) => setBody(event.target.value)}></textarea>

        <div class="button-group">
          <button
            class="cancel-btn"
            onClick={onCancel}>
            Cancel
          </button>
          <button
            class="submit-btn"
            onClick={() => onSubmit({ title, body })}>
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
