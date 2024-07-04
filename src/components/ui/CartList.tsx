import { CartProductDomain } from "@/domain/CartDomain";
import useCarts from "@/hooks/useCarts";
import ProductThumbList from "@/components/ui/ProductThumbList";
import Button from "@/components/ui/Button";

const CartList = ({ item }: { item: CartProductDomain }) => {
  const { id, options, quantity } = item;

  const { updateCartProduct, removeCartProduct } = useCarts();

  const handleMinus = () => {
    if (quantity < 2) return;
    updateCartProduct.mutate({
      cartProduct: { ...item, options: options === undefined ? [] : options, quantity: quantity - 1 }
    });
  };

  const handlePlus = () => {
    updateCartProduct.mutate({
      cartProduct: { ...item, options: options === undefined ? [] : options, quantity: quantity + 1 }
    });
  };

  const handleDelete = () => {
    const deleteConfirm = confirm("장바구니의 상품을 삭제하시겠습니까?");
    if (deleteConfirm) removeCartProduct.mutate({ id });
  };

  return (
    <>
      <ProductThumbList url={`/productpage?id=${id}`} product={item} />

      <div className="flex flex-row gap-6 items-center">
        <div className="flex flex-row">
          <Button title="-" variant="contain" className="box-content w-4 h-4 px-[4px] py-[4px]" onClick={handleMinus} />

          <span className="min-w-12 px-2 text-center">{quantity}</span>

          <Button title="+" variant="contain" className="box-content w-4 h-4 px-[4px] py-[4px]" onClick={handlePlus} />
        </div>

        <Button title="삭제" variant="outline" size="small" onClick={handleDelete} />
      </div>
    </>
  );
};

export default CartList;
