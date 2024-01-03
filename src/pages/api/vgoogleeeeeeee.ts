import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //redirect the user to the nestjs api route for google auth
  //NEXT_PUBLIC_API_URL

  const { NEXT_PUBLIC_API_URL } = process.env;

  console.log('NEXT_PUBLIC_API_URL', NEXT_PUBLIC_API_URL);

  const url = `${NEXT_PUBLIC_API_URL}/api/v1/auth/google/google`;

  res.redirect(url);
}
