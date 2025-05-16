import { blogPostService } from "@/api/blogPostService";
import EditableBlogPostModal from "@/components/EditableBlogPostModal/EditableBlogPostModal";
import { ToastContext } from "@/contexts/ToastContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const NewBlogPost = () => {
  const { setMessage } = useContext(ToastContext);
  const navigate = useNavigate();

  const handleSubmitButton = async ({ title, body }) => {
    if (!title || !body) {
      setMessage({ type: "error", text: "Please fill out both fields." });
      return;
    }

    await blogPostService.submitBlogPostAsync({ title, body });

    navigate("/my-blog-posts");
  };

  const handleCancelButton = async () => {
    navigate("/");
  };

  return (
    <>
      <EditableBlogPostModal
        formTitle={"Create a New Blog Post"}
        onSubmit={handleSubmitButton}
        onCancel={handleCancelButton}
      />
    </>
  );
};

export default NewBlogPost;
