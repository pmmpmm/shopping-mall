import { ref, child, set, get, remove } from "firebase/database";
import { firebaseDb } from "@/services/FirebaseClient";
import { ProductValueDomain } from "@/domain/ProductDomain";
import { v4 as uuidv4 } from "uuid";

type QueryKeyType = { queryKey: string[] };

const setProduct = async (productInfo: ProductValueDomain) => {
  const { id, image, title, price, description, category, options } = productInfo;
  const productId = id === "" ? uuidv4() : id;
  return set(ref(firebaseDb, "products/" + productId), {
    id: productId,
    image,
    title,
    price,
    description,
    category,
    options
  });
};

const dbRef = ref(firebaseDb);
const getAllProducts = async () => {
  return get(child(dbRef, `products`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return Object.values(snapshot.val()) as ProductValueDomain[];
      } else {
        console.log("No data available");
        return null;
      }
    })
    .catch((error) => console.error(error));
};

const getProduct = async ({ queryKey }: QueryKeyType) => {
  return get(child(dbRef, `products/${queryKey[1]}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val() as ProductValueDomain;
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => console.error(error));
};

const removeProduct = async (id: string) => {
  return remove(child(dbRef, `products/${id}`));
};

export default { setProduct, getAllProducts, getProduct, removeProduct };
