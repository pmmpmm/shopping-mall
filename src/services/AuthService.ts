import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/services/FirebaseClient";

const signup = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === "auth/weak-password") alert("비밀번호를 6자리이상 입력해주세요.");
    });
};
export default { signup };
