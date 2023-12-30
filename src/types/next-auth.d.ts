import NextAuth from 'next-auth/next';
import { Session, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    accessToken: string;
    refreshToken: string;
    tokenExpiresIn: string;
    user: {
      id: string;
      username: string;
      email: string;
    };
    iat: number;
    exp: number;
    expires: Date;
    // expires: Date;
  }
  interface User {
    accessToken: string;
    refreshToken: string;
    tokenExpiresIn: string;
    user: {
      id: string;
      username: string;
      email: string;
    };
    iat: number;
    exp: number;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string;
    refreshToken: string;
    tokenExpiresIn: string;
    user: {
      id: string;
      username: string;
      email: string;
    };
    iat: number;
    exp: number;
  }
}

// {
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIxNzI4OTZhLTNlMGUtNDJkYi05YTE4LTU5MjA3OGUzY2M1YiIsImlhdCI6MTcwMzEwNTM4NCwiZXhwIjoxNzAzMTA1OTg0fQ.aLhUNUyRcSzDVpfHC8ofGzQoOt12F4aigeYubbuFWz4",
//     "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIxNzI4OTZhLTNlMGUtNDJkYi05YTE4LTU5MjA3OGUzY2M1YiIsImlhdCI6MTcwMzEwNTM4NCwiZXhwIjoxNzAzMTA2Mjg0fQ.pGc_iWRKG8YBGbxR6qQ4A4h1yobyTRmRyc-W8jP2pTk",
//     "tokenExpiresIn": "10m",
//     "user": {
//         "id": "b172896a-3e0e-42db-9a18-592078e3cc5b",
//         "username": "okao",
//         "email": "hamzathanees@gmail.com"
//     }
// }
