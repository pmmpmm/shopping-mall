import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ProductOption } from "@/domain/ProductDomain";
import { CartProductDomain } from "@/domain/CartDomain";
import useProducts from "@/hooks/useProducts";
import useCarts from "@/hooks/useCarts";
import { optionList as optionListSet } from "@/common/productOption";
import ContentLayoutA from "@/components/layouts/ContentLayoutA";
import FormGroup from "@/components/ui/FormGroup";
import Radio from "@/components/ui/Radio";
import Button from "@/components/ui/Button";

const ProductDetailContent = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const id = new URLSearchParams(search).get("id") as string;
  const { addCartProduct: addCartProductItem } = useCarts();

  const {
    getProduct: { data: product }
  } = useProducts();

  const [cartProductInfo, setCartProductInfo] = useState<CartProductDomain>({
    id: id,
    image: "",
    title: "",
    price: "",
    category: "",
    options: [],
    quantity: 1
  });

  useEffect(() => {
    if (product) {
      setCartProductInfo({
        ...cartProductInfo,
        image: product.image,
        title: product.title,
        price: product.price,
        category: product.category
      });
    }
  }, [product]);

  const handleOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (cartProductInfo) {
      const optionList = optionListSet(cartProductInfo.category) as ProductOption[];
      const option = optionList.find((item) => item.opt === e.target.value) as ProductOption;
      setCartProductInfo({ ...cartProductInfo, options: [option] });
    }
  };

  const addCartProduct = () => {
    if (product && !!product.options && cartProductInfo.options.length <= 0) {
      alert("상품의 옵션을 선택해 주세요.");
      return;
    }

    addCartProductItem.mutate(
      { cartProduct: cartProductInfo },
      {
        onSuccess: (data) => {
          if (data === null) return;
          const goToCartPage = confirm("장바구니에 상품이 저장되었습니다. \n장바구니 페이지로 이동하시겠습니까?");
          if (goToCartPage) navigate("/cart");
        }
      }
    );
  };
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

              {product.options && (
                <>
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
                </>
              )}

              <div className="mt-6">
                <Button title="장바구니 담기" variant="contain" size="full" onClick={addCartProduct} />
              </div>
            </div>
          </div>
        </ContentLayoutA>
      )}
    </>
  );
};

export default ProductDetailContent;
