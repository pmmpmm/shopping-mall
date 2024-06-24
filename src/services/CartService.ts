import { ref, child, set, get, remove } from "firebase/database";
import { firebaseDb } from "@/services/FirebaseClient";
import { CartProductDomain } from "@/domain/CartDomain";

type QueryKeyType = { queryKey: string[] };

const setCartProduct = async (uid: string, productInfo: CartProductDomain) => {
  const { id, image, title, price, options, quantity } = productInfo;
  return set(ref(firebaseDb, `carts/${uid}/${id}`), {
    id,
    image,
    title,
    price,
    options,
    quantity
  });
};

const dbRef = ref(firebaseDb);
const getAllCartProduct = async ({ queryKey }: QueryKeyType) => {
  return get(child(dbRef, `carts/${queryKey[1]}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return Object.values(snapshot.val()) as CartProductDomain[];
      } else {
        console.log("No data available");
        return null;
      }
    })
    .catch((error) => console.error(error));
};

const removeCartProduct = async (uid: string, id: string) => {
  return remove(ref(firebaseDb, `carts/${uid}/${id}`));
};

export default { setCartProduct, getAllCartProduct, removeCartProduct };
