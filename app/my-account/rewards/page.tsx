"use client";

import { useState, useEffect } from "react";
import axios from "axios";

interface Transaction {
  time: string;
  type: string;
  amount: number;
  transactionId: string;
}

interface Wallet {
  _id: string;
  userId: string;
  currentBalance: number;
  pendingPoints: any[];
  transactions: Transaction[];
  __v: number;
}

export default function Rewards() {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWalletAndBalance = async () => {
      try {
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="))
          ?.split("=")[1];

        if (!token) {
          throw new Error("Token not found");
        }

        // Fetch wallet data
        const walletResponse = await axios.get<Wallet[]>("https://app-api.sampurnakart.in/wallet/wallet", {
          headers: {
            "x-auth-token": token,
          },
        });
        setWallet(walletResponse.data[0]);

        // Fetch balance
        const balanceResponse = await axios.get<{ balance: number }>("https://app-api.sampurnakart.in/wallet/balance", {
          headers: {
            "x-auth-token": token,
          },
        });
        setBalance(balanceResponse.data.balance);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchWalletAndBalance();
  }, []);

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Rewards</h1>
      {wallet && balance !== null ? (
        <div>
          <h2 className="text-xl font-semibold mb-4">Current Balance: {balance}</h2>
          <h3 className="text-lg font-medium mb-2">Transactions:</h3>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {wallet.transactions.map((transaction) => (
                <tr key={transaction.transactionId}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{transaction.time}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span
                      className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                        transaction.type === "credit" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                    </span>
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm ${
                      transaction.type === "credit" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {transaction.type === "credit" ? "+" : "-"}{transaction.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.transactionId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">Loading...</p>
      )}
    </div>
  );
}
