export type Category = {
  _id: string;
  categoryName: string;
  categoryBrands: string[];
  __v: number;
  imageURL: string;
};

export type Brand = {
  _id: string;
  brandName: string;
  brandModels: string[];
  __v: number;
  imageURL: string;
  parentCatId: string;
};

export type Model = {
  _id: string;
  modelName: string;
  knownIssues: string[];
  parentBrandId: string;
  _v: number;
  imageURL: string;
  parentCatId: string;
};

export type Issue = {
  _id: string;
  issueName: string;
  issueCost: string;
  knownIssues: string[];
  parentBrandId: string;
  parentModelId: string;
  rewardPercent: number;
  _v: number;
  imageURL: string;
  parentCatId: string;
};

// types.ts

export interface UserDetails {
  name: string;
  email: string;
  buildingNo: string;
  streetName: string;
  area: string;
  contactNo: string;
  city: string;
  state: string;
  pinCode: string;
  paymentMethod: string;
  deliveryMode: string;
  totalCost: number;
  customInfo: string;
  repairNames: string[];
  useRewardPoint: boolean;
  usePromocode: boolean;
  promocode: string | null;
}

export interface RepairContextType {
  userDetails: UserDetails;
  updateUserDetails: (details: Partial<UserDetails>) => void;
}
export interface OrderConfirmation {
  info: string;
  repairId: string;
}

export interface FormState {
  name: string;
  email: string;
  buildingNo: string;
  streetName: string;
  area: string;
  contactNo: string;
  city: string;
  state: string;
  pinCode: string;
  paymentMethod?: string;
  deliveryMode?: string;
  customInfo: string;
}

export interface OrderProduct {
  _id: string;
  userId: string;
  address: string;
  orderId: number;
  latestUpdateTime: string;
  repairNames: {
    issueName: string;
    issueCost: number;
  }[];
  orderDate: string;
  totalCost: number;
  orderStatus: string;
  __v: number;
}
