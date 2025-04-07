import { blogPostServices } from "../api/blogPostServices";
import { BlogPosts } from "../components/BlogPosts";
import PaginatedResult from "../components/PaginatedResult";

export default function UserBlogPosts() {
  const fetchPage = (filters) => blogPostServices.getUserBlogPostsAsync(filters);
  const resultComponentBuilder = (items) => <BlogPosts blogPostsList={items} />;

  return (
    <PaginatedResult
      fetchPage={fetchPage}
      resultComponentBuilder={resultComponentBuilder}
    />
  );
}
