import { onAuthStateChanged } from "firebase/auth";
import { ref, get, child } from "firebase/database";
import { auth, firebaseDb } from "@/services/FirebaseClient";
import { UserDomain } from "@/domain/UserDomain";

const dbRef = ref(firebaseDb);

const getUserInfo = async (): Promise<UserDomain | null> => {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        localStorage.setItem(import.meta.env.VITE_FIREBASE_REFRESH_TOKEN, user.refreshToken);

        get(child(dbRef, `users/${user.uid}`)) //
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

export default { getUserInfo };
