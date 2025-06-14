import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Correctly import from next/navigation
import { Home, Search, User, Layers3 } from "lucide-react";
import { RiSmartphoneFill } from "react-icons/ri";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/repair", label: "Category", icon: Layers3 },
  {
    href: "/repair/65c3196b0f4ad1db82b00eca",
    label: "Repair",
    icon: RiSmartphoneFill,
  },
  {
    href: "/my-account/rewards",
    label: "Reward",
    icon: () => <i className="ri-money-rupee-circle-fill"></i>,
  },
  { href: "/my-account/profile", label: "Profile", icon: User },
];

const MobileNavbar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();
  useEffect(() => {
    const pathname = window.location.pathname; // Get the current pathname directly from the browser

    // Find the matching index from the navItems array
    const currentIndex = navItems.findIndex((item) => item.href === pathname);
    if (currentIndex !== -1) {
      setActiveIndex(currentIndex);
    }
  }, []); // Only run this effect once on mount

  // Function to handle item click
  const handleItemClick = (index: number, href: string): void => {
    setActiveIndex(index); // Set the clicked item as active
    localStorage.setItem("activeNavIndex", index.toString()); // Save the active index in localStorage (convert number to string)

    router.push(href); // Navigate to the clicked item's href using router.push
  };

  return (
    <nav
      className="fixed bottom-0  left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg md:hidden"
      aria-label="Mobile navigation"
    >
      <div className="flex justify-around p-3">
        {navItems.map((item, index) => (
          <button
            key={index}
            onClick={() => handleItemClick(index, item.href)} // Update active item and navigate on click
            className={`flex flex-col items-center ${
              activeIndex === index
                ? "text-blue-600 font-bold"
                : "text-gray-700 hover:text-blue-500"
            } transition-transform duration-300 transform hover:scale-110 p-2 relative`}
            aria-label={item.label}
          >
            <item.icon size={24} />
            <span className="text-xs mt-1">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default MobileNavbar;
