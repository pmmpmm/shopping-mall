import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ProductOption } from "@/domain/ProductDomain";
import { CartProductDomain } from "@/domain/CartDomain";
import ProductService from "@/services/ProductService";
import CartService from "@/services/CartService";
import queryClient from "@/services/QueryClient";
import { UseLoginContext } from "@/context/LoginContext";
import { optionSizeList } from "@/common/productOption";
import ContentLayoutA from "@/components/layouts/ContentLayoutA";
import FormGroup from "@/components/ui/FormGroup";
import Radio from "@/components/ui/Radio";
import Button from "@/components/ui/Button";

const ProductDetailContent = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const id = new URLSearchParams(search).get("id") as string;
  const { userId } = UseLoginContext();

  const { data: product } = useQuery({
    queryKey: ["product", id],
    queryFn: ProductService.getProduct,
    enabled: !!id
  });

  const [cartProductInfo, setCartProductInfo] = useState<CartProductDomain>({
    id: id,
    image: "",
    title: "",
    price: "",
    options: [],
    quantity: 1
  });

  useEffect(() => {
    if (product) {
      setCartProductInfo({ ...cartProductInfo, image: product.image, title: product.title, price: product.price });
    }
  }, [product]);

  const handleOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    const option = optionSizeList.find((item) => item.opt === e.target.value) as ProductOption;
    setCartProductInfo({ ...cartProductInfo, options: [option] });
  };

  interface AddMutationParams {
    userId: string;
    cartProductInfo: CartProductDomain;
  }

  const addCartProduct = useMutation({
    mutationFn: ({ userId, cartProductInfo }: AddMutationParams) => CartService.setCartProduct(userId, cartProductInfo),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cartProducts"] })
  });

  return (
    <>
      {product && (
        <ContentLayoutA>
          <div className="flex flex-row gap-10">
            <div className="basis-[54%]">
              <div className="w-full ">
                <img src={product.image} alt="상품 이미지" className="w-full" />
              </div>
            </div>

            <div className="basis-[46%]">
              <div className="mb-7">
                <h3 className="text-black text-3xl font-medium">{product.title}</h3>
                <p className="mt-1 text-lg font-light">₩ {product.price}</p>
                <p className="mt-4 text-base">{product.description}</p>
              </div>

              <hr className="border-gray-200" />

              <div className="flex flex-row items-center gap-4 mt-5">
                <p className="leading-none">사이즈</p>
                <FormGroup direction="row">
                  {product.options.map((option, idx) => (
                    <Radio
                      key={`option-${idx}`}
                      id={option.opt}
                      value={option.opt}
                      name="option"
                      onChange={handleOption}
                    />
                  ))}
                </FormGroup>
              </div>

              <div className="mt-6">
                <Button
                  title="장바구니 담기"
                  variant="contain"
                  size="full"
                  onClick={() => {
                    addCartProduct.mutate(
                      { userId, cartProductInfo },
                      {
                        onSuccess: () => {
                          const toCartPage = confirm(
                            "장바구니에 상품이 저장되었습니다. \n장바구니 페이지로 이동하시겠습니까?"
                          );
                          if (toCartPage) navigate("/cart");
                        }
                      }
                    );
                  }}
                />
              </div>
            </div>
          </div>
        </ContentLayoutA>
      )}
    </>
  );
};

export default ProductDetailContent;
