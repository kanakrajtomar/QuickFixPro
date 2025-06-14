"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import HeroCarousel from "../components/HeroCarousel";
import MobileNavbar from "../components/MobileNavbar";

// Define the Category type
interface Category {
  _id: string;
  categoryName: string;
  imageURL: string;
}
const faq = [
  {
    question: "What types of mobile phone and laptop repairs do you offer?",
    answer:
      "We offer a wide range of repairs including screen replacement, battery replacement, water damage repair, charging port repair, speaker and microphone repair, data recovery, software issues and more.",
  },
  {
    question: "How long does a typical repair take?",
    answer:
      "Repair times can vary depending on the type of repair needed. Minor repairs like screen replacements or battery replacements often take about 1-2 hours. More complex repairs, such as water damage, might take longer due to the need for diagnostics and drying time.",
  },
  {
    question: "Do you use OEM parts for repairs?",
    answer:
      "Yes, we prioritize the use of OEM or high-quality replacement parts sourced from trusted suppliers. This ensures optimal performance and longevity of your device after repair with our warranty (Terms and Conditions).",
  },
  {
    question: "What happens if my device is not repairable?",
    answer:
      "In some cases, if a device is deemed beyond repair due to extensive damage or technical issues, we will provide a detailed assessment and discuss options such as data recovery or recycling the device responsibly.",
  },
  {
    question: "Is there a warranty on repairs?",
    answer:
      "Yes, we offer a warranty on parts and labour for our repairs. Typically, this warranty covers defects related to the repair itself. Please inquire about specific warranty terms for your repair job.",
  },
  {
    question: "How much will my repair cost?",
    answer:
      "Repair costs vary on brands, models, type of device and issue based depending on the extent of the damage and the specific parts needed. We provide free diagnostics and a transparent quote before starting any repairs. This way, you'll know the exact cost upfront.",
  },
  {
    question:
      "Do I need to back-up my data before bringing in my device for repair?",
    answer:
      "It's always a good idea to back up your data before any repair service. While we take every precaution to protect your data with your permission, it's best to have a backup to avoid any potential loss during the repair process in the encrypted form that only customers can see.",
  },
  {
    question: "Can I track the status of my repair?",
    answer:
      "Yes, we provide updates on the status of your repair via phone, email, or our online tracking system (on our website and application). You'll know when your device is ready for pickup or if there are any delays.",
  },
  {
    question:
      "Do you offer repair services for all mobile phone brands and models?",
    answer:
      "We specialize in repairing a wide variety of mobile phone brands and models, including all types brands of mobiles, laptops, watches, tablets speakers and more. Contact us to confirm if we can repair your specific device.",
  },
  {
    question: "How do I get started with a repair?",
    answer:
      "We have both options online and offline. You can simply bring your device to our shop or book your repair via our application or website easily.",
  },
  {
    question: "Why should I choose your service?",
    answer:
      "We have highly qualified and experienced up to 10 years of experienced technicians dedicated for you. We provide transparent repair for our customers via online or offline repair service. Our price is less up to 50% than the market or service centres.",
  },
  {
    question: "Do you provide repair under warranty devices?",
    answer: "Sorry, we do not provide repair under any warranty policy device.",
  },
  {
    question: "Do you provide pick and drop and doorstep delivery?",
    answer:
      "Yes, we provide doorstep and pick and drop delivery under 10km radius of our repair centre.",
  },
  {
    question:
      "Do you repair at your own store or get repair done from any other third-party service provider?",
    answer:
      "Yes, we repair at our own store from our own trained and experienced technicians and service provider partners.",
  },
];
// JSON for Testimonials
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

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://ad-api.sampurnakart.in/api/repairs/listCategories"
      );
      setCategories(response.data);
    } catch (err) {
      setError("Failed to fetch categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="pt-5 pb-11 px-5 w-screen">
      <HeroCarousel />
      <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold font-poppins  text-center mb-8 text-gray-800 mt-10">
        Choose Repair Category
      </h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-8 gap-4 justify-items-center">
        {categories.map((category) => (
          <Link
            href={`repair/${category._id}`}
            key={category._id}
            className="group relative overflow-hidden max-h-[250px] bg-white border cursor-pointer hover:scale-105 select-none transition-all hover:shadow-2xl hover:shadow-[#D9D9D9] justify-center align-middle p-10 rounded-lg shadow-lg shadow-[#D9D9D9] border-gray-200"
          >
            <div className="relative z-10 max-w-md text-center">
              <div className="space-y-6 text-base leading-7 text-gray-600 transition-all duration-300">
                <Image
                  src={category.imageURL}
                  width={80}
                  height={80}
                  alt="category-img"
                  className="mx-auto"
                />
              </div>
              <div className="mt-2 text-base font-semibold leading-7">
                <p className="text-md">{category.categoryName}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Banner Section */}
      <div className="my-8 flex justify-center shadow-lg border border-blue-100 rounded-md">
        <div className="w-full max-w-screen-xl">
          <Image
            src="https://res.cloudinary.com/dzwyf9kn9/image/upload/v1718536293/Untitled_design_1_eqacqz.png"
            alt="Promotional Banner"
            width={1400}
            height={800}
            layout="responsive"
            className="rounded-md max-sm:h-[200%]"
          />
        </div>
      </div>
      {/* Testimonials Section */}
      <div className="mt-16 bg-black py-10 overflow-hidden rounded-md">
        <h2 className="text-3xl font-extrabold text-center mb-8 text-white">
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
      <div className="mt-16 px-8 py-10 bg-gray-100 rounded-md">
        <h2 className="text-3xl font-extrabold text-center mb-8 text-gray-800">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faq.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-md shadow-md">
              <button
                className="w-full text-left focus:outline-none"
                onClick={() => toggleAccordion(index)}
              >
                <h3 className="text-xl font-bold text-gray-800 mb-2 flex justify-between">
                  {item.question}
                  <span>{openIndex === index ? "-" : "+"}</span>
                </h3>
              </button>
              {openIndex === index && (
                <p className="text-md text-gray-600 mt-2">{item.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
      <MobileNavbar />
    </div>
  );
};

export default Categories;
