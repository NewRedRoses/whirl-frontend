import { useEffect, useState } from "react";
import { EllipsisVertical, Heart, MessageSquare } from "lucide-react";

import styles from "../Post/post.module.css";
import { validatedGetReq, validatedPostReq } from "../../helpers";
import { Link } from "react-router";

export default function Post({
  postId,
  author,
  content,
  date,
  likesCount = 0,
  commentsCount = 0,
}) {
  const [isPostLiked, setIsPostLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likesCount);

  const postLikeUrl = `${import.meta.env.VITE_BACKEND_URL}/post/id/${postId}/like`;

  useEffect(() => {
    // Get from backend whether user has liked post
    validatedGetReq(postLikeUrl)
      .then((response) => response.json())
      .then((postLikeStatus) => {
        if (postLikeStatus.success) {
          setIsPostLiked(true);
        }
      });
  }, [postLikeUrl]);

  async function handleLike() {
    if (isPostLiked) {
      if (likeCount > 0) {
        setLikeCount(likeCount - 1);
      }
      setIsPostLiked(false);
    } else {
      setIsPostLiked(true);
      setLikeCount(likeCount + 1);
    }
    validatedPostReq(postLikeUrl);
  }

  return (
    <div className={styles["post-container"]}>
      <div className={styles["post-header"]}>
        <div className={styles["post-header-left"]}>
          <img src={author.pfpUrl} alt="" className={styles["post-userPfp"]} />
        </div>
        <div className={styles["post-header-mid"]}>
          <strong className={styles["post-author"]}>
            {author.displayName}
          </strong>
          <div className={styles["post-date"]}>
            <Link to={`/post/${postId}`}>{date} ago</Link>
          </div>
          {console.log(commentsCount)}
        </div>
        <div className={styles["post-header-right"]}>
          <EllipsisVertical />
        </div>
      </div>
      <div className={styles["post-body"]}>
        <div className={styles["post-content"]}>{content}</div>
      </div>
      <div className={styles["post-btns"]}>
        <button onClick={handleLike}>
          <div className={styles["likes-container"]}>
            {isPostLiked ? (
              <div className={styles["liked-post-container"]}>
                <Heart color="#ef5777" />
                {likeCount}
              </div>
            ) : (
              <>
                <Heart />
              </>
            )}
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
