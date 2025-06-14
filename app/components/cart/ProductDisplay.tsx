import { CartItem } from "@/app/cart/page";
import { TableCell } from "@/components/ui/table";
import Image from "next/image";

const ProductDisplay = ({ item }: { item: CartItem }) => {
  return (
    <TableCell className="flex gap-4 items-center font-medium">
      <Image
        className="rounded-lg"
        src={item.productImageUrl}
        alt={item.productName}
        width={70}
        height={70}
      />
      {item.productName}
    </TableCell>
  );
};

export default ProductDisplay;
