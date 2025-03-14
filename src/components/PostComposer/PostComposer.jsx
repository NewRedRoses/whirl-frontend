import styles from "./postcomposer.module.css";

export default function PostComposer({
  post,
  onPostChange,
  onPostSubmit,
  placeholder,
}) {
  return (
    <>
      <div className={styles["post-composer-container"]}>
        <textarea
          name="post"
          placeholder={placeholder}
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
