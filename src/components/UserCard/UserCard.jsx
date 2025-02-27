import styles from "./usercard.module.css";
import { UserPlus } from "lucide-react";
export default function UserCard({
  username = "",
  displayName,
  pfpUrl,
  friendsCount,
}) {
  return (
    <div className={styles["user-card-container"]}>
      <div className={styles["user-card-left"]}>
        <img src={pfpUrl} alt="" className={styles["user-pfp"]} />
        <div className={styles["user-card-mid"]}>
          <div className={styles["top-details"]}>
            <strong>{displayName}</strong>
          </div>
          <div className={styles["bottom-details"]}>
            <span>{`@${username}`}</span>
            <span>{`${friendsCount} friends`}</span>
          </div>
        </div>
      </div>
      <div className={styles["user-card-right"]}>
        <button
          className={styles["add-btn"]}
          onClick={() => console.log("test")}
        >
          <UserPlus />
        </button>
      </div>
    </div>
  );
}
