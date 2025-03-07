import { Link, useNavigate } from "react-router";
import { House } from "lucide-react";
import { useState, useEffect } from "react";

import { validatedGetReq, validatedPostReq } from "../../helpers";
import styles from "./navbar.module.css";

export default function Navbar() {
  const [pfp, setPfp] = useState(null);
  const [username, setUsername] = useState("");

  const userUrl = `${import.meta.env.VITE_BACKEND_URL}/user/pfp`;
  const logoutUrl = `${import.meta.env.VITE_BACKEND_URL}/auth/google/logout`;

  const navigate = useNavigate();

  useEffect(() => {
    validatedGetReq(userUrl)
      .then((response) => response.json())
      .then((data) => {
        setPfp(data.pfpUrl);
        setUsername(data.user.username);
      });
  }, [userUrl]);

  const handleLogout = () => {
    validatedPostReq(logoutUrl);
    setPfp(null);
    navigate("/login");
  };

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
              <button className={styles["logout-btn"]} onClick={handleLogout}>
                Logout
              </button>
              <Link to={`/user/${username}`}>
                <img src={pfp} alt="" className={styles["navbar-pfp"]} />
              </Link>
            </div>
          )}
        </div>
      )}
    </>
  );
}
