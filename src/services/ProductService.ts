import { ref, child, set, get } from "firebase/database";
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

const dbRef = ref(firebaseDb);
const getAllProducts = async () => {
  return get(child(dbRef, `products`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return Object.values(snapshot.val()) as ProductDomain[];
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => console.error(error));
};

export default { setProduct, getAllProducts };
