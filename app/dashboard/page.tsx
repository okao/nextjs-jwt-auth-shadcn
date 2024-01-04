'use client';
import React from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import UpdateProfile from '@/pages/dashboard/UpdateProfile';
import { authApi } from '@/lib/authApi';
import { useContext } from 'react';
import { UserContext } from './AuthProvider';

const Dashboard = () => {
  const { meUser } = useContext(UserContext);
  const fetchMe = async () => {
    const res = await authApi('/auth/me', {
      method: 'GET',
    });
  };

  return (
    <section className="px-4 grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex gap-4">
        <UpdateProfile />

        <Button variant={'outline'} onClick={fetchMe}>
          Fetch Me
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <pre className="bg-gray-50 border w-full dark:bg-gray-700">
          {JSON.stringify(meUser, null, 2)}
        </pre>
      </div>
    </section>
  );
};

export default Dashboard;
