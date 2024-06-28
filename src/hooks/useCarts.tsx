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
    enabled: !!userId
  });

  const addAndUpdateCartProduct = useMutation({
    mutationFn: (
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

  return { getAllCartProduct, addAndUpdateCartProduct, removeCartProduct };
};

export default useCarts;
