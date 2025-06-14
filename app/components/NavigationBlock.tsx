import React from 'react'
import { motion } from "framer-motion";
import banglore from "@/assets/images/bangalore.png";
import indiaGate from "@/assets/images/india-gate.png";
import patna from "@/assets/images/patna.png";
import kolkata from "@/assets/images/Kolakata.png";
import mumbai from "@/assets/images/mumbai.png";
import amritsar from "@/assets/images/golden-temple.png";
import DeliveryIcon from "@/assets/icons/delivery.svg";
import ProtectionIcon from "@/assets/icons/protection.svg";
import SupportIcon from "@/assets/icons/support.svg";
import Image from 'next/image';

interface IFeatures {
    title: string;
    subtitle: string;
    icon: string;
}


const NavigationBlock = () => {
    const features: IFeatures[] = [
        {
            title: "FREE AND FAST DELIVERY",
            subtitle: "Free delivery for all orders over Rs 9,999",
            icon: DeliveryIcon,
        },
        {
            title: "24/7 CUSTOMER SERVICE",
            subtitle: "Friendly 24/7 customer support",
            icon: SupportIcon,
        },
        {
            title: "MONEY BACK GUARANTEE",
            subtitle: "We return money within 15 days",
            icon: ProtectionIcon,
        },
    ];
    const testimonials = [
        {
            id: 1,
            message:
                "Sampurnakart technicians are incredibly knowledgeable. They fixed my MacBook's logic board issue",
            name: "Karanvir Singh",
            location: "Jalandhar, India",
            image: "/path-to-user1-image.jpg",
        },
        {
            id: 2,
            message:
                "I sent in my iPhone for screen repair, and it was returned within 48 hours. Fast and reliable service.",
            name: "Dr. Narendar pal",
            location: "Phagwara, India",
            image: "/path-to-user2-image.jpg",
        },
        {
            id: 3,
            message:
                "The customer support team was very responsive and kept me updated throughout the repair process. Highly recommended.",
            name: "Tony Sandhu",
            location: "Amritsar, India",
            image: "/path-to-user3-image.jpg",
        },
        {
            id: 4,
            message:
                "Though initially skeptical due to hidden owner details, the service proved to be top-notch and trustworthy",
            name: "Rajvir Choudhary",
            location: "Hoshiarpur, India",
            image: "/path-to-user3-image.jpg",
        },
        {
            id: 5,
            message:
                "The repair costs were very reasonable compared to other service centers. Great value for money.",
            name: "Rajbir Singh",
            location: "Ludhiana, India",
            image: "/path-to-user3-image.jpg",
        },
    ];

    return (
        <>
            <div className="grid -mt-10 lg:mt-10  grid-cols-1 gap-8 lg:flex  lg:gap-[88px] items-center justify-center w-full">
                {features?.map((item, index) => (
                    <div
                        key={index}
                        className="flex flex-col gap-[2rem] items-center justify-center"
                    >
                        <div className="h-[5rem] w-[5rem] items-center justify-center flex bg-gray-400 rounded-full">
                            <div className="bg-black h-[58px] w-[58px] flex  items-center justify-center rounded-full">
                                <Image src={item.icon} height={40} width={40} alt="Logo" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 items-center">
                            <span className="uppercase font-bold font-poppins md:text-[20px]">
                                {item.title}
                            </span>
                            <span className="text-[14px] md:text-4 font-poppins">
                                {item.subtitle}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="w-full my-16 rounded-xl bg-[#0F5FA6] p-10 max-sm:p-2 text-white">
                <div className="mt-16 bg-[#0F5FA6] overflow-hidden rounded-md">
                    <h2 className="text-3xl max-sm:text-xl font-extrabold text-center mb-8 text-white">
                        Trusted by 50000+ Customers <br /> Since 2005 in Mobile Industry
                    </h2>
                    <div className="flex justify-around items-center text-white mb-8">
                        <div className="text-center">
                            <p className="text-2xl font-bold">150K+</p>
                            <p>Total Device Repaired</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold">25K+</p>
                            <p>Satisfied Customers</p>
                        </div>
                    </div>
                    <motion.div
                        className="flex space-x-4 py-4"
                        initial={{ x: 0 }}
                        animate={{ x: "-50%" }}
                        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                    >
                        {[...testimonials, ...testimonials].map((testimonial, index) => (
                            <div
                                key={index}
                                className="bg-white text-black p-5 rounded-lg mx-2 min-w-[300px]"
                            >
                                <p className="text-lg">{testimonial.message}</p>
                                <div className="flex items-center mt-4">
                                    <div className="ml-4">
                                        <p className="font-bold">{testimonial.name}</p>
                                        <p>{testimonial.location}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
            <div className="flex w-full my-5 justify-center align-middle flex-col gap-5">
                <p className="font-poppins text-black font-medium self-center">
                    24/7 CUSTOMER SERVICE
                </p>
                <p className="text-gray-600 self-center">
                    Friendly 24/7 customer support
                </p>
                <p className="text-8xl max-sm:text-4xl font-inter font-bold self-center text-[#F28627]">
                    50000+
                </p>
                <p className="text-5xl max-md:text-3xl self-center font-inter font-semibold">
                    Happy Customers
                </p>
                <p className="text-6xl max-md:text-4xl max-sm:text-base self-center font-inter font-semibold">
                    We are also available in these cities
                </p>
                <div className="w-full grid grid-cols-3 max-sm:grid-cols-2 gap-x-48 max-md:gap-x-10 max-sm:gap-x-5 gap-y-10 my-10 px-60 max-md:px-10 max-sm:px-2">
                    <div className="bg-[#D9D9D9] h-52 rounded-2xl p-8 max-sm:p-3 relative flex justify-center flex-col gap-5 align-middle">
                        <Image alt="indiaGate" src={indiaGate} className="self-center" />
                        <p className="self-center text-xl font-inter">Delhi NCR</p>
                    </div>
                    <div className="bg-[#D9D9D9] h-52 rounded-2xl p-8 max-sm:p-3 relative flex justify-center flex-col gap-5 align-middle">
                        <Image alt="banglore" src={banglore} className="self-center" />
                        <p className="self-center text-xl font-inter">Bangalore</p>
                    </div>
                    <div className="bg-[#D9D9D9] h-52 rounded-2xl p-8 max-sm:p-3 relative flex justify-center flex-col gap-5 align-middle">
                        <Image alt="patna" src={patna} className="self-center" />
                        <p className="self-center text-xl font-inter">Patna</p>
                    </div>
                    <div className="bg-[#D9D9D9] h-52 rounded-2xl pt-8 relative flex justify-center flex-col gap-5 align-middle">
                        <Image alt="kolkata" src={kolkata} className="self-center" />
                        <p className="self-center text-xl font-inter p-5 pt-0">Kolkata</p>
                    </div>
                    <div className="bg-[#D9D9D9] h-52 rounded-2xl p-8 max-sm:p-3 relative flex justify-center flex-col gap-5 align-middle">
                        <Image alt="mumbai" src={mumbai} className="self-center" />
                        <p className="self-center text-xl font-inter">Mumbai</p>
                    </div>
                    <div className="bg-[#D9D9D9] h-52 rounded-2xl p-8 max-sm:p-3 relative flex justify-center flex-col gap-5 align-middle">
                        <Image alt="amritsar" src={amritsar} className="self-center" />
                        <p className="self-center text-xl font-inter">Amritsar</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NavigationBlock
