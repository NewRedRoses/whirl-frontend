import { useState } from "react";
import styles from "./commentComposer.module.css";

import { validatedPostReq } from "../../helpers";
import { useNavigate } from "react-router";

export default function CommentComposer({ url }) {
  const [comment, setComment] = useState("");

  const navigate = useNavigate();

  async function handleSubmit() {
    validatedPostReq(url, comment);
    navigate(0);
  }

  return (
    <>
      <div className={styles["comment-composer-container"]}>
        <textarea
          name="comment"
          placeholder="What're your thoughts about this post?"
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
