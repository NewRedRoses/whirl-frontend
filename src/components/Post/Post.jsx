import styles from "../Post/post.module.css";

export default function Post({ author, content, date }) {
  date = new Date(date);
  return (
    <div className={styles["post-container"]}>
      <div>
        <img src={author.pfpUrl} alt="" className={styles["post-userPfp"]} />
      </div>
      <div className={styles["post-body"]}>
        <div>
          <strong>{author.displayName} </strong>
        </div>
        <div className={styles["post-content"]}>{content}</div>
        <div className={styles.btns}>
          <button>Like</button>
          <button>Comment</button>
        </div>
      </div>
    </div>
  );
}
