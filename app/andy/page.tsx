'use client';
import Link from 'next/link';

import { siteConfig } from '@/config/site';
import { Button, buttonVariants } from '@/components/ui/button';
import { useAxiosAuth } from '@/hooks/useAxiosAuth';
import { useEffect } from 'react';
import UpdateProfile from '@/pages/dashboard/UpdateProfile';

export default function Home() {
  const axiosAuth = useAxiosAuth();
  const fetchMe = async () => {
    const res = await axiosAuth.get('/api/v1/auth/me');
    console.log(res);
  };

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex gap-4">
        <UpdateProfile />

        <Button variant={'outline'} onClick={fetchMe}>
          Fetch Me
        </Button>
      </div>
    </section>
  );
}
