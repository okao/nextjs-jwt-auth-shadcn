'use client';
import Link from 'next/link';

import { siteConfig } from '@/config/site';
import { buttonVariants } from '@/components/ui/button';
import { Icons } from '@/components/custom/icons';
import { MainNav } from '@/components/custom/layout/main-nav';
import { ThemeToggle } from '@/components/custom/theme-toggle';
import { MobileSidebar } from '@/components/custom/layout/mobile-sidebar';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Boxes } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { useContext } from 'react';
import { UserContext } from '@app/dashboard/AuthProvider';

export function SiteHeaderNew() {
  const { meUser } = useContext(UserContext);
  const router = useRouter();
  const { toast } = useToast();
  async function signOutCall() {
    const data = await fetch('/api/authz/signout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const res = await data.json();

    if (res?.status === 201) {
      toast({
        title: 'Success',
        description: 'You have been signed out.',
        duration: 4000,
        variant: 'default',
      });

      router.push('/auth/login');
    }
  }

  return (
    <div className="fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur">
      <nav className="flex h-16 items-center justify-between px-4">
        <Link
          href={'/'}
          className="hidden items-center justify-between gap-2 md:flex"
        >
          <Boxes className="h-6 w-6" />
          <h1 className="text-lg font-semibold">T3 app template</h1>
        </Link>
        <div className={cn('block md:!hidden')}>
          <MobileSidebar />
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {/* {sessionData?.user ? (
            <UserNav user={sessionData.user} />
          ) : (

          )} */}
          <div className="flex items-center gap-2 px-2">
            <span className="hidden md:block">
              {meUser?.firstName} {meUser?.lastName}
            </span>
          </div>
          <Button
            variant="default"
            className="text-sm"
            onClick={() => {
              signOutCall();
            }}
          >
            Sign Out
          </Button>
        </div>
      </nav>
    </div>
  );
}
