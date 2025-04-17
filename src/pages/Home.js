import { blogPostService } from "../api/blogPostService";
import { BlogPosts } from "../components/BlogPosts";
import PaginatedResult from "../components/PaginatedResult";
import "../styles/blog-posts.css";
import "../styles/pagination.css";

export default function Home() {
  const fetchPage = (filters) => blogPostService.getBlogPostsAsync(filters);
  const resultComponentBuilder = (items) => <BlogPosts blogPostsList={items} />;

  return (
    <PaginatedResult
      fetchPage={fetchPage}
      resultComponentBuilder={resultComponentBuilder}
    />
  );
}
