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

  const handleEditButton = (blogPost) => {
    setEditingPost({ blogPostUuid: blogPost.uuid, title: blogPost.title, body: blogPost.body });

    setEditShowModal(true);
  };

  const handleCancel = () => {
    setEditShowModal(false);
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

  const fetchPage = (filters) => blogPostServices.getUserBlogPostsAsync(filters);
  const resultComponentBuilder = (items) => (
    <BlogPosts
      blogPostsList={items}
      isOwned={true}
      handleEditButton={handleEditButton}
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
        <div className="blog-posts__modal--overlay">
          <EditableBlogPostModal
            initialTitle={editingPost.title}
            initialBody={editingPost.body}
            formTitle="Update Blog Post"
            onCancel={handleCancel}
            onSubmit={handleEditSubmit}
          />
        </div>
      )}
    </>
  );
}
