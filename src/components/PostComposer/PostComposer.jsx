import styles from "./postcomposer.module.css";

export default function PostComposer({ post, onPostChange, onPostSubmit }) {
  return (
    <>
      <div className={styles["post-composer-container"]}>
        <textarea
          name="post"
          placeholder="What're you thinking about?"
          id=""
          className={styles["post-composer"]}
          value={post}
          onChange={onPostChange}
        ></textarea>
        <div className={styles["submit-btn-container"]}>
          <button className={styles["submit-btn"]} onClick={onPostSubmit}>
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
