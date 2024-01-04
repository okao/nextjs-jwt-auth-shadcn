'use client';
import React, { ReactNode, use, useLayoutEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Loader from '@/components/custom/loader';
import { ScaleLoader } from 'react-spinners';
import { fetchApi } from '@/lib/http';
import { authApi } from '@/lib/authApi';
import { useToast } from '@/components/ui/use-toast';
import { createContext, useContext, useState } from 'react';

interface Props {
  children: ReactNode;
}

export const UserContext = createContext<any>({});

const AuthRoutesProvider = ({ children }: Props) => {
  const { toast } = useToast();
  const router = useRouter();
  const pathName = usePathname();
  const [authenticated, setAuthenticated] =
    React.useState<boolean>(false);
  const [meUser, setMeUser] = useState<any>({}); //user object
  // const [user, setUser] = React.useState<any>({}); //user object

  //function to check if user is authenticated using a fetch request to the api
  const checkAuth = async () => {
    const { data: meData, status: meStatus } = await authApi(
      '/auth/me',
      {
        method: 'GET',
      }
    );

    //redirect to login page if user is not authenticated
    if (![200, 201, 202, 203].includes(meStatus)) {
      toast({
        title: 'Error',
        description:
          'You are not authenticated! Redirecting to login page.',
        duration: 4000,
        variant: 'destructive',
      });

      //redirect to login page after 3 seconds
      router.push('/auth/login');
    } else {
      setMeUser(meData);
      setAuthenticated(true);
    }
  };

  useLayoutEffect(() => {
    checkAuth();
  }, []);

  if (authenticated) {
    return (
      <UserContext.Provider value={{ meUser }}>
        {children}
      </UserContext.Provider>
    );
  }

  return (
    <div className="h-screen w-screen bg-gray-700 flex justify-center items-center">
      <ScaleLoader color="#ffffff" />
    </div>
  );
};

export default AuthRoutesProvider;
