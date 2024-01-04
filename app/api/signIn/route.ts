import { NextResponse, NextRequest } from 'next/server';
import { setCookie, hasCookie, deleteCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import { fetchApi } from '@/lib/http';

//post route
export async function POST(request: NextRequest) {
  const res = new NextResponse();
  const data = await request.json();

  //create a new session for the user
  const session = hasCookie('auth');
  const timestamp = new Date().getTime();
  //do something with the session
  if (!session) {
    try {
      const { data: apiData, status: apiStatus } = await fetchApi(
        `/auth/email/login?timestamp=${timestamp}`,
        {
          method: 'POST',
          body: JSON.stringify({
            email: data?.username,
            password: data?.password,
          }),
        }
      );

      if (![201, 200].includes(apiStatus)) {
        //remove the cookie
        deleteCookie('AndyAuth', {
          cookies,
        });

        deleteCookie('AndyAuthRefresh', {
          cookies,
        });

        return NextResponse.json(
          { error: apiData?.errors },
          { status: 401 }
        );
      }

      //change tokenExpires from ms to seconds
      const tokenExpiresSeconds = apiData.tokenExpires / 1000;

      //set a new cookie for 1 minute
      setCookie('AndyAuth', apiData?.token, {
        cookies,
        maxAge: tokenExpiresSeconds,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      });

      setCookie('AndyAuthRefresh', apiData?.refreshToken, {
        cookies,
        maxAge: tokenExpiresSeconds + 60 * 15, // add 15 minutes to the tokenExpiresSeconds
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      });

      return NextResponse.json({ data: apiData }, { status: 200 });
    } catch (err) {
      return NextResponse.json(
        { error: 'Internal Server Error' },
        { status: 500 }
      );
    }
  }
}
