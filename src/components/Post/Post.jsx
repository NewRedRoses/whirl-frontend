import { useState } from "react";
import { EllipsisVertical, Heart, MessageSquare } from "lucide-react";

import styles from "../Post/post.module.css";
import { validatedPostReq } from "../../helpers";

export default function Post({ postId, author, content, date }) {
  const [postLiked, setPostLiked] = useState(false);

  const postLikeUrl = `${import.meta.env.VITE_BACKEND_URL}/post/id/${postId}/like`;

  async function handleLike() {
    setPostLiked(!postLiked);
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
          <div className={styles["post-date"]}>{date} ago</div>
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
          {postLiked ? <Heart color="#ef5777" /> : <Heart />}
        </button>
        <button>
          <MessageSquare />
        </button>
      </div>
    </div>
  );
}
