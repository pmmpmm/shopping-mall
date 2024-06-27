import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { UseLoginContext } from "@/context/LoginContext";
import AuthService from "@/services/AuthService";
import UserService from "@/services/UserService";
import { UserRole } from "@/domain/UserDomain";
import Logo from "@/components/ui/Logo";
import CartService from "@/services/CartService";

const UtilityMenuBar = () => {
  return <em className="inline-block w-[1px] h-[10px] mx-3 bg-gray-300"></em>;
};

const Header = () => {
  const navigate = useNavigate();
  const { userId, isLogin, setIsLogin } = UseLoginContext();

  const { data: userStutes } = useQuery({
    queryKey: ["userInfo", userId],
    queryFn: UserService.getUserInfo,
    enabled: isLogin,
    staleTime: 1000 * 60 * 60
  });

  const { data: cartProducts } = useQuery({
    queryKey: ["cartProducts", userId],
    queryFn: CartService.getAllCartProduct
  });

  const handleLogout = () => {
    const logoutConfirm = confirm("로그아웃 하시겠습니까?");
    if (logoutConfirm) {
      AuthService.logout("userInfo") //
        .then(() => {
          setIsLogin(false);
          alert("로그아웃되었습니다. 이용해 주셔서 감사합니다.");
          navigate("/");
        });
    }
  };

  const cartProductCount = () => {
    if (cartProducts === null) return 0;
    return cartProducts?.length;
  };

  return (
    <header className="flex justify-between items-center py-3.5">
      <Link to="/" className="py-2">
        <Logo className="w-48" />
      </Link>

      <div className="flex items-center text-[13px]">
        {!isLogin && (
          <>
            <Link to="/login">로그인</Link>
            <UtilityMenuBar />
            <Link to="/signup">회원가입</Link>
          </>
        )}

        {isLogin && !!userStutes && (
          <>
            <Link to="/mypage">안녕하세요. {userStutes.username}님</Link>
            <UtilityMenuBar />

            <Link to="/cart">
              <span>장바구니</span>
              <em className="inline-block min-w-4 ml-[4px] px-[3px] py-[2px] bg-red-600 leading-3 text-[10px] font-bold text-white text-center align-text-bottom rounded-full not-italic">
                {cartProductCount()}
              </em>
            </Link>
            <UtilityMenuBar />

            {userStutes.role === UserRole.ADMIN && (
              <>
                <Link to="/product-management">상품 관리</Link>
                <UtilityMenuBar />
              </>
            )}

            <button onClick={handleLogout}>로그아웃</button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
