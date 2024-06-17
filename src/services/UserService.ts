import { onAuthStateChanged } from "firebase/auth";
import { ref, get, child } from "firebase/database";
import { auth, firebaseDb } from "@/services/FirebaseClient";
import { UserDomain } from "@/domain/UserDomain";

const dbRef = ref(firebaseDb);

const getUserInfo = async (): Promise<UserDomain | null> => {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        get(child(dbRef, `users/${user.uid}`)) //
          .then((snapshot) => {
            if (snapshot.exists()) {
              resolve(snapshot.val());
            } else {
              console.log("No data available");
            }
          });
      } else {
        resolve(null);
      }
    });
  });
};

const getUserRole = async (uid: string) => {
  return get(child(dbRef, `users/${uid}`)) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val().role;
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export default { getUserInfo, getUserRole };
