import { useLocation } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import queryClient from "@/services/QueryClient";
import ProductService from "@/services/ProductService";
import { ProductValueDomain } from "@/domain/ProductDomain";
import { categoryToKrUtil } from "@/common/categoryToKrUtil";

const useProducts = () => {
  const { search } = useLocation();
  const category = categoryToKrUtil(new URLSearchParams(search).get("category") as string) as string;
  const id = new URLSearchParams(search).get("id") as string;

  const getAllProducts = useQuery({
    queryKey: ["all-products"],
    queryFn: ProductService.getAllProducts,
    select: (response) => {
      if (response) {
        return response.filter((item) => {
          if (category === "전체" || category === undefined) return item;
          return item.category === category;
        });
      }
    }
  });

  const getProduct = useQuery({
    queryKey: ["product", id],
    queryFn: ProductService.getProduct,
    enabled: !!id
  });

  const setProduct = useMutation({
    mutationFn: ({ product }: { product: ProductValueDomain }) => ProductService.setProduct(product),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["all-products"] })
  });

  const deleteProduct = useMutation({
    mutationFn: ({ id }: { id: string }) => ProductService.removeProduct(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["all-products"] })
  });

  return { getAllProducts, getProduct, setProduct, deleteProduct };
};

export default useProducts;
