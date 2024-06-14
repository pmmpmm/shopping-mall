import { createContext, useContext, useEffect, useState } from "react";

interface LoginContextProviderProps {
  children: React.ReactNode;
}
interface LoginContextType {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginContext = createContext<LoginContextType>({ isLogin: false, setIsLogin: () => {} });

export const LoginContextProvider = ({ children }: LoginContextProviderProps) => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const refreshToken = localStorage.getItem(import.meta.env.VITE_FIREBASE_REFRESH_TOKEN);
    if (refreshToken) setIsLogin(true);
  }, [isLogin]);

  return <LoginContext.Provider value={{ isLogin, setIsLogin }}>{children}</LoginContext.Provider>;
};
export const UseLoginContext = () => useContext(LoginContext);
