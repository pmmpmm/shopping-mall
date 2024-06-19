import { Link } from "react-router-dom";
import { ProductListDomain } from "@/domain/ProductDomain";

const ProductCard = ({ id, image, title, price }: ProductListDomain) => {
  return (
    <Link to={`/productpage?id=${id}`}>
      <div>
        <img src={image} alt="상품 이미지" />
      </div>
      <div className="mt-2">
        <p className="font-medium text-black">{title}</p>
        <div className="flex flex-row justify-between mt-[2px] text-xs font-light">
          <p>₩{price}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
