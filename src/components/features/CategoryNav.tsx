import { useLocation, useNavigate } from "react-router-dom";

interface CategoryNavProps {
  path: string;
}
const CategoryNav = ({ path }: CategoryNavProps) => {
  const { search } = useLocation();
  const category = new URLSearchParams(search).get("category") as string;
  const navigate = useNavigate();

  const navs = [
    { title: "전체", value: "all" },
    { title: "상의", value: "top" },
    { title: "하의", value: "bottom" },
    { title: "원피스", value: "dress" },
    { title: "신발", value: "shoes" },
    { title: "가방", value: "bag" }
  ];
  return (
    <nav className="flex justify-center gap-16 px-layout-A py-0.5">
      {navs.map((nav, idx) =>
        category ? (
          <button
            key={`category-${idx}`}
            value={nav.value}
            onClick={(e: React.MouseEvent<HTMLElement>) => {
              const { value } = e.target as HTMLButtonElement;
              navigate(`${path}=${value}`);
            }}
            className={`text-[15px] px-2 py-1.5 relative 
          ${category === nav.value ? "font-bold text-black before:content-[''] before:block before:w-[calc(100%-1rem)] before:h-[1px] before:mx-2 before:bg-gray-950 before:absolute before:left-0 before:-bottom-0" : "font-medium "}`}
          >
            {nav.title}
          </button>
        ) : (
          <button
            key={`category-${idx}`}
            value={nav.value}
            onClick={(e: React.MouseEvent<HTMLElement>) => {
              const { value } = e.target as HTMLButtonElement;
              navigate(`${path}=${value}`);
            }}
            className={`text-[15px] px-2 py-1.5 font-semibold text-gray-800`}
          >
            {nav.title}
          </button>
        )
      )}
    </nav>
  );
};

export default CategoryNav;
