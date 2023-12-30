import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { ThemeToggle } from '@/components/custom/theme-toggle';
import { Separator } from '@/components/ui/separator';
import NonAuthRoutesProviders from '@/providers/nonauth-routes.provider';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function AuthenticationLayout({
  children,
}: RootLayoutProps) {
  return (
    <NonAuthRoutesProviders>
      <div className="h-screen px-4 md:px-0">
        <div className="md:hidden hidden">
          <Image
            src="/examples/authentication-light.png"
            width={1280}
            height={843}
            alt="Authentication"
            className="block dark:hidden"
          />
          <Image
            src="/examples/authentication-dark.png"
            width={1280}
            height={843}
            alt="Authentication"
            className="hidden dark:block"
          />
        </div>
        <div className="relative h-full flex-col md:items-center justify-center md:justify-normal md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
          <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r dark:text-secondary">
            <div className="absolute inset-0 bg-zinc-900 dark:bg-zinc-400" />
            <div className="relative z-20 flex items-center text-lg font-medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-6 w-6"
              >
                <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
              </svg>
              Acme Inc
            </div>
            <div className="relative z-20 mt-auto">
              <blockquote className="space-y-2">
                <p className="text-lg">
                  &ldquo;This library has saved me countless hours of
                  work and helped me deliver stunning designs to my
                  clients faster than ever before.&rdquo;
                </p>
                <footer className="text-sm">Sofia Davis</footer>
              </blockquote>
            </div>
          </div>
          <div className="lg:p-8 h-full">
            <div className="flex flex-row-reverse h-16 items-center space-x-4 text-sm">
              <div className="px-8">
                <ThemeToggle />
              </div>
              <Separator orientation="vertical" />
              <div>
                <Link
                  href="/examples/authentication"
                  className={cn(
                    buttonVariants({ variant: 'ghost' }),
                    'md:right-8 md:top-8'
                  )}
                >
                  Login / Register
                </Link>
              </div>
            </div>
            <div className="flex justify-center h-full">
              {children}
            </div>
          </div>
        </div>
      </div>
    </NonAuthRoutesProviders>
  );
}
