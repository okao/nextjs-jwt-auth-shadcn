import React from "react";
import { SiteHeader } from "@/components/custom/layout/site-header";
import { SiteHeaderNew } from "@/components/custom/layout/site-header-new";
import Sidebar from "@/components/custom/layout/sidebar";
import AuthRoutesProvider from "./AuthProvider";

interface RootLayoutProps {
  children: React.ReactNode;
}

const DLayout = ({ children }: RootLayoutProps) => {
  return (
    <AuthRoutesProvider>
      <SiteHeaderNew />
      <div className="flex h-screen border-collapse overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto overflow-x-hidden pt-16 bg-secondary/10 pb-1">
          {children}
        </main>
      </div>
    </AuthRoutesProvider>
  );
};

export default DLayout;
