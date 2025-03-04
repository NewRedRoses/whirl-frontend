import { useState } from "react";
import styles from "./commentComposer.module.css";

import { validatedPostReq } from "../../helpers";

export default function CommentComposer({ url }) {
  const [comment, setComment] = useState("");

  async function handleSubmit() {
    validatedPostReq(url, comment);
  }

  return (
    <>
      <div className={styles["comment-composer-container"]}>
        <textarea
          name="comment"
          placeholder="What're you thinking about?"
          id=""
          className={styles["comment-composer"]}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
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
