import { useState, useEffect } from "react";
import useCheckSession from "../../hooks/useCheckSession.jsx";
import { validatedGetReq, validatedPostReq } from "../../helpers";

import { UsersRound, CalendarFold, Shell } from "lucide-react";
import FadeLoader from "react-spinners/FadeLoader";
import styles from "./profile.module.css";

import Posts from "../../components/Posts/Posts.jsx";
import { useParams } from "react-router";

export default function Profile() {
  const [user, setUser] = useState({
    user: {
      _count: {},
    },
  });
  const [profileUserRelationshipToUser, setProfileUserRelationshipToUser] =
    useState({
      doesUserFollowLoggedUser: undefined,
      doesLoggedUserFollowUser: undefined,
    });
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useCheckSession();

  const params = useParams();

  const userUrl = `${import.meta.env.VITE_BACKEND_URL}/user/profile/${params.username}`;
  const userPostsUrl = `${import.meta.env.VITE_BACKEND_URL}/posts/user/${params.username}`;
  const AddFriendUrl = `${import.meta.env.VITE_BACKEND_URL}/friend/add`;
  const { doesUserFollowLoggedUser, doesLoggedUserFollowUser } =
    profileUserRelationshipToUser;

  const dateJoined = new Date(user.user.dateJoined);
  const loggedInUsername = localStorage.getItem("username");

  useEffect(() => {
    // User
    validatedGetReq(userUrl)
      .then((response) => response.json())
      .then((data) => {
        setProfileUserRelationshipToUser({
          doesLoggedUserFollowUser: data.doesLoggedUserFollowUser,
          doesUserFollowLoggedUser: data.doesUserFollowLoggedUser,
        });
        setUser(data.profileData);
      });

    // User Posts
    validatedGetReq(userPostsUrl)
      .then((response) => response.json())
      .then((data) => setPosts(data));

    setIsLoading(false);
  }, [userUrl, userPostsUrl]);

  const handleFollowClick = async () => {
    await validatedPostReq(AddFriendUrl, user.user.username);
    location.reload();
  };

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
                {user.pfpUrl != undefined ? (
                  <img
                    src={user.pfpUrl}
                    alt=""
                    className={styles["user-profile-img"]}
                  />
                ) : (
                  <Shell className={styles["user-profile-img-empty"]} />
                )}
              </div>
              <div className={styles["user-container-right"]}>
                <div className={styles["display-name"]}>
                  <h1>{user.displayName}</h1>
                </div>
                <div className={styles.username}>@{user.user.username}</div>

                <div className={styles["profile-details"]}>
                  <div className={styles.friends}>
                    <UsersRound />
                    {user.user["_count"].friendOf}
                  </div>
                  <div className={styles.date}>
                    <CalendarFold />
                    {dateJoined.toLocaleDateString()}
                  </div>
                </div>
                <div className={styles["bio-container"]}>
                  {user.bio == undefined ? "No Bio set..." : user.bio}
                </div>
                <div className={[styles["follow-status"]]}>
                  {loggedInUsername != user.user.username && (
                    <>
                      <button onClick={handleFollowClick}>
                        {doesLoggedUserFollowUser ? (
                          <div className={styles["following-btn"]}>
                            Following
                          </div>
                        ) : (
                          "Follow"
                        )}
                      </button>
                      {doesUserFollowLoggedUser && (
                        <div className={styles["follows-you"]}>Follows you</div>
                      )}
                    </>
                  )}
                </div>
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
