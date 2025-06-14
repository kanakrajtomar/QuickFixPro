"use client";
import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Issue } from "../../types";
import { useRepair } from "../../RepairContext";
import { Trash2, Coins } from "lucide-react";


const IssuePage = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [cart, setCart] = useState<Issue[]>([]);
  const [selectedItems, setSelectedItems] = useState<{ [key: string]: boolean }>({});
  const [isAgreed, setIsAgreed] = useState<boolean>(false);
  const [finalBillingData, setFinalBillingData] = useState<any>(null);
  const [useRewardPoints, setUseRewardPoints] = useState<boolean>(false); // State for using reward points
  const [promoCode, setPromoCode] = useState<string>(""); // State for promo code
  const [promoError, setPromoError] = useState<string>(""); // State for promo code errors
  const [promoType, setPromoType] = useState<"fixed" | "percentage" | null>(null); // Type of promo
  const [promoValue, setPromoValue] = useState<number>(0); // Value of promo (amount or percentage)
  const [rewardPoints, setRewardPoints] = useState<number>(0); // State for reward points


  const router = useRouter();
  const pathName = usePathname();
  const { updateUserDetails } = useRepair();

  // Fetch issues based on the current path
  const fetchModels = async (): Promise<void> => {
    try {
      const response = await axios.get(
        `https://ad-api.sampurnakart.in/api/repairs/listIssues?id=${pathName.replace(
          "/repair/issues/",
          ""
        )}`
      );
      setIssues(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchRewardPoints = async () => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];
      const response = await axios.get("https://app-api.sampurnakart.in/wallet/balance", {
        headers: {
          "x-auth-token": token || '', // Replace this with the actual token
        },
      });
      setRewardPoints(response.data.balance);
    } catch (error) {
      console.error("Error fetching reward points:", error);
    }
  };

  // Validate the promo code
  const validatePromoCode = async () => {
    if (!promoCode.trim()) {
      setPromoError("Please enter a promo code.");
      setPromoType(null);
      setPromoValue(0);
      return;
    }
    try {
      const response = await axios.get(`https://ad-api.sampurnakart.in/api/promo/check/${promoCode}?section=all`);
      const { info, value } = response.data;

      if (info === "code_valid") {
        setPromoError(""); // Clear any previous errors
        setPromoType(value.type); // 'fixed' or 'percentage'
        setPromoValue(value.amount); // Discount amount or percentage
      }
    } catch (error: any) {
      const errMessage = error.response?.data?.err || "Error checking promo code";
      setPromoError(errMessage);
      setPromoType(null);
      setPromoValue(0);
    }
  };

  // Remove the applied promo code
  const removePromoCode = () => {
    setPromoCode("");
    setPromoType(null);
    setPromoValue(0);
    setPromoError("");
  };

  // Calculate the total cost of items in the cart
  const total = useMemo(() => {
    return cart.reduce((acc, item) => acc + (parseFloat(item.issueCost) || 0), 0);
  }, [cart]);

  // Calculate the discount based on the promo code
  const discount = useMemo(() => {
    if (!promoType || promoValue <= 0) return 0;
    if (promoType === "fixed") {
      return promoValue > total ? total : promoValue;
    } else if (promoType === "percentage") {
      return (total * promoValue) / 100;
    }
    return 0;
  }, [promoType, promoValue, total]);

  const rewardPointsValue = useMemo(() => {
    // Calculate 10% of the total price
    const maxDeduction = Math.floor((total * 10) / 100); // 10% of total price
    
    // Deduct up to 10% of the total price, but no more than the available reward points
    return Math.min(maxDeduction, rewardPoints);
  }, [total, rewardPoints]);
  
  

  // Calculate the final total after applying the discount
  const finalTotal = useMemo(() => {
    const deductedRewardPoints = Math.min(rewardPointsValue, rewardPoints); // Cap reward points deduction at available points
    return total - discount - deductedRewardPoints; // Deduct discount and reward points value from the total
  }, [total, discount, rewardPointsValue, rewardPoints]);
  
  // Toggle items in the cart
  const toggleCart = (issue: Issue) => {
    if (selectedItems[issue.issueName]) {
      setCart((prevCart) =>
        prevCart.filter((item) => item.issueName !== issue.issueName)
      );
      setSelectedItems((prevSelected) => ({
        ...prevSelected,
        [issue.issueName]: false,
      }));
    } else {
      setCart((prevCart) => [...prevCart, issue]);
      setSelectedItems((prevSelected) => ({
        ...prevSelected,
        [issue.issueName]: true,
      }));
    }
  };

  // Delete an item from the cart
  const deleteFromCart = (issue: Issue) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== issue._id));
    setSelectedItems((prevSelected) => ({
      ...prevSelected,
      [issue.issueName]: false,
    }));
  };

  // Fetch final billing data before checkout
  const fetchFinalBillingData = async () => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];
      const response = await axios.post(
        "https://app-api.sampurnakart.in/repairs/bookRepair/info",
        {
          repairNames: cart.map((item) => item._id),
          useRewardPoint: useRewardPoints,
          usePromocode: promoType ? true : false, // Use promo code only if it's applied
          promocode: promoType ? promoCode : null,
        },
        {
          headers: {
            "x-auth-token": token || "",
          },
        }
      );
      setFinalBillingData(response.data); // Set the final billing data
    } catch (error) {
      console.error("Error fetching final billing data:", error);
    }
  };

  // Handle the checkout process
  const handleCheckout = () => {
    if (cart.length === 0) {
      console.log("No issues selected");
      return;
    }
    if (!isAgreed) {
      console.log("Please agree to the terms and conditions");
      return;
    }

    fetchFinalBillingData(); // Fetch the final billing data before checkout
    updateUserDetails({
      repairNames: cart.map((item) => item._id),
      totalCost: finalTotal,
      useRewardPoint: useRewardPoints, // Update useRewardPoint
      usePromocode: promoType ? true : false, // Update usePromocode
      promocode: promoType ? promoCode : null, // Update promocode
    });
    router.push("/repair/repairMode");
  };


  // Fetch issues on component mount
  useEffect(() => {
    fetchModels();
  }, []);

  // Effect to reset promo code if cart is empty
  useEffect(() => {
    if (cart.length === 0) {
      removePromoCode();
    }
  }, [cart]);
  useEffect(() => {
    fetchRewardPoints(); // Fetch reward points on component mount
  }, []);


  return (
    <div className="p-5 mt-28">
      <h1 className="text-3xl font-bold mb-5">Choose Issues</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Issues List */}
        <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {issues.map((issue) => (
            <div
              key={issue._id}
              className="flex flex-col overflow-hidden rounded-lg border border-gray-500 bg-white shadow-md transition-transform transform hover:scale-105"
            >
              <div className="flex items-center justify-center p-4">
                <Image
                  src={issue.imageURL}
                  alt={issue.issueName}
                  height={150}
                  width={150}
                  className="object-contain"
                />
              </div>
              <div className="px-4 pb-4">
                <h5 className="text-md text-gray-900">{issue.issueName}</h5>
                <div className="mt-2 mb-4 flex items-center justify-between">
                  <p className="text-md text-gray-900">₹{issue.issueCost}</p>
                </div>
                <button
                  className={`w-full py-2.5 rounded-md text-white text-2xl ${selectedItems[issue.issueName] ? "bg-orange-400" : "bg-[#27187E]"
                    } hover:bg-yellow-500 focus:outline-none`}
                  onClick={() => toggleCart(issue)}
                >
                  {selectedItems[issue.issueName] ? "-" : "+"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Cart */}
        <div className="fixed bottom-0 -mx-5 md:top-28 md:max-h-screen md:overflow-y-auto right-5 rounded-md mt-24 w-full md:w-1/3 max-h-1/2 overflow-y-auto">
          <div className="bg-white rounded-md shadow-md border p-5">
            <h1 className="text-xl font-semibold text-gray-900">Your Cart</h1>
            <div className="mt-4 max-h-48 overflow-y-auto">
              {cart.length === 0 ? (
                <p className="text-gray-900 font-bold text-md text-center">Select an issue</p>
              ) : (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Issue Name
                      </th>
                      <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Cost
                      </th>
                      <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Remove
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {cart.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-2 whitespace-nowrap text-sm font-semibold text-gray-900">
                          {item.issueName}
                        </td>
                        <td className="px-6 py-2 whitespace-nowrap text-sm font-semibold text-gray-900">
                          ₹{item.issueCost}
                        </td>
                        <td className="px-6 py-2 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => deleteFromCart(item)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Pricing Summary */}
            <div className="mt-4">
              <div className="flex justify-between">
                <p className="text-sm font-medium text-gray-900">Subtotal:</p>
                <p className="text-lg font-semibold text-gray-900">₹{total.toFixed(2)}</p>
              </div>

              {/* Promo Code Input */}
              <div className="mt-4">
                <label
                  htmlFor="promoCode"
                  className="block text-sm font-medium text-gray-700"
                >
                  Promo Code
                </label>
                <div className="flex space-x-2 mt-1">
                  <input
                    type="text"
                    id="promoCode"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter promo code"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <button
                    onClick={validatePromoCode}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none"
                  >
                    Apply
                  </button>
                </div>
                {promoError && <p className="text-red-500 mt-2">{promoError}</p>}
                {promoType && promoValue > 0 && (
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-green-500">
                      Promo Applied:{" "}
                      {promoType === "fixed"
                        ? `₹${promoValue} off`
                        : `${promoValue}% off`}
                      
                    </p>
                    <button
                      onClick={removePromoCode}
                      className="text-sm text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                )}
                {useRewardPoints && rewardPointsValue > 0 && (
  <div className="flex justify-between mt-2">
    <p className="text-sm font-medium text-gray-900">Reward Points Deducted:</p>
    <p className="text-lg font-semibold text-gray-900">
      -₹{rewardPointsValue.toFixed(2)}
    </p>
  </div>
)}
                
              </div>

              {/* Discount and Final Total */}
              {promoType && promoValue > 0 && (
                <>
                  <div className="flex justify-between mt-4">
                    <p className="text-sm font-medium text-gray-900">Discount:</p>
                    <p className="text-lg font-semibold text-gray-900">
                      -₹{discount.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex justify-between mt-2">
                    <p className="text-sm font-medium text-gray-900">Total:</p>
                    <p className="text-xl font-bold text-gray-900">
                      ₹{finalTotal.toFixed(2)}
                    </p>
                  </div>
                </>
              )}
              
            </div>

            {/* Reward Points Toggle */}
            <div className="mt-4 flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4">
  {/* Checkbox for using reward points */}
  <div className="flex items-center">
    <input
      type="checkbox"
      id="useRewardPoints"
      checked={useRewardPoints}
      onChange={(e) => setUseRewardPoints(e.target.checked)}
      className="mr-2 w-5 h-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
    />
    <label
      htmlFor="useRewardPoints"
      className="text-sm font-medium text-gray-900"
    >
      Use Reward Points
    </label>
  </div>

  {/* Available reward points with coin icon */}
  <div className="flex items-center bg-gray-100 p-2 rounded-md shadow-sm">
    <Coins className="w-5 h-5 mr-1 text-yellow-500" />
    <span className="text-sm font-bold text-gray-700">
      (Available: <strong>{rewardPoints}</strong> points)
    </span>
  </div>
</div>


            {/* Terms and Conditions */}
            <div className="mt-6">
              <label
                htmlFor="agreement"
                className="block text-sm font-medium text-gray-700"
              >
                <input
                  type="checkbox"
                  id="agreement"
                  checked={isAgreed}
                  onChange={() => setIsAgreed(!isAgreed)}
                  className="mr-2 w-5 h-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                I agree to the terms and conditions
              </label>
            </div>

            {/* Checkout Button */}
            <div className="mt-6">
              <button
                onClick={handleCheckout}
                disabled={cart.length === 0 || !isAgreed}
                className={`w-full py-2.5 rounded-md text-white text-2xl ${cart.length === 0 || !isAgreed
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#27187E] hover:bg-yellow-500"
                  } focus:outline-none`}
              >
                Checkout
              </button>
            </div>

            {/* Final Billing Data */}
            {finalBillingData && (
              <div className="mt-6">
                <h2 className="text-md font-bold text-gray-900">Final Billing Summary:</h2>
                <pre className="bg-gray-100 p-2 rounded-md">
                  {JSON.stringify(finalBillingData, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssuePage;