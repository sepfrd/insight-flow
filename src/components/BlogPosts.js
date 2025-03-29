import "../styles/blog-post.css";
import SingleBlogPost from "./SingleBlogPost";
// import blogPostsResponse from "../blog-posts.json";

export function BlogPosts({ blogPostsList }) {
  return (
    <div className="blog-posts">
      <h1 className="blog-posts-header">BlogPosts</h1>
      {blogPostsList.map((singleBlogPost) => (
        //{blogPostsResponse.data.map((singleBlogPost) => (
        <SingleBlogPost
          blogPost={singleBlogPost}
          key={singleBlogPost.uuid}></SingleBlogPost>
      ))}
    </div>
  );
}
