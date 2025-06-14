import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import "@/styles/globalStyle.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HeroNavCategory from "./components/HeroNavCategory";
import { StoreProvider } from "@/store/StoreProvider";
import { Toaster } from "@/components/ui/toaster";
import { GoogleAnalytics } from "@next/third-parties/google";
import Head from "next/head";
import { FacebookPixelEvents } from "./components/metapixel";
import { Suspense } from 'react'



const poppins = Poppins({ weight: ["400", "500", "600"], subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "Expert Chip-Level iPhone, MacBook Repair & More at SampurnaKart.in | Jalandhar, Punjab, India",
  description:
    "SampurnaKart.in offers unparalleled chip-level repair services for iPhones, MacBooks, and all brands of mobiles, laptops, and electronic gadgets. Our skilled technicians ensure comprehensive repairs for seamless functionality. Located in Jalandhar, Punjab, serving clients across India.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta
          property="og:title"
          content="Expert Chip-Level iPhone, MacBook Repair & More at SampurnaKart.in | Jalandhar, Punjab, India"
        />
        <meta
          property="og:description"
          content="SampurnaKart.in offers unparalleled chip-level repair services for iPhones, MacBooks, and all brands of mobiles, laptops, and electronic gadgets. Our skilled technicians ensure comprehensive repairs for seamless functionality. Located in Jalandhar, Punjab, serving clients across India."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sampurnakart.in" />
        <meta
          property="og:image"
          content="https://sampurnakart.in/_next/static/media/logo.edf24fc7.svg"
        />
        <meta
          property="og:image:secure_url"
          content="https://sampurnakart.in/_next/static/media/logo.edf24fc7.svg"
        />
        <meta property="og:image:alt" content="SampurnaKart Logo" />
        <meta property="og:site_name" content="SampurnaKart" />
        <meta
          name="keywords"
          content="Laptop, repair, Jalandhar, Mobile, repair, Jalandhar, Max, Book, repair, Jalandhar, Laptop, service, Punjab, Mobile, service, Punjab, Laptop, technician, Jalandhar, Mobile, technician, Jalandhar, Max, Book, technician, Punjab, Laptop, screen, repair, Jalandhar, Mobile, screen, repair, Jalandhar, Max, Book, screen, repair, Punjab, Laptop, motherboard, repair, Jalandhar, Mobile, motherboard, repair, Jalandhar, Max, Book, motherboard, repair, Punjab, Laptop, battery, replacement, Jalandhar, Mobile, battery, replacement, Jalandhar, Max, Book, battery, replacement, Punjab, Laptop, charger, repair, Jalandhar, Mobile, charger, repair, Jalandhar, Max, Book, charger, repair, Punjab, Laptop, repair, shop, in, Jalandhar, Mobile, repair, shop, in, Jalandhar, Max, Book, repair, center, in, Jalandhar, Laptop, service, center, in, Jalandhar, Mobile, service, center, in, Jalandhar, Max, Book, service, center, in, Jalandhar, Laptop, screen, replacement, in, Jalandhar, Mobile, screen, replacement, in, Jalandhar, Max, Book, screen, replacement, in, Jalandhar, Laptop, motherboard, replacement, in, Jalandhar,mobile, repair, store, mobile, repair, mobile, repair, shop, mobile, repairing, store, mobile, repairing, shop, mobile, phone, spare, parts, spare, parts, mobile, mobile, spare, parts, mobile, parts, mobile, repairing, online, mobile, repair, online, mobile, spare, parts, online, mobile, parts, online, phone, parts, repairing, mobile, repair, mobile, mobile, fix, mobile, phone, parts, mobile, phone, spare, parts, online, shopping, mobile, repairing, parts, all, mobile, repair, mobile, parts, store, remove, all, numbers, and, separate, all, words, with, commas,iPhone repair, MacBook repair, chip-level repair, mobile repair, laptop repair, electronic gadget repair, Jalandhar, Punjab, India, expert repair services, top-notch repairs, professional technicians, reliable repair solutions, seamless functionality, trusted repair center"
        />

        <meta property="og:locale" content="en_US" />
      </Head>
      <body
        className={`${poppins.className} flex flex-col items-center min-w-screen overflow-x-hidden `}
      >
        <StoreProvider>
          <Navbar />
          <HeroNavCategory />
          <div className="max-w-screen w-full">{children}
            <Suspense fallback={null}>
              <FacebookPixelEvents />
            </Suspense>


          </div>
          <Toaster />
          <Footer /> 

        </StoreProvider>

      </body>
      <GoogleAnalytics gaId="G-HBELQV7E6J" />
    </html>
  );
}
