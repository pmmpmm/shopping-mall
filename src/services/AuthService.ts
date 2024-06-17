import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  deleteUser,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential
} from "firebase/auth";
import { ref, remove, set } from "firebase/database";
import { auth, firebaseDb } from "@/services/FirebaseClient";
import queryClient from "@/services/QueryClient";

const catchErrorCode = (errorCode: string, defaultMessage: string) => {
  switch (errorCode) {
    case "auth/invalid-credential":
      return "유효하지 않은 정보입니다.";
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
      return defaultMessage;
  }
};

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
      catchErrorCode(error.code, "회원가입에 실패 하였습니다.");
    });
};

const login = async (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // 로그인 완료
      return userCredential.user;
    })
    .catch((error) => {
      catchErrorCode(error.code, "로그인에 실패 하였습니다.");
    });
};

const logout = async (queryKey: string) => {
  return signOut(auth) //
    .then(() => {
      queryClient.removeQueries({ queryKey: [queryKey] });
    });
};

const changePassword = async (currentPassword: string, newPassword: string) => {
  const user = auth.currentUser;
  if (user) {
    const credential = EmailAuthProvider.credential(user.email as string, currentPassword);
    // 1. 비빌번호로 자격 재인증 시도
    return reauthenticateWithCredential(user, credential) //
      .then(async (result) => {
        // 2-1.재인증 성공
        return updatePassword(result.user, newPassword) //
          .then(() => {
            // 3-1.재인증 성공 후
          })
          .catch((error) => {
            // 3-2.재인증 성공 후 updatePassword() 실패
            return catchErrorCode(error.code, "비밀번호 변경에 실패 하였습니다.");
          });
      })
      .catch((error) => {
        // 2-2.재인증 실패
        return catchErrorCode(error.code, "비밀번호 변경에 실패 하였습니다.");
      });
  }
};

const deleteAccount = async (currentPassword: string, queryKey: string) => {
  const user = auth.currentUser;
  if (user) {
    const credential = EmailAuthProvider.credential(user.email as string, currentPassword);

    return reauthenticateWithCredential(user, credential) //
      .then(async (result) => {
        remove(ref(firebaseDb, "users/" + result.user.uid));

        return deleteUser(result.user) //
          .then(() => {
            // remove(),set()등 실행 안됨
            queryClient.removeQueries({ queryKey: [queryKey] });
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => {
        return catchErrorCode(error.code, "회원탈퇴에 실패 하였습니다.");
      });
  }
};

export default { signup, login, logout, deleteAccount, changePassword };
