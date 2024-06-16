export type UserRole = "user" | "admin";

export interface LoginUserStatus {
  username: string;
  role: UserRole;
}

export interface MypageUseInfo {
  username: string;
  email: string;
}

export interface UserDomain {
  username: string;
  email: string;
  role: UserRole;
  logintype: string;
}
