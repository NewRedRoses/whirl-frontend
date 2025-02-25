import { useEffect } from "react";
import Cookies from "js-cookie";

export default function useCheckLoggedIn() {
  const isJWTstillValid = () => {
    const cookie = document.cookie;
    console.log(cookie);
  };
  useEffect(() => {
    const value = Cookies.get("jwt");
    console.log(value);
  }, []);
}
