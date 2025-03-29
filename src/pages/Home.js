import "../styles/blog-post.css";
import "../styles/pagination.css";
import { useState, useEffect, useContext } from "react";
import { blogPostServices } from "../api/blogPostServices";
import { BlogPosts } from "../components/BlogPosts";
import { AuthContext } from "../contexts/AuthContext";
import { KEYS_VALUES } from "../utils/constants";

export default function Home() {
  const [blogPosts, setblogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [{ pageNumber, pageSize }, setPagination] = useState({ pageNumber: 1, pageSize: 100 });
  const [error, setError] = useState(null);
  const { onLogout } = useContext(AuthContext);

  useEffect(() => {
    try {
      blogPostServices.getBlogPostsAsync({ pageNumber: pageNumber, pageSize: pageSize }).then((fetchedblogPosts) => {
        setblogPosts(fetchedblogPosts.data);
        setLoading(false);
      });
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, [pageNumber, pageSize]);

  useEffect(() => {
    const handleStorageChange = () => {
      if (!localStorage.getItem(KEYS_VALUES.authTokenKey)) {
        onLogout();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [onLogout]);

  const previousPage = () => {
    if (pageNumber > 1) {
      setPagination((prevState) => ({
        ...prevState,
        pageNumber: prevState.pageNumber - 1,
      }));
    }
  };

  const nextPage = () => {
    setPagination((prevState) => ({
      ...prevState,
      pageNumber: prevState.pageNumber + 1,
    }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="pagination">
        <button
          onClick={previousPage}
          className="pagination-button">
          Previous
        </button>
        <span className="page-number">{pageNumber}</span>
        <button
          onClick={nextPage}
          className="pagination-button">
          Next
        </button>
      </div>
      <div className="blog-posts-section">
        <BlogPosts blogPostsList={blogPosts} />
      </div>
    </>
  );
}
