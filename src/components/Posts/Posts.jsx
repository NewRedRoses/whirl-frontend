import { formatDistance } from "date-fns";
import Post from "../Post/Post";

import styles from "./posts.module.css";

export default function Posts({ posts }) {
  const today = new Date();

  return (
    <ul className={styles["posts-list"]}>
      {posts.map((post) => {
        return (
          <li key={post.id}>
            <Post
              postId={post.id}
              content={post.content}
              date={formatDistance(post.datePosted, today)}
              likesCount={post.likesNum}
              commentsCount={post["_count"].postComment}
              author={{
                displayName: post.user.profile.displayName,
                pfpUrl: post.user.profile.pfpUrl,
              }}
            />
          </li>
        );
      })}
    </ul>
  );
}
