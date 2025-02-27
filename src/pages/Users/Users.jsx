import { useState, useEffect } from "react";
import Sidebar from "../../components/SideBar/Sidebar.jsx";
import useCheckSession from "../../hooks/useCheckSession.jsx";
import { validatedGetReq } from "../../helpers.js";
import UserCard from "../../components/UserCard/UserCard.jsx";

import styles from "./users.module.css";

export default function Users() {
  const [users, setUsers] = useState([]);
  useCheckSession();

  const userUrl = `${import.meta.env.VITE_BACKEND_URL}/user`;

  useEffect(() => {
    validatedGetReq(userUrl)
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, [userUrl]);
  return (
    <div className="content">
      <Sidebar />
      <div className="main-content">
        <h1>All Users</h1>
        <ul className={styles.list}>
          {users.map((user, index) => {
            return (
              <li key={index}>
                <UserCard
                  username={user.user.username}
                  displayName={user.displayName}
                  pfpUrl={user.pfpUrl}
                  friendsCount={user.friendsCount}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
