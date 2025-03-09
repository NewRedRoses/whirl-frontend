import styles from "./usercard.module.css";
import { Shell } from "lucide-react";
import { useState } from "react";
import { validatedPostReq } from "../../helpers.js";
import { Link } from "react-router";

export default function UserCard({
  username = "",
  displayName,
  pfpUrl,
  friendsCount,
  followerCount,
  followingCount,
}) {
  const [isFriendReqSent, setIsFriendReqSent] = useState(false);
  const url = `${import.meta.env.VITE_BACKEND_URL}/friend/add`;

  const handleFriendRequest = () => {
    validatedPostReq(url, username);
    setIsFriendReqSent(true);
  };

  return (
    <div className={styles["user-card-container"]}>
      <div className={styles["user-card-left"]}>
        <Link to={`/user/${username}`}>
          {pfpUrl != undefined ? (
            <img src={pfpUrl} alt="" className={styles["user-pfp"]} />
          ) : (
            <Shell className={styles["user-pfp"]} />
          )}
        </Link>
        <div className={styles["user-card-mid"]}>
          <div className={styles["top-details"]}>
            <Link to={`/user/${username}`} className={styles["display-name"]}>
              <strong>{displayName}</strong>
            </Link>
          </div>
          <div className={styles["bottom-details"]}>
            <div className={styles["username"]}>
              <span>{`@${username}`}</span>
            </div>
            <div className={styles["follows-container"]}>
              <span>{`${followerCount} Followers`}</span>
              <span>{`${followingCount} Following`}</span>
            </div>
          </div>
        </div>
      </div>
      {/* NOTE: Switched to be implemented in the future */}
      {/* <div className={styles["user-card-right"]}> */}
      {/*   {isFriendReqSent == false ? ( */}
      {/*     <button className={styles["add-btn"]} onClick={handleFriendRequest}> */}
      {/*       <UserPlus /> */}
      {/*     </button> */}
      {/*   ) : ( */}
      {/*     "" */}
      {/*   )} */}
      {/* </div> */}
    </div>
  );
}
