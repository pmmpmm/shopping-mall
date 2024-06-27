import { useQuery } from "@tanstack/react-query";
import { UseLoginContext } from "@/context/LoginContext";
import UserService from "@/services/UserService";

const useUser = () => {
  const { userId, isLogin } = UseLoginContext();

  const getUserInfo = useQuery({
    queryKey: ["userInfo", userId],
    queryFn: UserService.getUserInfo,
    enabled: isLogin,
    staleTime: 1000 * 60 * 60
  });

  return { getUserInfo };
};

export default useUser;
