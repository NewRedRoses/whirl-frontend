import { useState, useEffect } from "react";
import { useParams } from "react-router";

import useCheckSession from "../../hooks/useCheckSession.jsx";
import { validatedGetReq, validatedPostReq } from "../../helpers";
import styles from "./profile.module.css";

import { UsersRound, CalendarFold, Shell } from "lucide-react";
import FadeLoader from "react-spinners/FadeLoader";

import Posts from "../../components/Posts/Posts.jsx";
import NoContentMessage from "../../components/NoContentMessage/NoContentMessage.jsx";

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
  const [userIsLoading, setUserIsLoading] = useState(true);
  const [postsAreLoading, setPostsAreLoading] = useState(true);

  useCheckSession();

  const params = useParams();

  const userUrl = `${import.meta.env.VITE_BACKEND_URL}/user/profile/${
    params.username
  }`;
  const userPostsUrl = `${import.meta.env.VITE_BACKEND_URL}/posts/user/${
    params.username
  }`;
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
        setUserIsLoading(false);
      });

    // User Posts
    validatedGetReq(userPostsUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPosts(data);
        setPostsAreLoading(false);
      });
  }, [userUrl, userPostsUrl]);

  const handleFollowClick = () => {
    validatedPostReq(AddFriendUrl, user.user.username);
    location.reload();
  };

  return (
    <>
      <div className={styles["profile-content"]}>
        <div className={styles["user-container"]}>
          {userIsLoading ? (
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
                    referrerPolicy="no-referrer"
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
                    <div>{`${user.user["_count"].friendsB} Follower(s)`}</div>
                    <div>{`${user.user["_count"].friendsA} Following`}</div>
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
                      {doesLoggedUserFollowUser ? (
                        <button
                          onClick={handleFollowClick}
                          className={styles["following-btn"]}
                        >
                          Following
                        </button>
                      ) : (
                        <button
                          onClick={handleFollowClick}
                          className={styles["follow-btn"]}
                        >
                          Follow
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
        <div className={styles["user-posts-container"]}>
          <h1>Posts</h1>
          {postsAreLoading ? (
            <div className="spinner-container">
              <FadeLoader color="#808E9B" />
            </div>
          ) : (
            <>
              {posts.length > 0 ? (
                <>
                  <Posts posts={posts} />
                </>
              ) : (
                <NoContentMessage caption="No posts yet…" />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
