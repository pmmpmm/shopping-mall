import { useQuery } from "@tanstack/react-query";
import CartService from "@/services/CartService";
import { UseLoginContext } from "@/context/LoginContext";
import ContentLayoutA from "@/components/layouts/ContentLayoutA";
import ContentTitle from "@/components/ui/ContentTitle";
import FieldFormBlock from "@/components/ui/FieldFormBlock";
import CartList from "@/components/ui/CartList";
import FieldFormButtonArea from "../ui/FieldFormButtonArea";
import Button from "../ui/Button";

const CartContent = () => {
  const { userId } = UseLoginContext();

  const { data: cartProduct } = useQuery({
    queryKey: ["cartProduct", userId],
    queryFn: CartService.getAllCartProduct
  });

  return (
    <ContentLayoutA>
      <ContentTitle title="장바구니" />

      <FieldFormBlock className="w-full p-8">
        {cartProduct ? (
          <ul className="flex flex-col">
            {cartProduct.map((item, idx) => (
              <CartList key={`cartList-${idx}`} item={item} />
            ))}
          </ul>
        ) : (
          <div className="flex justify-center py-8">
            <span className="text-lg font-medium">
              <em className="not-italic text-[26px] align-top">😅</em> 장바구니에 상품이 없습니다.
            </span>
          </div>
        )}

        <div className="mt-10 pt-8 border-t border-gray-200 border-solid">
          <div className="flex flex-row justify-between items-center">
            <div className="px-10 text-center">
              <span>상품 총 금액</span>
              <p className="text-xl font-semibold">100000</p>
            </div>
            <p>+</p>
            <div className="px-10 text-center">
              <span>배송비</span>
              <p className="text-xl font-semibold">3000</p>
            </div>
            <p>=</p>
            <div className="px-10 text-center">
              <span>총 금액</span>
              <p className="text-xl font-semibold">103000</p>
            </div>
          </div>
        </div>
        <FieldFormButtonArea>
          <Button title="상품 주문 하기" variant="contain" size="full" />
        </FieldFormButtonArea>
      </FieldFormBlock>
    </ContentLayoutA>
  );
};

export default CartContent;
