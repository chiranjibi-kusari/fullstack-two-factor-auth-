import {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { data } from "react-router-dom";

const SessionContext = createContext();
export const useSession = () => useContext(SessionContext);

export const SessionProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    console.log("the useeffect runs ", storedUser);
    if (storedUser) {
      setUser(storedUser);
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, []);
  const login = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    sessionStorage.setItem("user", JSON.stringify(userData));
  };
  const logOut = (data) => {
    if (data) {
      setIsLoggedIn(false);
      setUser(null);
      sessionStorage.removeItem("user");
    }
  };
  return (
    <SessionContext.Provider
      value={{ isLoggedIn, loading, user, login, logOut }}
    >
      {children}
    </SessionContext.Provider>
  );
};
