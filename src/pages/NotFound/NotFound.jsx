import { Link } from "react-router";
import styles from "./notFound.module.css";
export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>404 Error</h1>
      <p className={styles.paragraph}>
        What you&apos;re looking for does not exist.{" "}
      </p>
      <div className={styles.question}>Did it ever ?</div>
      <Link to={"/"} className={styles.return}>
        Please, take me back home...
      </Link>
    </div>
  );
}
