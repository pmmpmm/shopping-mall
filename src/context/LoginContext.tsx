import UserService from "@/services/UserService";
import { createContext, useContext, useEffect, useState } from "react";

interface LoginContextProviderProps {
  children: React.ReactNode;
}
interface LoginContextType {
  userId: string;
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginContext = createContext<LoginContextType>({
  userId: "",
  isLogin: false,
  setIsLogin: () => {}
});

export const LoginContextProvider = ({ children }: LoginContextProviderProps) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    UserService.getUserId(setUserId);
  }, [userId]);

  useEffect(() => {
    const refreshToken = localStorage.getItem(import.meta.env.VITE_FIREBASE_REFRESH_TOKEN);
    if (refreshToken) setIsLogin(true);
  }, [isLogin]);

  return <LoginContext.Provider value={{ userId, isLogin, setIsLogin }}>{children}</LoginContext.Provider>;
};
export const UseLoginContext = () => useContext(LoginContext);
