import { useQuery } from "@tanstack/react-query";
import CartService from "@/services/CartService";
import { UseLoginContext } from "@/context/LoginContext";
import ContentLayoutA from "@/components/layouts/ContentLayoutA";
import ContentTitle from "@/components/ui/ContentTitle";
import FieldFormBlock from "@/components/ui/FieldFormBlock";
import FieldFormButtonArea from "@/components/ui/FieldFormButtonArea";
import CartList from "@/components/ui/CartList";
import Button from "@/components/ui/Button";

const CartContent = () => {
  const { userId } = UseLoginContext();

  const { data: cartProducts } = useQuery({
    queryKey: ["cartProducts", userId],
    queryFn: CartService.getAllCartProduct
  });

  const totalPrice = cartProducts
    ?.map((product) => parseInt(product.price) * product.quantity)
    .reduce((acc, cur) => acc + cur, 0) as number;

  const deliveryCharge = 3000;

  return (
    <ContentLayoutA>
      <ContentTitle title="장바구니" />

      <FieldFormBlock className="w-full p-8">
        {cartProducts ? (
          <ul className="flex flex-col">
            {cartProducts.map((item, idx) => (
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
        {!!cartProducts && (
          <>
            <div className="mt-10 pt-8 border-t border-gray-200 border-solid">
              <div className="flex flex-row justify-between items-center">
                <div className="px-10 text-center">
                  <span>상품 총 금액</span>
                  <p className="text-xl font-semibold">{totalPrice}</p>
                </div>
                <p>+</p>
                <div className="px-10 text-center">
                  <span>배송비</span>
                  <p className="text-xl font-semibold">{deliveryCharge}</p>
                </div>
                <p>=</p>
                <div className="px-10 text-center">
                  <span>총 금액</span>
                  <p className="text-xl font-semibold">{totalPrice + deliveryCharge}</p>
                </div>
              </div>
            </div>
            <FieldFormButtonArea>
              <Button
                title="상품 주문하기"
                variant="contain"
                size="full"
                onClick={() => {
                  alert("빠른 시일에 상품을 주문하실 수 있도록 하겠습니다. 감사합니다.");
                }}
              />
            </FieldFormButtonArea>
          </>
        )}
      </FieldFormBlock>
    </ContentLayoutA>
  );
};

export default CartContent;
