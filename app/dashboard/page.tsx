"use client";
import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import UpdateProfile from "@/pages/dashboard/UpdateProfile";

const Dashboard = () => {
  const fetchMe = async () => {};

  return (
    <section className="px-4 grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex gap-4">
        <UpdateProfile />

        <Button variant={"outline"} onClick={fetchMe}>
          Fetch Me
        </Button>
      </div>
    </section>
  );
};

export default Dashboard;
