export const UserRole = {
  ADMIN: "admin",
  USER: "user"
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export interface UserRoleStatus {
  role: UserRole;
}

export interface LoginUserStatus {
  username: string;
  role: UserRole;
}

export interface MypageUserInfo {
  username: string;
  email: string;
}

export interface UserDomain {
  username: string;
  email: string;
  role: UserRole;
  logintype: string;
}
