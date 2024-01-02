import axios from "@/lib/axios";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import { cookies } from "next/headers";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      //name of the provider
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "jsmith",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, req) => {
        try {
          if (!credentials?.username || !credentials?.password) return null;

          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/email/login`,
            {
              method: "POST",
              body: JSON.stringify({
                email: credentials.username,
                password: credentials.password,
              }),
              headers: { "Content-Type": "application/json" },
            }
          );

          if (res.status === 401) {
            return null;
          }

          const user = await res.json();

          if (!user) {
            return null;
          }

          //set the refresh token in the cookie
          cookies().set({
            name: "andy-rft",
            value: user.refreshToken,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            sameSite: "lax",
            domain:
              process.env.NODE_ENV === "production"
                ? process.env.NODE_PUBLIC_DOMAIN
                : "",
          });

          return user;
        } catch (err) {
          console.log("err", err);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,
  // secret: process.env.NEXTAUTH_SECRET,

  // session: {
  //   strategy: 'jwt',
  //   maxAge: 100000, // 100 seconds
  // },

  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
    newUser: "/auth/register", // If set, new users will be directed here on first sign in
    // error: '/auth/login',
    // verifyRequest: '/auth/verify-request',
  },

  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("signIn", user, account, profile);
      return true;
    },
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.accessToken = user.token;
        token.refreshToken = user.refreshToken;
        token.tokenExpiresIn = user.tokenExpires;
        token.user = {
          id: user.user.id,
          username: user.user.email,
          email: user.user.email,
        };
        token.iat = Date.now();
        token.exp = parseInt(user.tokenExpires);
        token.expiresIn = parseInt(user.tokenExpires);
        // token.accessTokenExpires = parseInt(user.tokenExpiresIn);

        // console.log('token', token);
        return token;
      }

      if (Date.now() < parseInt(token?.tokenExpiresIn)) {
        console.log("tokenNotExpired", token.tokenExpiresIn);
        // console.log('Date.now()', Date.now());
        return token;
      }

      //since the token is expired, refresh it
      const userToken = await refreshAccessToken(token);

      if (userToken) {
        token.accessToken = userToken.token;
        token.refreshToken = userToken.refreshToken;
        token.tokenExpiresIn = userToken.tokenExpiresIn;
        token.user = {
          id: userToken.user.id,
          username: userToken.user.email,
          email: userToken.user.email,
        };
        token.iat = Date.now();
        token.exp = parseInt(userToken.tokenExpiresIn);
        token.expiresIn = parseInt(userToken.tokenExpiresIn);
        return token;
      }

      return null;
    },

    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
        session.tokenExpiresIn = token.tokenExpiresIn;
        session.user = {
          id: token.user.id,
          username: token.user.email,
          email: token.user.email,
        };

        return session;
      }

      return session;
    },

    // async logout({ token }: { token: any }) {
    //   try {
    //     const res = await fetch(
    //       `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/logout`,
    //       {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //           userId: token.user.id,
    //           refreshToken: token.refreshToken,
    //         }),
    //       }
    //     );

    //     const user = await res.json();

    //     if (user) {
    //       return user;
    //     }

    //     return null;
    //   } catch (err) {
    //     console.log(err);
    //     return null;
    //   }
    // },
  },
};

async function refreshAccessToken(token: any) {
  try {
    console.log("RefreshToken Called", token);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/refresh`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: token.user.id,
          refreshToken: token.refreshToken,
        }),
      }
    );

    const user = await res.json();

    return user;
  } catch (err) {
    console.log("err", err);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
