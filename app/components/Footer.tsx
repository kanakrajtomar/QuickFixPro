import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import Link from "next/link";
import AppStoreIcon from "@/assets/images/app-store-badge.svg";
import PlayStoreIcon from "@/assets/images/google-play-badge.svg";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-black p-10 lg:mt-[3500px] mt-[4200px] w-full">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        <div className="space-y-4">
          <h5 className="text-xl font-bold">Exclusive</h5>

          <p>Save ₹ 500 with App New User Only</p>
          <p>Get 10% off your first order</p>
          <p>Reffer your friend and get reward 100 on every reffer</p>
        </div>
        <div className="space-y-4">
          <h5 className="text-xl font-bold">Support</h5>
          <address className="not-italic">
            548, Model Town Main Road, Model Town
            <br />
            Jalandhar, Punjab 144003
            <br />
            India.
          </address>
          <a className="text-blue-600" href="mailto:info@sampurnakart.in">
            info@sampurnakart.in
          </a>
          <p>
            <a href="tel:+91 9056651555">+919056651555</a>
          </p>
        </div>
        <div className="space-y-4">
          <h5 className="text-xl font-bold">Account</h5>
          <nav className="space-y-2">
            <Link className="block" href="/my-account/profile">
              My Account
            </Link>
            <Link className="block" href="../../signin">
              Login / Register
            </Link>
            <Link className="block" href="../pages/about">
              About
            </Link>
          </nav>
        </div>
        <div className="space-y-4">
          <h5 className="text-xl font-bold">Quick Link</h5>
          <nav className="space-y-2">
            <Link className="block" href="/pages/privacy-policy">
              Privacy Policy
            </Link>
            <Link className="block" href="/pages/terms">
              Terms Of Use
            </Link>
            <Link className="block" href="/repair">
              FAQ
            </Link>
            <Link className="block" href="/pages/shipping">
              Shipping Policy
            </Link>
            <Link className="block" href="/pages/refund">
              Refund Policy
            </Link>
            <Link className="block" href="/pages/contact">
              Contact
            </Link>
          </nav>
        </div>
        <div className="space-y-4">
          <h5 className="text-xl font-bold">Social Platforms</h5>

          <div className="flex space-x-2">
            {/* <Link className="flex item-center" href="#">
              <Image
                src={PlayStoreIcon}
                alt="Get it on Google Play"
                width={135}
                height={40}
              />
            </Link> */}
            {/* <Link className="flex item-center" href="#">
              <Image
                src={AppStoreIcon}
                alt="Download on the App Store"
                width={135}
                height={40}
              />
            </Link> */}
          </div>
          <div className="flex space-x-4 mt-4">
            <Link
              className="block"
              href="https://www.facebook.com/sampurnakartservice"
            >
              <i className="ri-facebook-line ri-xl"></i>
            </Link>
            <Link className="block" href="https://twitter.com/Sampurna_Kart">
              {/* <i className="ri-twitter-line ri-xl"></i> */}
              {/* <i className="ri-twitter-line ri-xl"></i> */}
              <i className="ri-twitter-x-line"></i>
            </Link>
            <Link
              className="block"
              href="https://www.instagram.com/sampurnakart_services/?igsh=ZzB4MWJnNm5td29m"
            >
              <i className="ri-instagram-line ri-xl"></i>
            </Link>
            <Link
              className="block"
              href="https://www.linkedin.com/in/sampurna-kart-0b6590271/"
            >
              <i className="ri-linkedin-line ri-xl"></i>
            </Link>
            <Link
              className="block"
              href="https://youtube.com/@sampurnakart?si=TRLACj7hWZAdWdSY"
            >
              <i className="ri-youtube-line ri-xl"></i>
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-4">
        <p className="text-center text-sm">
          © 2024 Sampurnakart.in All right reserved
        </p>
      </div>
    </footer>
  );
}
