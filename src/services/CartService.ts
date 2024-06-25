import { ref, set } from "firebase/database";
import { firebaseDb } from "@/services/FirebaseClient";
import { CartProductDomain } from "@/domain/CartDomain";

const setCartProduct = async (uid: string, productInfo: CartProductDomain) => {
  const { id, image, title, price, option, quantity } = productInfo;
  return set(ref(firebaseDb, `carts/${uid}/${id}`), {
    id,
    image,
    title,
    price,
    option,
    quantity
  });
};

export default { setCartProduct };
