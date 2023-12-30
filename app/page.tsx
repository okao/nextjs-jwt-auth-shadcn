import Link from 'next/link';

import { siteConfig } from '@/config/site';
import { buttonVariants } from '@/components/ui/button';

export default function Home() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10 border">
      Welcome
    </section>
  );
}
