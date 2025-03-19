import { useState, useEffect } from "react";
import Sidebar from "../../components/SideBar/Sidebar.jsx";
import useCheckSession from "../../hooks/useCheckSession.jsx";
import { validatedGetReq } from "../../helpers.js";
import UserCard from "../../components/UserCard/UserCard.jsx";
import FadeLoader from "react-spinners/FadeLoader";

import styles from "./users.module.css";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useCheckSession();

  const userUrl = `${import.meta.env.VITE_BACKEND_URL}/user`;

  useEffect(() => {
    validatedGetReq(userUrl)
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setIsLoading(false);
      });
  }, [userUrl]);
  return (
    <div className="content">
      <Sidebar />
      <div className="main-content">
        <h1>All Users</h1>
        {isLoading ? (
          <div className="spinner-container">
            <FadeLoader color="#808E9B" />
          </div>
        ) : (
          <>
            <ul className={styles.list}>
              {users.map((user, index) => {
                return (
                  <li key={index}>
                    <UserCard
                      username={user.user.username}
                      displayName={user.displayName}
                      pfpUrl={user.pfpUrl}
                      followingCount={user.user["_count"].friendsA}
                      followerCount={user.user["_count"].friendsB}
                    />
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
