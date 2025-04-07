import UserCard from "./UserCard.js";

export default function SingleBlogPost({ blogPost }) {
  return (
    <div className="single-blog-post-container">
      <UserCard userInfo={blogPost.author} />
      <div className="single-blog-post">
        <div className="blog-post-title">{blogPost.title}</div>
        <div className="blog-post-body">{blogPost.body}</div>
        <div className="blog-post-footer">
          <div className="blog-post-footer-label">
            Created at:{" "}
            {new Date(blogPost.createdAt).toLocaleString("en-us", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              formatMatcher: "basic",
              hourCycle: "h24",
              timeZoneName: "shortGeneric",
            })}
          </div>
          <div className="blog-post-footer-label">
            Updated at:{" "}
            {new Date(blogPost.updatedAt).toLocaleString("en-us", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              formatMatcher: "basic",
              hourCycle: "h24",
              timeZoneName: "shortGeneric",
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
