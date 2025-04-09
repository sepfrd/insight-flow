import { useState } from "react";
import "../styles/create-blog-post.css";
import { useNavigate } from "react-router-dom";
import { blogPostServices } from "../api/blogPostServices";

export default function CreateBlogPost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmitButton = async (event) => {
    event.preventDefault();

    if (!title || !body) {
      return alert("Please fill out both fields.");
    }

    await blogPostServices.submitBlogPostAsync({ title, body });

    setTitle("");
    setBody("");

    navigate("/my-blog-posts");
  };

  return (
    <>
      <div class="blog-post-form">
        <h2>Create a New Blog Post</h2>

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
            onClick={() => navigate("/")}>
            Cancel
          </button>
          <button
            class="submit-btn"
            onClick={handleSubmitButton}>
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
