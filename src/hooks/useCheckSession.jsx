import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
export default function useCheckSession() {
  const checkSessionUrl = `${import.meta.env.VITE_BACKEND_URL}/auth/check-session`;
  const navigate = useNavigate();

  useEffect(() => {
    fetch(checkSessionUrl, {
      credentials: "include",
    }).then((response) => {
      if (response.status != 200) {
        navigate("/login");
      }
    });
  }, [checkSessionUrl]);
}
