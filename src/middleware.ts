import { NextApiRequest, NextApiResponse } from 'next';

export { default } from 'next-auth/middleware';
export const config = {
  matcher: ['/andy', '/andy/:path*'],
};
