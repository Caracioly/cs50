import { useContext, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { Api } from "@/services/api";

import { AuthContext } from "@/context/AuthProvider";
import { getUserLocalStorage } from "@/context/AuthProvider/util";

import { toast } from "sonner";

export function useAuthValidation() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const validateToken = async () => {
      const user = getUserLocalStorage();

      if (!user || !user.token) {
        toast.error("You must be logged in");
        navigate("/");
        return;
      }

      try {
        await Api.post("auth", {
          token: user.token,
        });
      } catch (err) {
        console.error("Problem validating token", err);
        logout();
      }
    };

    validateToken();
  }, [navigate, logout]);

  function handleLogout() {
    logout();
    toast.info("Logged out");
    navigate("/");
  }

  return { handleLogout };
}
