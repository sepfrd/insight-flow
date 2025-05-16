import UserCard from "@/components/UserCard";

import styles from "./SingleBlogPost.module.css";

const SingleBlogPost = ({ blogPost, handleEditButton, handleDeleteButton, isOwned = false }) => {
  return (
    <div className={styles.singleBlogPostContainer}>
      <UserCard userInfo={blogPost.author} />
      <div className={styles.singleBlogPost}>
        <div className={styles.singleBlogPostTitle}>{blogPost.title}</div>
        <div className={styles.singleBlogPostBody}>{blogPost.body}</div>
        <div className={styles.singleBlogPostFooter}>
          {isOwned && (
            <div className={styles.singleBlogPostButtons}>
              <button
                className={styles.singleBlogPostButton}
                onClick={() => handleEditButton(blogPost)}>
                Edit
              </button>
              <button
                className={styles.singleBlogPostButton}
                onClick={() => handleDeleteButton(blogPost)}>
                Delete
              </button>
            </div>
          )}
          <div className={styles.singleBlogPostDates}>
            <div>
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
            <div>
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
    </div>
  );
};

export default SingleBlogPost;
