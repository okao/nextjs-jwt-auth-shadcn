'use client';

import axios from '@/lib/axios';
import { signIn, useSession } from 'next-auth/react';

export const useRefreshToken = () => {
  console.log('useRefreshToken called');
  const { data: session } = useSession();

  const refreshToken = async () => {
    axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${session?.refreshToken}`;

    const res = await axios.post('/api/v1/auth/refresh');

    if (session) session.refreshToken = res.data.accessToken;
    else signIn('credentials');
  };
  return refreshToken();
};
