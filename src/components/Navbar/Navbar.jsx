import { Link } from "react-router";
import styles from "./navbar.module.css";
export default function Navbar() {
  const pfpUrl = localStorage.getItem("pfpUrl");

  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.left}>
          <Link to="/">Home</Link>
        </div>

        <div className={styles.right}>
          <Link to="/profile">
            {pfpUrl && (
              <img src={pfpUrl} alt="" className={styles["navbar-pfp"]} />
            )}
          </Link>
        </div>
      </div>
    </>
  );
}
