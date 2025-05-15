import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import { comparePassword } from "./lib/password-utils";

export const { handlers, auth, signIn, signOut } = NextAuth({
  useSecureCookies: process.env.NODE_ENV === "production",
  trustHost: true,
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: `Credentials`,
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "이메일을 입력하세요",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        // 1. 모든 값들이 정상적으로 들어왔는지 확인
        if (
          !credentials ||
          credentials.email === "" ||
          credentials.password === ""
        ) {
          throw new Error("이메일과 비밀번호를 입력하세요");
        }

        // 2. Prisma를 통해 DB에서 유저를 찾는다
        const { email, password } = credentials;
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });
        if (!user) {
          throw new Error("존재하지 않는 이메일입니다.");
        }
        // 3. 비밀번호를 확인한다
        const passwordMatch = comparePassword(
          password as string,
          user.hashedPassword as string
        );
        if (!passwordMatch) {
          throw new Error("비밀번호가 틀렸습니다.");
        }
        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
});
