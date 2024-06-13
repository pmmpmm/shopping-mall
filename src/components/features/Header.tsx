import { Link, useNavigate } from "react-router-dom";
import Logo from "@/components/ui/Logo";

const UtilityMenuBar = () => {
  return <em className="inline-block w-[1px] h-[10px] mx-3 bg-gray-300"></em>;
};

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="flex justify-between items-center py-3.5">
      <Link to="/" className="py-2">
        <Logo className="w-48" />
      </Link>

      <div className="flex items-center text-[13px]">
        <button>로그인</button>
        <UtilityMenuBar />
        <button onClick={() => navigate("/signup")}>회원가입</button>
        <UtilityMenuBar />

        <Link to="/cart">
          <span>장바구니</span>
          <em className="inline-block min-w-4 ml-[4px] px-[3px] py-[2px] bg-red-600 leading-3 text-[10px] font-bold text-white text-center align-text-bottom rounded-full not-italic">
            5
          </em>
        </Link>
        <UtilityMenuBar />

        <Link to="/products/new">상품 관리</Link>
        <UtilityMenuBar />

        <button>로그아웃</button>
      </div>
    </header>
  );
};

export default Header;
