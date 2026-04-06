// src/components/productDetails/ProductActions.tsx
import React from 'react';
import Link from 'next/link';
// import QuantitySelector from '@/components/ui/QuantitySelector';
import Button from '@/components/ui/Buttons';

interface ProductActionsProps {
  productName: string; // THE FIX: Define the new prop
  description: string;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}

const ProductActions: React.FC<ProductActionsProps> = ({ productName, description, quantity, setQuantity }) => {
  return (
    <div className="flex flex-col gap-6 py-3">
      <p className="text-earth-dark/90 leading-relaxed">{description}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* THE FIX: Dynamically pass the product name to the new Enquiry Page */}
        <Link href={`/enquiry?product=${encodeURIComponent(productName)}`} className="w-full block">
          <Button variant="solid" fullWidth>Enquiry</Button>
        </Link>

        {/* <Button variant="outline" fullWidth>Add to Wishlist</Button> */}
      </div>

      {/* <QuantitySelector quantity={quantity} setQuantity={setQuantity} /> */}
    </div>
  );
};

export default ProductActions;