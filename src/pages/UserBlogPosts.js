import { useState } from "react";
import { blogPostServices } from "../api/blogPostServices";
import { BlogPosts } from "../components/BlogPosts";
import EditableBlogPostModal from "../components/EditableBlogPostModal";
import PaginatedResult from "../components/PaginatedResult";
import "../styles/blog-post.css";

export default function UserBlogPosts() {
  const [showModal, setShowModal] = useState(false);
  const [editingPost, setEditingPost] = useState({ blogPostUuid: null, title: "", body: "" });

  const handleEditButton = (blogPost) => {
    setEditingPost({ blogPostUuid: blogPost.uuid, title: blogPost.title, body: blogPost.body });

    setShowModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
    setEditingPost(null);
  };

  const handleSubmit = async (newBlogPost) => {
    if (!newBlogPost.title || !newBlogPost.body) {
      return alert("Please fill out both fields.");
    }

    if (newBlogPost.title === editingPost.title && newBlogPost.body === editingPost.body) {
      return alert("Identical Content");
    }

    await blogPostServices.updateUserBlogPostAsync({
      blogPostUuid: editingPost.blogPostUuid,
      newTitle: newBlogPost.title,
      newBody: newBlogPost.body,
    });

    setShowModal(false);
  };

  const fetchPage = (filters) => blogPostServices.getUserBlogPostsAsync(filters);
  const resultComponentBuilder = (items) => (
    <BlogPosts
      blogPostsList={items}
      isEditable={true}
      handleEditButton={handleEditButton}
    />
  );

  return (
    <>
      <div className={`page-content ${showModal ? "blurred" : ""}`}>
        <PaginatedResult
          fetchPage={fetchPage}
          resultComponentBuilder={resultComponentBuilder}
        />
      </div>
      {showModal && (
        <div className="modal-overlay">
          <EditableBlogPostModal
            initialTitle={editingPost.title}
            initialBody={editingPost.body}
            formTitle="Update Blog Post"
            onCancel={handleCancel}
            onSubmit={handleSubmit}
          />
        </div>
      )}
    </>
  );
}
