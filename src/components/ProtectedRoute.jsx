import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

export default function ProtectedRoute({ children }) {
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/auth/check-session`,
          {
            credentials: "include",
          },
        );
        if (res.status === 200) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setAuthChecked(true);
      }
    };

    checkSession();
  }, []);

  if (!isAuthenticated) {
    return navigate("/login");
  }

  return children;
}
