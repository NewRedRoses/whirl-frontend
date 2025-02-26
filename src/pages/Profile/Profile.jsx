import { useState, useEffect } from "react";
import { validatedGetReq } from "../../helpers";

import { UsersRound, CalendarFold } from "lucide-react";
import FadeLoader from "react-spinners/FadeLoader";
import styles from "./profile.module.css";

import Posts from "../../components/Posts/Posts.jsx";

export default function Profile() {
  const [user, setUser] = useState({
    user: {},
  });
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pfp, setPfp] = useState(null);

  const userUrl = `${import.meta.env.VITE_BACKEND_URL}/user`;
  const userPostsUrl = `${import.meta.env.VITE_BACKEND_URL}/posts/${user.username}`;
  const pfpUrl = `${import.meta.env.VITE_BACKEND_URL}/user/pfp`;
  const dateJoined = new Date(user.user.dateJoined);

  useEffect(() => {
    // User
    validatedGetReq(userUrl)
      .then((response) => response.json())
      .then((data) => setUser(data));

    // User pfp
    validatedGetReq(pfpUrl)
      .then((response) => response.json())
      .then((data) => setPfp(data.pfpUrl));

    // User Posts
    validatedGetReq(userPostsUrl)
      .then((response) => response.json())
      .then((data) => setPosts(data));

    setIsLoading(false);
  }, [userUrl, pfpUrl, userPostsUrl]);

  return (
    <>
      <div className={styles["profile-content"]}>
        <div className={styles["user-container"]}>
          {isLoading ? (
            <div className={styles["animation-container"]}>
              <FadeLoader
                color="#808E9B"
                className={styles["profile-user-animation"]}
              />
            </div>
          ) : (
            <>
              <div className={styles["user-container-left"]}>
                <img src={pfp} alt="" className={styles["user-profile-img"]} />
              </div>
              <div className={styles["user-container-right"]}>
                <div className={styles["display-name"]}>
                  <h1>{user.displayName}</h1>
                </div>
                <div className={styles.username}>@{user.user.username}</div>

                <div className={styles["profile-details"]}>
                  <div className={styles.friends}>
                    <UsersRound />
                    {user.friendsCount}
                  </div>
                  <div className={styles.date}>
                    <CalendarFold />
                    {dateJoined.toLocaleDateString()}
                  </div>
                </div>
                <div className={styles["bio-container"]}>{user.bio}</div>
              </div>
            </>
          )}
        </div>
        <div className="user-posts-container">
          <h1>Posts</h1>
          <Posts posts={posts} />
        </div>
      </div>
    </>
  );
}
