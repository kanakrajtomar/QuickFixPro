import { createContext, useContext, useState, ReactNode } from "react";
import { UserDetails, RepairContextType } from "./types";

const RepairContext = createContext<RepairContextType | undefined>(undefined);

export const useRepair = (): RepairContextType => {
  const context = useContext(RepairContext);
  if (!context) {
    throw new Error("useRepair must be used within a RepairProvider");
  }
  return context;
};

interface RepairProviderProps {
  children: ReactNode;
}

export const RepairProvider = ({ children }: RepairProviderProps) => {
  const [userDetails, setUserDetails] = useState<UserDetails>({
    name: "",
    email: "",
    buildingNo: "",
    streetName: "",
    area: "",
    contactNo: "",
    city: "",
    state: "",
    pinCode: "",
    paymentMethod: "",
    deliveryMode: "",
    totalCost: 0,
    customInfo: "",
    repairNames: [],
    useRewardPoint: false, // Set default value to false
    usePromocode: false, // Set default value to false
    promocode: "", // Set default value to empty string
  });

  const updateUserDetails = (details: Partial<UserDetails>) => {
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      ...details,
    }));
  };

  const contextValue: RepairContextType = {
    userDetails,
    updateUserDetails,
  };

  return (
    <RepairContext.Provider value={contextValue}>
      {children}
    </RepairContext.Provider>
  );
};
