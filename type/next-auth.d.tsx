import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string; // accessToken을 선택적으로 추가
  }
}
