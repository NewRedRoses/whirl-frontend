import { useState, useEffect } from "react";
import { useParams } from "react-router";

import useCheckSession from "../../hooks/useCheckSession.jsx";
import { validatedGetReq, validatedPostReq } from "../../helpers";
import styles from "./profile.module.css";

import { UsersRound, CalendarFold, Shell } from "lucide-react";
import FadeLoader from "react-spinners/FadeLoader";

import Posts from "../../components/Posts/Posts.jsx";
import NoContentMessage from "../../components/NoContentMessage/NoContentMessage.jsx";
import NotFound from "../NotFound/NotFound.jsx";

export default function Profile() {
  const [user, setUser] = useState({
    user: {
      _count: {},
      dateJoined: new Date(),
    },
  });
  const [profileUserRelationshipToUser, setProfileUserRelationshipToUser] =
    useState({
      doesUserFollowLoggedUser: undefined,
      doesLoggedUserFollowUser: undefined,
    });
  const [posts, setPosts] = useState([]);
  const [userIsLoading, setUserIsLoading] = useState(true);
  const [dateJoined, setDateJoined] = useState(new Date());
  const [postsAreLoading, setPostsAreLoading] = useState(true);
  const [followText, setFollowText] = useState("Follow");

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
        // if user exists
        if (data.error == undefined) {
          setUser(data.profileData);
        } else {
          setUser(data);
        }
        const currentFollowStatus = data.doesLoggedUserFollowUser
          ? "Following"
          : "Follow";
        setFollowText(currentFollowStatus);
        const dateJoined = data.profileData.dateJoined;
        setDateJoined(new Date(dateJoined));
        setUserIsLoading(false);
      });

    // User Posts
    validatedGetReq(userPostsUrl)
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        setPostsAreLoading(false);
      });
  }, [userPostsUrl]);

  const handleFollowClick = () => {
    if (followText == "Follow") {
      setFollowText("Following");
    } else {
      setFollowText("Follow");
    }
    validatedPostReq(AddFriendUrl, user.user.username);
  };

  return (
    <>
      {user.error ? (
        <>
          <NotFound />
        </>
      ) : (
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
                          <button
                            onClick={handleFollowClick}
                            className={
                              followText == "Following"
                                ? `${styles["following-btn"]}`
                                : `${styles["follow-btn"]}`
                            }
                          >
                            {followText}
                          </button>

                          {doesUserFollowLoggedUser && (
                            <div className={styles["follows-you"]}>
                              Follows You
                            </div>
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
      )}
    </>
  );
}
