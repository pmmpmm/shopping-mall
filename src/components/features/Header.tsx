import { Link } from "react-router-dom";
import Logo from "@/components/ui/Logo";

const UtilityMenuBar = () => {
  return <em className="inline-block w-[1px] h-[10px] mx-3 bg-gray-300"></em>;
};

const Header = () => {
  return (
    <header className="flex justify-between items-start py-4">
      <Link to="/" className="py-2">
        <Logo className="w-48" />
      </Link>

      <div className="flex items-center text-[13px]">
        <button>로그인</button>
        <UtilityMenuBar />

        <span>반갑습니다. 홍길동 님</span>
        <UtilityMenuBar />

        <Link to="/cart">
          <span>장바구니</span>
          <em className="inline-block min-w-4 ml-[4px] px-[3px] py-[2px] bg-red-600 leading-3 text-[10px] font-bold text-white text-center align-text-bottom rounded-full not-italic">
            5
          </em>
        </Link>
        <UtilityMenuBar />

        <Link to="/products/new">상품 등록</Link>
        <UtilityMenuBar />

        <button>로그아웃</button>
      </div>
    </header>
  );
};

export default Header;
