'use client';
import { getServerSession } from 'next-auth';
import { ReactNode, useLayoutEffect } from 'react';
interface Props {
  children: ReactNode;
}
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
const UserProvider = ({ children }: Props) => {
  const { data: session, status } = useSession();

  useLayoutEffect(() => {
    if (status === 'unauthenticated') {
      redirect('/auth/signin');
    }
  }, [status]);

  return <div>{children}</div>;
};

export default UserProvider;
