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
import { signOut, useSession } from 'next-auth/react';

export function SiteHeader() {
  // async function signOutCall() {
  //   await fetch('/api/auth/signout', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });
  // }

  return (
    // <header className="bg-background sticky top-0 z-40 w-full border-b">
    //   <div className="mx-4 flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
    //     <MainNav items={siteConfig.mainNav} />
    //     <div className="flex flex-1 items-center justify-end space-x-4">
    //       <nav className="flex items-center space-x-1">
    //         <Link
    //           href={siteConfig.links.github}
    //           target="_blank"
    //           rel="noreferrer"
    //         >
    //           <div
    //             className={buttonVariants({
    //               size: 'icon',
    //               variant: 'ghost',
    //             })}
    //           >
    //             <Icons.gitHub className="h-5 w-5" />
    //             <span className="sr-only">GitHub</span>
    //           </div>
    //         </Link>
    //         <Link
    //           href={siteConfig.links.twitter}
    //           target="_blank"
    //           rel="noreferrer"
    //         >
    //           <div
    //             className={buttonVariants({
    //               size: 'icon',
    //               variant: 'ghost',
    //             })}
    //           >
    //             <Icons.twitter className="h-5 w-5 fill-current" />
    //             <span className="sr-only">Twitter</span>
    //           </div>
    //         </Link>
    //         <ThemeToggle />
    //       </nav>
    //     </div>
    //   </div>
    // </header>

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
          <Button
            variant="default"
            className="text-sm"
            onClick={() => {
              signOut();
            }}
          >
            Sign Out
          </Button>
        </div>
      </nav>
    </div>
  );
}
