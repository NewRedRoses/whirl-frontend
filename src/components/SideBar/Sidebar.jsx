import { Link, useLocation } from "react-router";
import { Heart, Users, Newspaper } from "lucide-react";

import styles from "./sidebar.module.css";

export default function Sidebar() {
  const location = useLocation();

  const list = [
    { name: "Posts", url: "/", icon: <Heart /> },
    { name: "Users", url: "/users", icon: <Users /> },
  ];
  return (
    <div className="sidebar-content">
      <ul className={styles.links}>
        {list.map((link, index) => (
          <li key={index} className={styles["list-item"]}>
            <Link
              to={link.url}
              className={
                location.pathname == link.url
                  ? `${styles.link} ${styles.active}`
                  : `${styles.link}`
              }
            >
              {link.icon}
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
