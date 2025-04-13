import { useState } from "react";
import { blogPostServices } from "../api/blogPostServices";
import { BlogPosts } from "../components/BlogPosts";
import EditableBlogPostModal from "../components/EditableBlogPostModal";
import PaginatedResult from "../components/PaginatedResult";
import "../styles/blog-posts.css";
import "../styles/single-blog-post.css";

export default function UserBlogPosts() {
  const [showEditModal, setEditShowModal] = useState(false);
  const [editingPost, setEditingPost] = useState({ blogPostUuid: null, title: "", body: "" });
  const [deletingPostUuid, setDeletingPostUuid] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleEditButton = (blogPost) => {
    setEditingPost({ blogPostUuid: blogPost.uuid, title: blogPost.title, body: blogPost.body });

    setEditShowModal(true);
  };

  const handleDeleteButton = (blogPost) => {
    setDeletingPostUuid(blogPost.uuid);
    setShowDeleteModal(true);
  };

  const handleCancel = () => {
    setEditShowModal(false);
    setShowDeleteModal(false);
    setEditingPost(null);
  };

  const handleEditSubmit = async (newBlogPost) => {
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

    setEditShowModal(false);
  };

  const handleDeleteSubmit = async (blogPostUuid) => {
    await blogPostServices.deleteUserBlogPostAsync({ blogPostUuid });

    setShowDeleteModal(false);
  };

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      setEditShowModal(false);
      setShowDeleteModal(false);
    }
  };

  const fetchPage = (filters) => blogPostServices.getUserBlogPostsAsync(filters);

  const resultComponentBuilder = (items) => (
    <BlogPosts
      blogPostsList={items}
      isOwned={true}
      handleEditButton={handleEditButton}
      handleDeleteButton={handleDeleteButton}
    />
  );

  return (
    <>
      <div className={`blog-posts__content${showEditModal ? "--blurred" : ""}`}>
        <PaginatedResult
          fetchPage={fetchPage}
          resultComponentBuilder={resultComponentBuilder}
        />
      </div>
      {showEditModal && (
        <div
          className="blog-posts__modal"
          onClick={handleBackgroundClick}>
          <EditableBlogPostModal
            initialTitle={editingPost.title}
            initialBody={editingPost.body}
            formTitle="Update Blog Post"
            onCancel={handleCancel}
            onSubmit={handleEditSubmit}
          />
        </div>
      )}
      {showDeleteModal && (
        <div
          className="blog-posts__modal"
          onClick={handleBackgroundClick}>
          <div className="modal__overlay">
            <span>Are you sure you want to delete this blog post?</span>
            <div className="deleting-blog-post__buttons">
              <button
                className="deleting-blog-post__submit-button"
                onClick={() => handleDeleteSubmit(deletingPostUuid)}>
                <span>Yes, Delete it</span>
              </button>
              <button
                className="deleting-blog-post__cancel-button"
                onClick={handleCancel}>
                <span>No</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
