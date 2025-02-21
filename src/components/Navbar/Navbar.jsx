import { Link } from "react-router";
import styles from "./navbar.module.css";
import { useUser } from "../../main.jsx";
export default function Navbar() {
  const { user, setUser } = useUser();
  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.left}>
          <Link to="/">Home</Link>
        </div>

        <div className={styles.right}>
          <Link to="/profile">
            {user && (
              <img src={user.pfpUrl} alt="" className={styles["navbar-pfp"]} />
            )}
          </Link>
        </div>
      </div>
    </>
  );
}
