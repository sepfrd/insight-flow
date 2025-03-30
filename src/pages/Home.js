import { useContext, useEffect, useState } from "react";
import { blogPostServices } from "../api/blogPostServices";
import { BlogPosts } from "../components/BlogPosts";
import { AuthContext } from "../contexts/AuthContext";
import "../styles/blog-post.css";
import "../styles/pagination.css";
import { KEYS_VALUES } from "../utils/constants";

export default function Home() {
  const [blogPosts, setblogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [{ pageNumber, pageSize }, setPagination] = useState({ pageNumber: 1, pageSize: 100 });
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(null);
  const { onLogout } = useContext(AuthContext);

  useEffect(() => {
    try {
      blogPostServices.getBlogPostsAsync({ pageNumber: pageNumber, pageSize: pageSize }).then((blogPostsResponse) => {
        setTotalPages(Math.ceil(blogPostsResponse.totalCount / pageSize));
        setblogPosts(blogPostsResponse.data);
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

  const navigateTo = (page) => {
    if (page === 0) {
      return;
    }

    setPagination((prevState) => ({
      ...prevState,
      pageNumber: page,
    }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="pagination-section">
        <div className="pagination-bar">
          <button
            disabled={pageNumber === 1}
            onClick={() => navigateTo(pageNumber - 1)}
            className="pagination-button">
            Previous
          </button>
          <span className="pages">
            Page <span className="page-number">{pageNumber}</span> of <span className="page-number">{totalPages}</span>
          </span>
          <button
            disabled={pageNumber === totalPages}
            onClick={() => navigateTo(pageNumber + 1)}
            className="pagination-button">
            Next
          </button>
        </div>
      </div>
      <div className="blog-posts-section">
        <BlogPosts blogPostsList={blogPosts} />
      </div>
    </>
  );
}
