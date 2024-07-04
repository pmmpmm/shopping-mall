import { UseLoginContext } from "@/context/LoginContext";
import { CartProductDomain } from "@/domain/CartDomain";
import CartService from "@/services/CartService";
import queryClient from "@/services/QueryClient";
import { useMutation, useQuery } from "@tanstack/react-query";

const useCarts = () => {
  const { userId } = UseLoginContext();

  const getAllCartProduct = useQuery({
    queryKey: ["all-cartProducts", userId],
    queryFn: CartService.getAllCartProduct,
    select: (response) => {
      if (response) return response;
    }
  });

  const addCartProduct = useMutation({
    mutationFn: async (
      { cartProduct }: { cartProduct: CartProductDomain } //
    ) => {
      const { data } = getAllCartProduct;

      if (data && data.some((item) => item.id === cartProduct.id)) {
        const confirmAddCart = confirm("동일한 상품이 장바구니에 있습니다. \n장바구니에 상품을 덮어씌울까요?");
        if (confirmAddCart) {
          return CartService.setCartProduct(userId, cartProduct);
        } else {
          return null;
        }
      }

      return CartService.setCartProduct(userId, cartProduct);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["all-cartProducts", userId] })
  });

  const updateCartProduct = useMutation({
    mutationFn: async (
      { cartProduct }: { cartProduct: CartProductDomain } //
    ) => CartService.setCartProduct(userId, cartProduct),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["all-cartProducts", userId] })
  });

  const removeCartProduct = useMutation({
    mutationFn: (
      { id }: { id: string } //
    ) => CartService.removeCartProduct(userId, id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["all-cartProducts", userId] })
  });

  return { getAllCartProduct, addCartProduct, updateCartProduct, removeCartProduct };
};

export default useCarts;
