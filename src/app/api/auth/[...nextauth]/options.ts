import {
  NextAuthOptions,
  User as NextAuthUser,
  Session as NextAuthSession,
} from "next-auth";

interface User extends NextAuthUser {
  number?: string;
  role?: string;
}

import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { sendOTP, verifyOtp } from "@/app/actions/otp/actions";
import {
  findUser,
  setUser,
  findStaff,
  checkAdmin,
  setAdmin,
} from "@/app/actions/user/actions";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        number: { label: "number", type: "text" },
        otp: { label: "Otp", type: "number" },
        password: { label: "Password", type: "password" },
        step: { label: "Step", type: "hidden" },
        token: { label: "token", type: "hidden" },
        firstname: { label: "Firstname", type: "text" },
        lastname: { label: "Lastname", type: "text" },
        mode: { label: "mode", type: "hidden" },
        type: { label: "type", type: "hidden" },
        isAdmin: { label: "isAdmin", type: "hidden" },
      },
      async authorize(credentials: any): Promise<any> {
        if (!credentials) throw new Error("No credentials");

        const {
          number,
          otp,
          password,
          step,
          mode,
          firstname,
          lastname,
          type,
          isAdmin,
        } = credentials;

        try {
          // 1. sign-in method , which have included admin or staff sign-in methods

          if (mode === "signin") {
            //if user try to signing-in
            if (type === "USER") {
              //sign in verify with otp
              const user = await findUser(number);
              if (!user) throw new Error("user not found");

              //if try to sign-in with otp
              if (step === "otp") {
                const isVerified = await verifyOtp(number, otp);
                if (!isVerified) throw new Error("please enter otp correctly ");
                return user;
              }
              //if try to sign-in with password
              if (step === "password") {
                if (!user.password) throw new Error("User password is null");
                const iscorrectpassword = await bcrypt.compare(
                  password,
                  user.password
                );
                if (!iscorrectpassword) throw new Error("password not matched");

                return user;
              }
            } else if (type === "STAFF" || "ADMIN") {
              //sign in verify with otp
              const user = await findStaff(number);
              if (!user) throw new Error("user not found");

              //if try to sign-in with otp
              if (step === "otp") {
                const isVerified = await verifyOtp(number, otp);
                if (isVerified) throw new Error("password not matched");
                return user;
              }
              //if try to sign-in with password
              if (step === "password") {
                if (!user.password) throw new Error("User password is null");
                const iscorrectpassword = await bcrypt.compare(
                  password,
                  user.password
                );
                if (!iscorrectpassword) throw new Error("password not matched");

                return user;
              }
            }

            //2. if mode is signup
          } else if (mode === "signup") {
            //user signup method
            if (type === "USER") {
              //first check if user existed

              const user = await findUser(number);
              if (user) {
                return user;
              } else {
                const createUser = await setUser(
                  firstname,
                  lastname,
                  number,
                  password,
                  type
                );
                if (createUser) {
                  const newuser = await findUser(number);
                  return newuser;
                }
              }
              throw new Error("user not signed-Up");
            }
            //admin signup method
            else if (type === "STAFF" ||"ADMIN") {
              //sign-up for admin
              const admin = await checkAdmin();
              if (admin) return { error: "admin already exist" };
              const createAdmin = await setAdmin(
                firstname,
                lastname,
                number,
                password,
                isAdmin,
                type
              );
              if (createAdmin) {
                const newadmin = await findStaff(number);
                return newadmin;
              }
            }
          }
        } catch (err: any) {
          throw new Error(err);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user.id?.toString(); // Convert ObjectId to string
        token.name = user.name;
        token.number = (user as User).number;
        token.role = (user as User).role;
      }

      return token;
    },

    async session({ session, token }: any) {
      if (token) {
        if (session.user) {
          session.user._id = token._id;
          session.user.name = token.name;
          session.user.number = token.number;

          session.user.role = token.role;
        }
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
};
