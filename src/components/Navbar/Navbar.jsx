import { Link } from "react-router";
import { House } from "lucide-react";
import { useState, useEffect } from "react";

import { validatedGetReq } from "../../helpers";
import styles from "./navbar.module.css";

export default function Navbar() {
  const [pfp, setPfp] = useState(null);

  const userUrl = `${import.meta.env.VITE_BACKEND_URL}/user/pfp`;

  useEffect(() => {
    validatedGetReq(userUrl)
      .then((response) => response.json())
      .then((data) => setPfp(data.pfpUrl));
  }, [userUrl]);

  return (
    <>
      {pfp && (
        <div className={styles.navbar}>
          <div className={styles.left}>
            <Link to="/">
              <House />
            </Link>
          </div>

          {pfp && (
            <div className={styles.right}>
              <Link to="/profile">
                <img src={pfp} alt="" className={styles["navbar-pfp"]} />
              </Link>
            </div>
          )}
        </div>
      )}
    </>
  );
}
