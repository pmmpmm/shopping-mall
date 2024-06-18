import { ref, set } from "firebase/database";
import { firebaseDb } from "@/services/FirebaseClient";
import { ProductDomain } from "@/domain/ProductDomain";

const setProduct = async (productInfo: ProductDomain) => {
  const { id, image, title, price, description, category, options } = productInfo;
  return set(ref(firebaseDb, "products/" + id), {
    id,
    image,
    title,
    price,
    description,
    category,
    options
  });
};

export default { setProduct };
