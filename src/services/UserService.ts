import { onAuthStateChanged } from "firebase/auth";
import { ref, get, child } from "firebase/database";
import { auth, firebaseDb } from "@/services/FirebaseClient";
import { LoginUserStatus } from "@/domain/UserDomain";

const dbRef = ref(firebaseDb);
const getUserStatus = async (): Promise<LoginUserStatus | null> => {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        localStorage.setItem(import.meta.env.VITE_FIREBASE_REFRESH_TOKEN, user.refreshToken);

        const uid = user.uid;
        get(child(dbRef, `users/${uid}`)) //
          .then((snapshot) => {
            if (snapshot.exists()) {
              resolve(snapshot.val());
            } else {
              console.log("No data available");
            }
          });
      } else {
        localStorage.removeItem(import.meta.env.VITE_FIREBASE_REFRESH_TOKEN);
        resolve(null);
      }
    });
  });
};

export default { getUserStatus };
