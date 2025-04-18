import { useEffect, useState } from "react";
import { EllipsisVertical, Heart, MessageSquare, Shell } from "lucide-react";

import styles from "../Post/post.module.css";
import { validatedGetReq, validatedPostReq } from "../../helpers";
import { Link } from "react-router";

// import whirrLogo from "../../assets/whirrlogo.jpg";

export default function Post({
  postId,
  author,
  content,
  date,
  isPostLiked,
  likesCount = 0,
  commentsCount = 0,
}) {
  const [like, setLike] = useState(isPostLiked);
  const [likesCounter, setLikesCounter] = useState(likesCount);

  const postLikeUrl = `${
    import.meta.env.VITE_BACKEND_URL
  }/post/id/${postId}/like`;

  async function handleLike() {
    if (like) {
      if (likesCounter > 0) {
        setLikesCounter(likesCounter - 1);
      }
      setLike(false);
    } else {
      setLike(true);
      setLikesCounter(likesCounter + 1);
    }
    validatedPostReq(postLikeUrl);
  }

  return (
    <div className={styles["post-container"]}>
      <div className={styles["post-header"]}>
        <div className={styles["post-header-left"]}>
          <Link to={`/user/${author.username}`}>
            {author.pfpUrl != undefined ? (
              <img
                src={author.pfpUrl}
                alt=""
                className={styles["post-userPfp"]}
              />
            ) : (
              <Shell className={styles["post-userPfp"]} />
            )}
          </Link>
        </div>
        <div className={styles["post-header-mid"]}>
          <strong className={styles["post-author"]}>
            <Link to={`/user/${author.username}`}>{author.displayName}</Link>
          </strong>
          <div className={styles["post-date"]}>
            <Link
              to={`/post/${postId}`}
              className={styles["post-date-content"]}
            >
              {date} ago
            </Link>
          </div>
        </div>
        <div className={styles["post-header-right"]}>
          <EllipsisVertical />
        </div>
      </div>
      <div className={styles["post-body"]}>
        <div className={styles["post-content"]}>
          <p>{content}</p>
        </div>
      </div>
      <div className={styles["post-btns"]}>
        <button onClick={handleLike}>
          <div className={styles["liked-post-container"]}>
            {like ? <Heart color="#ef5777" /> : <Heart />}
            {likesCounter}
          </div>
        </button>
        <Link to={`/post/${postId}`}>
          <button>
            {commentsCount > 0 ? (
              <div className={styles["liked-post-container"]}>
                <MessageSquare /> {commentsCount}
              </div>
            ) : (
              <MessageSquare />
            )}
          </button>
        </Link>
      </div>
    </div>
  );
}
