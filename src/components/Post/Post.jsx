import { useState } from "react";
import { EllipsisVertical, Heart, MessageSquare } from "lucide-react";

import styles from "../Post/post.module.css";

export default function Post({ author, content, date }) {
  const [postLiked, setPostLiked] = useState(false);

  function handleLike() {
    setPostLiked(!postLiked);
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
