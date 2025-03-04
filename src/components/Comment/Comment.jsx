import { useState } from "react";
import styles from "./comment.module.css";
import { formatDistance } from "date-fns";
export default function Comment({ props }) {
  const { content, datePosted, id } = props;
  const { pfpUrl, displayName } = props.user.profile;

  const date = new Date(datePosted);
  // const dateFormatted = formatDistance(new Date(), date);
  const dateFormatted = date.toLocaleString();

  return (
    <div className={styles["comment-container"]}>
      <div className={styles["user-pfp"]}>
        <img src={pfpUrl} alt="" />
      </div>
      <div className={styles["right-content"]}>
        <div className={styles["user-display-name"]}>
          <strong>{displayName}</strong>
        </div>
        <div className={styles["comment-content"]}>{content}</div>
        <div className={styles["date-posted"]}>{dateFormatted}</div>
      </div>
    </div>
  );
}
