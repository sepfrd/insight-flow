import { blogPostService } from "@/api/blogPostService";
import BlogPosts from "@/components/BlogPosts";
import EditableBlogPostModal from "@/components/EditableBlogPostModal";
import PaginatedResult from "@/components/PaginatedResult";
import "@/styles/modal.css";
import "@/styles/single-blog-post.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/useToast";

const UserBlogPosts = () => {
  const [showEditModal, setEditShowModal] = useState(false);
  const [editingPost, setEditingPost] = useState({ blogPostUuid: null, title: "", body: "" });
  const [deletingPostUuid, setDeletingPostUuid] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { isAuthenticated, onLogout } = useAuth();
  const { setMessage } = useToast();
  const navigate = useNavigate();

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
      setMessage({ type: "error", text: "Please fill out both fields." });
      return;
    }

    if (newBlogPost.title === editingPost.title && newBlogPost.body === editingPost.body) {
      setMessage({ type: "error", text: "Identical Content!" });
      return;
    }

    await blogPostService.updateUserBlogPostAsync({
      blogPostUuid: editingPost.blogPostUuid,
      newTitle: newBlogPost.title,
      newBody: newBlogPost.body,
    });

    setEditShowModal(false);
  };

  const handleDeleteSubmit = async (blogPostUuid) => {
    await blogPostService.deleteUserBlogPostAsync({ blogPostUuid });

    setShowDeleteModal(false);
  };

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      setEditShowModal(false);
      setShowDeleteModal(false);
    }
  };

  const fetchPage = (filters) => blogPostService.getUserBlogPostsAsync(filters);

  const resultComponentBuilder = (items) => (
    <BlogPosts
      blogPostsList={items}
      isOwned={true}
      handleEditButton={handleEditButton}
      handleDeleteButton={handleDeleteButton}
    />
  );

  useEffect(() => {
    if (!isAuthenticated) {
      onLogout();
      navigate("/");
      return;
    }
  }, [isAuthenticated, onLogout, navigate]);

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
          className="modal__background--blurred"
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
          className="modal__background--blurred"
          onClick={handleBackgroundClick}>
          <div className="deleting-blog-post-overlay">
            <span>Are you sure you want to delete this blog post?</span>
            <div className="deleting-blog-post-buttons">
              <button
                className="deleting-blog-post-submit-button"
                onClick={() => handleDeleteSubmit(deletingPostUuid)}>
                <span>Yes, Delete it</span>
              </button>
              <button
                className="deleting-blog-post-cancel-button"
                onClick={handleCancel}>
                <span>No</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserBlogPosts;
