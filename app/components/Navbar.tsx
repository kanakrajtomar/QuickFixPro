"use client";
import { useState, useEffect, useRef } from "react";
import SampurnaLogo from "@/assets/images/logo.svg";
import { RootState } from "@/store/store";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";
import { Search } from "lucide-react";
import Typesense from "typesense";

// Set up TypeSense client
const typesenseClient = new Typesense.Client({
  nodes: [
    {
      host: 'ts-prod.sampurnakart.in',
      port: 443,
      protocol: 'https',
    },
  ],
  apiKey: 'ezGcbiJSGWo0dTXTiJ8LeLfHDffmlOMx', // Use your actual API key
  connectionTimeoutSeconds: 2,
});

export default function Home() {
  const token = useSelector((state: RootState) => state.auth.token);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [pinCode, setPinCode] = useState("");
  const [city, setCity] = useState(Cookies.get("city") || "Jalandhar");
  const [loading, setLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // Refs for dropdown handling
  const pinCodeDropdownRef = useRef<HTMLDivElement>(null);

  // Search handler function
  const handleSearch = async (query: string) => {
    if (!query) return;

    try {
      const searchResults = await typesenseClient.collections('products').documents().search({
        q: query,
        query_by: 'name',
        filter_by: 'isVisible: true',
      });

      const hits = searchResults.hits || [];
      const limitedHits = hits.slice(0, 5);

      setSearchResults(limitedHits.map((hit: any) => ({
        id: hit.document.id,
        name: hit.document.name,
        image: hit.document.imageArr[0], // Assuming you want the first image
      })));
      setIsDropdownOpen(true);
    } catch (error) {
      console.error('Error performing search:', error);
    }
  };

  const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    handleSearch(e.target.value);
  };

  useEffect(() => {
    if (searchQuery === '') {
      setSearchResults([]);
      setIsDropdownOpen(false);
    }
  }, [searchQuery]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handlePinCodeSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.postalpincode.in/pincode/${pinCode}`
      );
      if (response.data[0].Status === "Success") {
        const fetchedCity = response.data[0].PostOffice[0].District;
        setCity(fetchedCity);
        Cookies.set("city", fetchedCity);
      } else {
        console.error("Invalid pin code or no data available.");
      }
    } catch (error) {
      console.error("Error fetching city data:", error);
    } finally {
      setLoading(false);
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    // Close dropdowns when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pinCodeDropdownRef.current &&
        !pinCodeDropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-red-600 p-4 py-2 w-full bg-white shadow-md flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-x-5">
          {/* Logo */}
          <Link href="/">
            <Image
              src={SampurnaLogo}
              alt="Sampurna Logo"
              width={100}
              height={100}
              className="h-[100px] w-[100px]" // Fixed size for all screens
            />
          </Link>

          {/* City Selector (Desktop Only) */}
          <div
            className="relative flex items-center gap-x-2 hidden md:flex"
            ref={pinCodeDropdownRef}
          >
            <i className="ri-map-pin-fill leading-none ri-lg"></i>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-x-1 text-lg font-bold"
            >
              <p className="bg-[#27187E] text-white px-2 rounded-full">
                {city}
              </p>
              <i
                className={`ri-arrow-${
                  isDropdownOpen ? "up" : "down"
                }-s-line ri-sm`}
              ></i>
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 bg-white border border-gray-300 shadow-lg rounded-lg p-4 mt-2 w-48">
                <input
                  type="text"
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                  placeholder="Enter pin code"
                />
                <button
                  onClick={handlePinCodeSubmit}
                  className="w-full bg-[#27187E] text-white p-2 rounded"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Submit"}
                </button>
                <button
                  onClick={() => setIsDropdownOpen(false)}
                  className="w-full mt-2 text-gray-600"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-x-5">
          <Link href="/repair" className="lg:hidden md:hidden">
            <button className="p-2 text-sm text-[#F1F2F6] bg-[#27187E] rounded-sm font-bold">
              Book Repair
            </button>
          </Link>

          {/* Menu Icon for Mobile */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-base p-2 rounded-full">
              <i
                className={`ri-${isMenuOpen ? "close" : "menu"}-line ri-lg`}
              ></i>
            </button>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-x-5">
          <div className="relative flex items-center w-full bg-[#F3F3F3] rounded-full p-4 mx-2">
            <Search className="text-gray-500 mr-3" />
            <input
              placeholder="Search"
              className="flex-1 bg-transparent focus:outline-none"
              value={searchQuery}
              onChange={handleSearchQueryChange}
            />
            {isDropdownOpen && searchResults.length > 0 && (
              <div className="absolute top-full left-0 w-full bg-white border border-gray-300 shadow-lg rounded-lg mt-2 z-20">
                {searchResults.map((result) => (
                  <Link
                    key={result.id}
                    href={`/products/${result.id}`}
                    className="flex items-center p-4 border-b border-gray-200 hover:bg-gray-100"
                    onClick={() => setSearchQuery('')}
                  >
                    <Image
                      src={result.image}
                      alt={result.name}
                      width={50}
                      height={50}
                      className="object-cover rounded-full"
                    />
                    <p className="ml-2 text-gray-700">{result.name}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/repair">
            <button className="text-base w-[150px] text-white bg-[#27187E] p-2 rounded-sm font-bold">
              Book Repair
            </button>
          </Link>
          <Link href="/training">
            <button className="text-base">Training</button>
          </Link>
          <Link href={token == null ? "/signin" : "/my-account/profile"}>
            <i
              className={`p-2 ri-lg leading-none ri-user-line rounded-full ${
                token == null ? "bg-[#758BFD]" : ""
              }`}
            ></i>
          </Link>
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 left-0 w-full h-full bg-white shadow-lg z-10 transition-transform duration-300 ease-in-out transform ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-4">
            {/* Close Button */}
            <button
              onClick={toggleMenu}
              className="text-base p-2 rounded-full absolute top-4 right-4"
            >
              <i className="ri-close-line ri-lg"></i>
            </button>
            {/* Menu Items */}
            <div className="mt-16 flex flex-col gap-y-4">
              <Link href="/repair" onClick={toggleMenu}>
                <button className="text-lg text-[#27187E]">Book Repair</button>
              </Link>
              <Link href="/training" onClick={toggleMenu}>
                <button className="text-lg">Training</button>
              </Link>
              <Link href={token == null ? "/signin" : "/my-account/profile"}>
                <button className="text-lg">My Account</button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
