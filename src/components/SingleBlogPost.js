import "../styles/single-blog-post.css";
import UserCard from "./UserCard.js";

export default function SingleBlogPost({ blogPost, handleEditButton, isOwned = false }) {
  return (
    <div className="single-blog-post__container">
      <UserCard userInfo={blogPost.author} />
      <div className="single-blog-post">
        <div className="single-blog-post__title">{blogPost.title}</div>
        <div className="single-blog-post__body">{blogPost.body}</div>
        <div className="single-blog-post__footer">
          {isOwned && (
            <button
              className="single-blog-post__edit-button"
              onClick={() => handleEditButton(blogPost)}>
              Edit
            </button>
          )}
          <div className="single-blog-post__dates">
            <div>
              Created at:{" "}
              {new Date(`${blogPost.createdAt}Z`).toLocaleString({
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                formatMatcher: "basic",
              })}
            </div>
            <div>
              Updated at:{" "}
              {new Date(`${blogPost.updatedAt}Z`).toLocaleString({
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                formatMatcher: "basic",
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
