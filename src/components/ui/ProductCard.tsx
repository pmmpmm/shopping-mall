import { Link } from "react-router-dom";
import { ProductListDomain } from "@/domain/ProductDomain";

const ProductCard = ({ id, image, title, price }: ProductListDomain) => {
  return (
    <Link to={`/productpage?id=${id}`}>
      <div className="w-full aspect-[100/138]">
        <img src={image} alt="상품 이미지" className="w-full h-full object-cover" />
      </div>
      <div className="mt-2">
        <p className="font-semibold text-black">{title}</p>
        <div className="flex flex-row justify-between mt-[2px] text-xs font-light">
          <p>₩{price}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
