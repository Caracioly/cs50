import { createContext, useEffect, useState } from "react";
import { LoginRequest, getUserLocalStorage, setUserLocalStorage } from "./util";

interface IUser {
  name?: string;
  token?: string;
}

interface IAuthProvider {
  children: React.ReactNode;
}

interface IContext extends IUser {
  authenticate: (name: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const user = getUserLocalStorage();

    if (user) {
      setUser(user);
    }
  }, []);

  async function authenticate(name: string, password: string) {
    try {
      const response = await LoginRequest(name, password);

      if (response && response.token) {
        const payload = { token: response.token, name };

        setUser(payload);
        setUserLocalStorage(payload);
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      console.error("Authentication failed", error);
      throw error;
    }
  }

  function logout() {
    setUser(null);
    setUserLocalStorage(null);
  }

  return (
    <AuthContext.Provider value={{ ...user, authenticate, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
