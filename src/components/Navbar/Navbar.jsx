import { Link } from "react-router";
import styles from "./navbar.module.css";
export default function Navbar() {
  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.left}>
          <Link to="/">Home</Link>
        </div>

        <div className={styles.right}>
          <Link to="/profile">(pfp_goes here)</Link>
        </div>
      </div>
    </>
  );
}
