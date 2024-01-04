'use client';
import Link from 'next/link';

import { siteConfig } from '@/config/site';
import { Button, buttonVariants } from '@/components/ui/button';
import { useAxiosAuth } from '@/hooks/useAxiosAuth';
import { useEffect } from 'react';
import UpdateProfile from '@/pages/dashboard/UpdateProfile';
import { authApi } from '@/lib/authApi';

export default function Home() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex gap-4">
        <UpdateProfile />
      </div>
    </section>
  );
}
