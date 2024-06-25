import ProductThumbList from "@/components/ui/ProductThumbList";
import { CartProductDomain } from "@/domain/CartDomain";
import Button from "@/components/ui/Button";

interface CartListProps {
  item: CartProductDomain;
}

const CartList = ({ item }: CartListProps) => {
  const { id, image, title, price, options, quantity } = item;

  return (
    <li className="flex flex-row justify-end items-center py-4 gap-4 border-b border-gray-200 border-solid last:border-0 last:pb-0">
      <ProductThumbList id={id} image={image} title={title} price={price} options={options} />
      <div className="flex flex-row gap-6 items-center">
        <div className="flex flex-row">
          <Button title="-" variant="contain" className="box-content w-4 h-4 px-[4px] py-[4px]" />
          <span className="min-w-12 px-2 text-center">{quantity}</span>
          <Button title="+" variant="contain" className="box-content w-4 h-4 px-[4px] py-[4px]" />
        </div>
        <Button title="삭제" variant="outline" size="small" />
      </div>
    </li>
  );
};

export default CartList;
