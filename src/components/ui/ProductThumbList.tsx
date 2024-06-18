import { ProductDomain } from "@/domain/ProductDomain";
import { Link } from "react-router-dom";

const ProductThumbList = (props: { item: ProductDomain }) => {
  const { id, image, title, price, category, options } = props.item;
  return (
    <li className="flex flex-row justify-between items-center py-4 gap-4 border-b border-gray-200 border-solid last:border-0">
      <Link to={`/product-management/update?id=${id}`} className="w-full">
        <div className="flex flex-row gap-4 items-center">
          <div className="w-30 h-36 overflow-hidden">
            <img src={image} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="py-1">
            <p className="text-lg">{title}</p>
            <div className="flex flex-col gap-1.5 pt-3 text-sm">
              <p>
                카테고리: <span className="font-medium">{category}</span>
              </p>
              <p>
                옵션: <span className="font-medium">{options.join(", ")}</span>
              </p>
              <p>
                금액: <span className="font-medium">₩{price}</span>
              </p>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default ProductThumbList;
