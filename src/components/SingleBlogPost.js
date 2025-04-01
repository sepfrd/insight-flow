import UserCard from "./UserCard.js";

export default function SingleBlogPost({ blogPost }) {
  return (
    <div className="single-blog-post-container">
      <UserCard userInfo={blogPost.author} />
      <div className="single-blog-post">
        <div className="blog-post-title">{blogPost.title}</div>
        <div className="blog-post-body">{blogPost.body}</div>
      </div>
    </div>
  );
}
