import { Link } from "react-router-dom";
import { ProductOption } from "@/domain/ProductDomain";

interface ProductThumbListProps {
  id: string;
  image: string;
  title: string;
  price: string;
  category?: string;
  options: ProductOption[];
}

const ProductThumbList = ({ id, image, title, price, category, options }: ProductThumbListProps) => {
  return (
    <Link to={`/product-management/update?id=${id}`} className="w-full">
      <div className="flex flex-row gap-4 items-center">
        <div className="w-30 h-36 overflow-hidden">
          <img src={image} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="py-1">
          <p className="text-lg">{title}</p>
          <div className="flex flex-col gap-1.5 pt-3 text-sm">
            {category && (
              <p>
                카테고리: <span className="font-medium">{category}</span>
              </p>
            )}
            <p>
              옵션: <span className="font-medium">{options.map((option) => option.opt).join(", ")}</span>
            </p>
            <p>
              금액: <span className="font-medium">₩{price}</span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductThumbList;
