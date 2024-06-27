import { useMutation } from "@tanstack/react-query";
import CartService from "@/services/CartService";
import queryClient from "@/services/QueryClient";
import { UseLoginContext } from "@/context/LoginContext";
import { CartProductDomain } from "@/domain/CartDomain";
import ProductThumbList from "@/components/ui/ProductThumbList";
import Button from "@/components/ui/Button";

const CartList = ({ item }: { item: CartProductDomain }) => {
  const { userId } = UseLoginContext();
  const { id, quantity } = item;

  interface UpdateMutationParams {
    userId: string;
    item: CartProductDomain;
  }
  interface DeleteMutationParams {
    userId: string;
    id: string;
  }

  const handleMinus = useMutation({
    mutationFn: ({ userId, item }: UpdateMutationParams) =>
      CartService.setCartProduct(userId, { ...item, quantity: quantity - 1 }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cartProducts"] })
  });
  const handlePlus = useMutation({
    mutationFn: ({ userId, item }: UpdateMutationParams) =>
      CartService.setCartProduct(userId, { ...item, quantity: quantity + 1 }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cartProducts"] })
  });
  const handleDelete = useMutation({
    mutationFn: ({ userId, id }: DeleteMutationParams) => CartService.removeCartProduct(userId, id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cartProducts"] })
  });

  return (
    <li className="flex flex-row justify-end items-center py-4 gap-4 border-b border-gray-200 border-solid last:border-0 last:pb-0">
      <ProductThumbList url={`/productpage?id=${id}`} product={item} />
      <div className="flex flex-row gap-6 items-center">
        <div className="flex flex-row">
          <Button
            title="-"
            variant="contain"
            className="box-content w-4 h-4 px-[4px] py-[4px]"
            onClick={() => {
              if (quantity < 2) return;
              handleMinus.mutate({ userId, item });
            }}
          />
          <span className="min-w-12 px-2 text-center">{quantity}</span>
          <Button
            title="+"
            variant="contain"
            className="box-content w-4 h-4 px-[4px] py-[4px]"
            onClick={() => {
              handlePlus.mutate({ userId, item });
            }}
          />
        </div>
        <Button
          title="삭제"
          variant="outline"
          size="small"
          onClick={() => {
            const deleteConfirm = confirm("장바구니의 상품을 삭제하시겠습니까?");
            if (deleteConfirm) handleDelete.mutate({ userId, id });
          }}
        />
      </div>
    </li>
  );
};

export default CartList;
