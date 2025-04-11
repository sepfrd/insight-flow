import { useNavigate } from "react-router-dom";
import { blogPostServices } from "../api/blogPostServices";
import EditableBlogPostModal from "../components/EditableBlogPostModal";

export default function CreateBlogPost() {
  const navigate = useNavigate();

  const handleSubmitButton = async ({ title, body }) => {
    if (!title || !body) {
      return alert("Please fill out both fields.");
    }

    await blogPostServices.submitBlogPostAsync({ title, body });

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
}
