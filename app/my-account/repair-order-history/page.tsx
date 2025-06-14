"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { getCookie } from "@/lib/utils";
import {
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiOutlineLoading3Quarters,
  AiOutlineCheckCircle,
} from "react-icons/ai";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { OrderProduct } from "@/app/repair/types";
import { Label } from "@/components/ui/label";

const RepairOrderHistoryPage = () => {
  const [orders, setOrders] = useState<OrderProduct[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const router = useRouter();
  const token = getCookie("token");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "https://app-api.sampurnakart.in/repairs/viewMyOrders",
          {
            headers: {
              "x-auth-token": token,
            },
          }
        );
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Failed to fetch orders. Please try again later.");
      }
    };

    if (token) {
      fetchOrders();
    } else {
      router.push("/signin");
    }
  }, [token, router]);

  const handleTriggerClick = (itemId: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "complete":
        return "bg-green-500";
      case "in-process":
        return "bg-yellow-500";
      case "canceled":
        return "bg-red-500";
      case "delivered":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "complete":
        return <AiFillCheckCircle className="text-white animate-bounce" />;
      case "in-process":
        return (
          <AiOutlineLoading3Quarters className="text-white animate-spin" />
        );
      case "canceled":
        return <AiFillCloseCircle className="text-white animate-pulse" />;
      case "delivered":
        return <AiOutlineCheckCircle className="text-white animate-bounce" />;
      default:
        return null;
    }
  };

  // Reverse the orders array
  const reversedOrders = [...orders].reverse();

  return (
    <div className="w-full max-w-screen-xl mx-auto p-4">
      {error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        <div className="w-full overflow-x-auto">
          {reversedOrders.map((order) => (
            <Accordion
              type="single"
              key={order._id}
              value={expandedItems.includes(`item-${order._id}`) ? `item-${order._id}` : undefined}
              onValueChange={(value) => handleTriggerClick(`item-${order._id}`)}
              className="my-4 border border-gray-300 rounded-lg shadow-lg"
            >
              <AccordionItem value={`item-${order._id}`}>
                <AccordionTrigger className="p-4 bg-gray-50 hover:bg-gray-100 flex justify-between items-center transition-all duration-300">
                  <div className="w-full flex justify-between items-center">
                    <span className="font-semibold">Order ID: {order.orderId}</span>
                    <Label
                      className={`flex items-center justify-center font-bold text-white px-3 py-1 rounded-full ${getStatusClass(
                        order.orderStatus
                      )}`}
                    >
                      {getStatusIcon(order.orderStatus)}
                      <span className="ml-2">{order.orderStatus}</span>
                    </Label>
                    <div className="text-sm text-gray-500 ml-4">
                      {order.latestUpdateTime}
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-4 bg-white border-t border-gray-200">
                  <Table className="w-full table-auto">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Issue Name</TableHead>
                        <TableHead>Issue Cost</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {order.repairNames.map((repair, index) => (
                        <TableRow key={`${order._id}-${index}`}>
                          <TableCell>{repair.issueName}</TableCell>
                          <TableCell>₹{repair.issueCost.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell colSpan={2} className="text-right font-semibold text-lg mt-4">
                          Total Cost: ₹{order.totalCost}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      )}
    </div>
  );
};

export default RepairOrderHistoryPage;
