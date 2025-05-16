import { blogPostService } from "@/api/blogPostService";
import BlogPosts from "@/components/BlogPosts";
import PaginatedResult from "@/components/PaginatedResult";

const Home = () => {
  const fetchPage = (filters) => blogPostService.getBlogPostsAsync(filters);
  const resultComponentBuilder = (items) => <BlogPosts blogPostsList={items} />;

  return (
    <PaginatedResult
      fetchPage={fetchPage}
      resultComponentBuilder={resultComponentBuilder}
    />
  );
};

export default Home;
