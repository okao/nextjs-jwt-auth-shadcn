'use server';
import { fetchApi } from '@/lib/http';
import { NextResponse } from 'next/server';
import {
  setCookie,
  hasCookie,
  getCookie,
  deleteCookie,
} from 'cookies-next';
import { cookies } from 'next/headers';
import { HttpStatusCode } from 'axios';

export const authApi = async (url: string, options: any) => {
  //get the cookie
  const auth_cookie = hasCookie('andy_xcess', {
    cookies,
  });

  //get the refresh cookie
  const refresh_cookie = hasCookie('andy_xcess_refresh', {
    cookies,
  });

  //if there is no cookies redirect to login page
  if (!auth_cookie && !refresh_cookie) {
    //redirect to login page
    return { data: {}, status: HttpStatusCode.Unauthorized } || {};
  }

  //get the token values
  const auth_cookie_value = getCookie('andy_xcess', {
    cookies,
  });

  //get the refresh token values
  const refresh_cookie_value = getCookie('andy_xcess_refresh', {
    cookies,
  });

  if (!auth_cookie && refresh_cookie) {
    //call refresh token
    const { data: refreshToken, status: refreshStatus } =
      await fetchApi(`auth/refresh`, {
        method: 'POST',
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${refresh_cookie_value}`,
        },
      });

    //if refresh token is not ok
    if (![201, 200].includes(refreshStatus)) {
      //remove the cookie
      deleteCookie('andy_xcess', {
        cookies,
      });

      deleteCookie('andy_xcess_refresh', {
        cookies,
      });

      //redirect to login page
      return { data: {}, status: HttpStatusCode.Unauthorized } || {};
    }

    setCookie('andy_xcess', refreshToken?.token, {
      cookies,
      maxAge: refreshToken?.tokenExpires,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    setCookie('andy_xcess_refresh', refreshToken?.refreshToken, {
      cookies,
      maxAge: refreshToken?.tokenExpires + 60 * 15, // add 15 minutes to the tokenExpiresSeconds
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });
  }

  //if no option headers set the headers
  if (!options.headers) {
    options.headers = {};
  }

  //set the token in the header
  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${auth_cookie_value}`,
  };

  //set the token in the header
  const { data, status } = await fetchApi(url, options);

  //if the status is unauthorized
  if (![200, 201, 202, 203, 204].includes(status)) {
    //remove the cookie
    deleteCookie('andy_xcess', {
      cookies,
    });

    deleteCookie('andy_xcess_refresh', {
      cookies,
    });

    //redirect to login page
    return { data: {}, status: HttpStatusCode.Unauthorized } || {};
  }

  return { data, status } || {};
};
