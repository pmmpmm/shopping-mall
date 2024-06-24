import React from "react";
import { onAuthStateChanged } from "firebase/auth";
import { ref, get, child } from "firebase/database";
import { auth, firebaseDb } from "@/services/FirebaseClient";
import { UserDomain } from "@/domain/UserDomain";

const dbRef = ref(firebaseDb);

type QueryKeyType = { queryKey: string[] };

const getUserInfo = async ({ queryKey }: QueryKeyType): Promise<UserDomain | null> => {
  return get(child(dbRef, `users/${queryKey[1]}`)) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log("No data available");
      }
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

const getUserId = (callback: React.Dispatch<React.SetStateAction<string>>) => {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      callback(user.uid);
    } else {
      callback("");
    }
  });
};

export default { getUserInfo, getUserRole, getUserId };
