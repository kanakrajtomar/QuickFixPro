"use client";

import MobileNavbar from "../components/MobileNavbar";

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-5">
      <div className="flex flex-col gap-10 sm:flex-row items-center justify-center">
        {children}
      </div>
      <MobileNavbar />
    </main>
  );
}
