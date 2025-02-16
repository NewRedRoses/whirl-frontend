import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function AuthSuccess() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();

  useEffect(() => {
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token); // Store the token

      setTimeout(() => {
        navigate("/"); // Redirect to home
      }, 500); // Small delay to ensure storage is complete
    } else {
      navigate("/login?error=missing_token");
    }
  }, [params, navigate]);

  return (
    <>
      <p>Authenticating...Beep..Boop.Beep..</p>
    </>
  );
}
