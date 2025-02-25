import { useState } from "react";
import styles from "./postcomposer.module.css";

export default function PostComposer() {
  const [post, setPost] = useState("");

  const postUrl = `${import.meta.env.VITE_BACKEND_URL}/post`;

  async function handleSubmit() {
    await fetch(postUrl, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ post }),
    });
  }

  return (
    <>
      <div className={styles["post-composer-container"]}>
        <textarea
          name="post"
          placeholder="What're you thinking about?"
          id=""
          className={styles["post-composer"]}
          value={post}
          onChange={(e) => setPost(e.target.value)}
        ></textarea>
        <div className={styles["submit-btn-container"]}>
          <button className={styles["submit-btn"]} onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
