import { CircleOff } from "lucide-react";
import styles from "./noContentMessage.module.css";

export default function NoContentMessage({ caption = "no caption given..." }) {
  return (
    <div className={styles["no-content-container"]}>
      <div className={styles["no-content-icon"]}>
        <CircleOff />
      </div>
      <div className={styles["no-content-caption"]}>{caption}</div>
    </div>
  );
}
