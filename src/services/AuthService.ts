import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, firebaseDb } from "@/services/FirebaseClient";

const signup = async (name: string, email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // 회원가입 완료
      return userCredential.user;
    })
    .then((user) => {
      // firebase DB에 사용자 정보 저장
      const uid = user.uid;
      set(ref(firebaseDb, "users/" + uid), {
        username: name,
        email: email,
        role: "user",
        logintype: user && "email-password"
      });
      return user;
    })
    .catch((error) => {
      switch (error.code) {
        case "auth/email-already-in-use":
          return "이미 사용 중인 이메일입니다.";
        case "auth/invalid-email":
          return "잘못된 이메일 형식입니다.";
        case "auth/weak-password":
          return "비밀번호는 6글자 이상이어야 합니다.";
        case "auth/network-request-failed":
          return "네트워크 연결에 실패 하였습니다.";
        case "auth/internal-error":
          return "잘못된 요청입니다.";
        default:
          return "회원가입에 실패 하였습니다.";
      }
    });
};

const login = async (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // 로그인 완료
      return userCredential.user;
    })
    .catch((error) => {
      switch (error.code) {
        case "auth/invalid-credential":
          return "유효하지 않은 정보입니다.";
        case "auth/invalid-email":
          return "잘못된 이메일 형식입니다.";
        case "auth/weak-password":
          return "비밀번호는 6글자 이상이어야 합니다.";
        case "auth/network-request-failed":
          return "네트워크 연결에 실패 하였습니다.";
        case "auth/internal-error":
          return "잘못된 요청입니다.";
        default:
          return "로그인에 실패 하였습니다.";
      }
    });
};

const logout = async () => {
  return signOut(auth);
};

export default { signup, login, logout };
