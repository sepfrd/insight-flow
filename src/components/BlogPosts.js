import "../styles/blog-post.css";
import SingleBlogPost from "./SingleBlogPost";

export function BlogPosts({ blogPostsList }) {
  return (
    <div className="blog-posts">
      <h1 className="blog-posts-header">Blog Posts</h1>
      {blogPostsList.map((singleBlogPost) => (
        <SingleBlogPost
          blogPost={singleBlogPost}
          key={singleBlogPost.uuid}></SingleBlogPost>
      ))}
    </div>
  );
}
