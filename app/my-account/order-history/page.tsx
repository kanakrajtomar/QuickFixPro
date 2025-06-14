"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AiFillCheckCircle, AiFillCloseCircle, AiOutlineLoading3Quarters, AiOutlineCheckCircle } from "react-icons/ai";
import { Label } from "@/components/ui/label";

// Define types for order status
type OrderStatus = "NEW-ORDER" | "PENDING-PAYMENT-ONLINE" | "SHIPPED" | "DELIVERED" | "CANCELLED";

interface Item {
  productId: string;
  productTitle: string;
  quantity: number;
  variant: {
    price: number;
    finalPrice: number;
    gstPercent: number;
  };
}

interface Bill {
  grandTotal: number;
  sellingPrice: {
    value: number;
  };
}

export interface OrderProduct {
  _id: string;
  userId: string;
  orderId: string;
  address: {
    buildingNo: string;
    streetName: string;
    city: string;
    area: string;
    state: string;
    pinCode: string;
    phone: string;
    name: string;
  };
  date: string;
  items: Item[];
  bill: Bill[];
  orderStatus: OrderStatus;
  paymentStatus: string;
}

// Define styles for each order status
const statusStyles: Record<OrderStatus, string> = {
  "NEW-ORDER": "bg-blue-500 text-white",
  "PENDING-PAYMENT-ONLINE": "bg-yellow-500 text-white",
  "SHIPPED": "bg-green-500 text-white",
  "DELIVERED": "bg-gray-500 text-white",
  "CANCELLED": "bg-red-500 text-white",
};

// Define stages for shipment tracking
const statusStages: OrderStatus[] = ["NEW-ORDER", "PENDING-PAYMENT-ONLINE", "SHIPPED", "DELIVERED", "CANCELLED"];

// ShipmentTracking component to visualize shipment status with line and dots
interface ShipmentTrackingProps {
  status: OrderStatus;
}

const ShipmentTracking: React.FC<ShipmentTrackingProps> = ({ status }) => {
  const currentIndex = statusStages.indexOf(status);

  return (
    <div className="relative flex items-center justify-between">
      {statusStages.map((stage, index) => (
        <React.Fragment key={stage}>
          <div
            className={`w-4 h-4 rounded-full ${index <= currentIndex ? 'bg-green-500' : 'bg-gray-400'} transition-colors duration-300`}
          >
            {index <= currentIndex && getStatusIcon(stage)}
          </div>
          {index < statusStages.length - 1 && (
            <div
              className={`flex-1 h-1 ${index < currentIndex ? 'bg-green-500' : 'bg-gray-400'} transition-colors duration-300`}
            ></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

// Status icon based on status
const getStatusIcon = (status: OrderStatus) => {
  switch (status) {
    case "NEW-ORDER":
      return <AiOutlineLoading3Quarters className="text-white animate-spin" />;
    case "PENDING-PAYMENT-ONLINE":
      return <AiOutlineLoading3Quarters className="text-white animate-spin" />;
    case "SHIPPED":
      return <AiOutlineCheckCircle className="text-white animate-bounce" />;
    case "DELIVERED":
      return <AiFillCheckCircle className="text-white animate-bounce" />;
    case "CANCELLED":
      return <AiFillCloseCircle className="text-white animate-pulse" />;
    default:
      return null;
  }
};

// OrderHistoryPage component
const OrderHistoryPage = () => {
  const [orders, setOrders] = useState<OrderProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const router = useRouter();
  const token = typeof window !== 'undefined' ? document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1") : '';

  useEffect(() => {
    if (!token) {
      router.push("/signin");
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await axios.get("https://app-api.sampurnakart.in/products/orderHistory", {
          headers: {
            'X-Auth-Token': token
          }
        });
        setOrders(response.data);
      } catch (error) {
        setError("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token, router]);

  const toggleExpand = (orderId: string) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  if (loading) return <p>Loading...</p>;

  if (error) return <p>{error}</p>;

  if (!orders.length) return <p>No orders found.</p>;

  return (
    <div className="w-full max-w-screen-xl mx-auto p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.slice().reverse().map((order) => (
            <React.Fragment key={order._id}>
              <TableRow>
                <TableCell className="font-medium">{order.orderId}</TableCell>
                <TableCell>
                  <Label className={`inline-block px-4 py-1 text-sm font-medium rounded-full ${statusStyles[order.orderStatus]}`}>
                    {getStatusIcon(order.orderStatus)}
                    <Label className="ml-2">{order.orderStatus}</Label>
                  </Label>
                </TableCell>
                <TableCell>Credit Card</TableCell> {/* Assuming method is 'Credit Card'; adjust if needed */}
                <TableCell className="text-right">{order.bill[0]?.grandTotal.toFixed(2)}</TableCell>
                <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <button onClick={() => toggleExpand(order._id)}>
                    {expandedOrderId === order._id ? "Hide Details" : "View Details"}
                  </button>
                </TableCell>
              </TableRow>
              {expandedOrderId === order._id && (
                <TableRow>
                  <TableCell colSpan={6}>
                    <div className="p-4 border-t">
                      <h3 className="text-lg font-semibold">Order Details</h3>
                      <div className="mt-4">
                        <h4 className="text-md font-medium">Address:</h4>
                        <p>{order.address.name}, {order.address.buildingNo}, {order.address.streetName}, {order.address.city}, {order.address.area}, {order.address.state} - {order.address.pinCode}</p>
                        <p>Phone: {order.address.phone}</p>
                      </div>
                      <div className="mt-4">
                        <h4 className="text-md font-medium">Items:</h4>
                        <ul>
                          {order.items.map((item) => (
                            <li key={item.productId}>
                              <div className="flex justify-between">
                                <span>{item.productTitle}</span>
                                <span>{item.quantity} x {item.variant.price.toFixed(2)}</span>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-4">
                        <h4 className="text-md font-medium">Shipment Tracking:</h4>
                        <ShipmentTracking status={order.orderStatus} />
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderHistoryPage;
