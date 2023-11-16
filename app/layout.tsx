import "./globals.css";

import { useState } from "react";

import { SessionProvider } from "@/components/SessionProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Login from "@/components/Login";

import Menu from "@/components/Menu";
import Sidebar from "@/components/Sidebar";

export const metadata = {
  title: "FarmGPT",
  description: "一同邁向淨零未來",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  console.log(session);
  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          {!session ? (
            <Login />
          ) : (
            <div className="flex">
              <div className="md:hidden">
                <Menu />
              </div>

              <div className="w-[16rem] md:static absolute z-10 md:translate-x-0 -translate-x-full transition-transform ease-in  ">
                <Sidebar />
              </div>

              <div className="bg-[#343541] flex-1 shrink">{children}</div>
            </div>
          )}
        </SessionProvider>
      </body>
    </html>
  );
}
