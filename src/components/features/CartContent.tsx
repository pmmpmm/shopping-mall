import useCarts from "@/hooks/useCarts";
import ContentLayoutA from "@/components/layouts/ContentLayoutA";
import MessageContent from "@/components/features/MessageContent";
import ContentTitle from "@/components/ui/ContentTitle";
import ContentBlockA from "@/components/ui/ContentBlockA";
import ContentBottomA from "@/components/ui/ContentBottomA";
import CartList from "@/components/ui/CartList";
import Button from "@/components/ui/Button";
import NoContent from "@/components/ui/NoContent";

const CartContent = () => {
  const {
    getAllCartProduct: { isLoading, isError, data: cartProducts }
  } = useCarts();

  const totalPrice = cartProducts
    ?.map((product) => parseInt(product.price) * product.quantity)
    .reduce((acc, cur) => acc + cur, 0) as number;

  const deliveryCharge = 3000;

  return (
    <ContentLayoutA>
      <ContentTitle title="장바구니" />

      <ContentBlockA className="w-full p-8">
        {isLoading && <MessageContent type="loading" />}
        {isError && <MessageContent type="error" />}

        {cartProducts && (
          <>
            <ul className="flex flex-col">
              {cartProducts.map((item, idx) => (
                <li
                  key={`product-${idx}`}
                  className="flex flex-row justify-end items-center py-4 gap-4 border-b border-gray-200 border-solid last:border-0 last:pb-0"
                >
                  <CartList key={`cartList-${idx}`} item={item} />
                </li>
              ))}
            </ul>

            {cartProducts.length > 0 && (
              <div>
                <div className="mt-12 px-16 py-6 bg-gray-100/[.7]">
                  <div className="flex flex-row justify-between items-center">
                    <div className="text-center">
                      <span>상품 총 금액</span>
                      <p className="text-xl font-semibold">{totalPrice}</p>
                    </div>
                    <p>+</p>
                    <div className="text-center">
                      <span>배송비</span>
                      <p className="text-xl font-semibold">{deliveryCharge}</p>
                    </div>
                    <p>=</p>
                    <div className="text-center">
                      <span>총 금액</span>
                      <p className="text-xl font-semibold">{totalPrice + deliveryCharge}</p>
                    </div>
                  </div>
                </div>

                <ContentBottomA>
                  <Button
                    title="상품 주문하기"
                    variant="contain"
                    size="full"
                    onClick={() => {
                      alert("빠른 시일에 상품을 주문하실 수 있도록 하겠습니다. 감사합니다.");
                    }}
                  />
                </ContentBottomA>
              </div>
            )}
          </>
        )}

        {cartProducts && cartProducts.length <= 0 && <NoContent message="장바구니에 담긴 상품이 없습니다." />}
      </ContentBlockA>
    </ContentLayoutA>
  );
};

export default CartContent;
