import { fetchApi } from '@/lib/http';
import { NextResponse } from 'next/server';
import { setCookie } from 'cookies-next';
import { cookies } from 'next/headers';

export const authApi = async (url: string, options: any) => {
  const fetchUrl = `${url}`;
  //call fetschApi
  const { data, status } = await fetchApi(fetchUrl, options);

  //now check if the data is ok
  if (![201, 200].includes(status)) {
    //call refresh token
    const { data: refreshToken, status: refreshStatus } =
      await fetchApi(`auth/refresh`, {
        method: 'POST',
      });

    //if refresh token is not ok
    if (![201, 200].includes(refreshStatus)) {
      //remove the cookie
      setCookie('auth', '', {
        maxAge: 0,
      });

      //redirect to login page
      return NextResponse.redirect('/login');
    }

    //if refresh token is ok
    //set the new cookie
    setCookie('auth', refreshToken?.token, {
      maxAge: 60 * 60 * 24 * 7,
    });
  }

  return data;
};
