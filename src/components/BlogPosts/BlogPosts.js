import SingleBlogPost from "@/components/SingleBlogPost";

import styles from "./BlogPosts.module.css";

const BlogPosts = ({ blogPostsList, isOwned = false, handleEditButton, handleDeleteButton }) => {
  return (
    <div className={styles.blogPosts}>
      <h1 className={styles.blogPostsHeader}>Blog Posts</h1>
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
};

export default BlogPosts;
