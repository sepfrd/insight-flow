import "../styles/blog-posts.css";
import SingleBlogPost from "./SingleBlogPost";

export function BlogPosts({ blogPostsList, isOwned = false, handleEditButton, handleDeleteButton }) {
  return (
    <div className="blog-posts">
      <h1 className="blog-posts__header">Blog Posts</h1>
      {blogPostsList.map((singleBlogPost) => (
        <SingleBlogPost
          blogPost={singleBlogPost}
          key={singleBlogPost.uuid}
          isOwned={isOwned}
          handleEditButton={handleEditButton}
          handleDeleteButton={handleDeleteButton}
        />
      ))}
    </div>
  );
}
