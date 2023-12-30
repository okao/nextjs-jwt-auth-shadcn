'use client';
import Loader from '@/components/custom/loader';
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { ReactNode, useLayoutEffect } from 'react';
import { ScaleLoader } from 'react-spinners';
import authRoutes from '@/lib/constants/auth-routes';

interface Props {
  children: ReactNode;
}

const NonAuthRoutesProviders = ({ children }: Props) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathName = usePathname() as string;

  useLayoutEffect(() => {
    if (status === 'authenticated' && authRoutes.includes(pathName)) {
      router.push('/andy');
    }
  }, [status, router, pathName]);

  if (status === 'unauthenticated') {
    return <div>{children}</div>;
  }

  return (
    <div className="h-screen w-screen bg-gray-700 flex justify-center items-center">
      <ScaleLoader color="#ffffff" />
    </div>
  );
};

export default NonAuthRoutesProviders;
