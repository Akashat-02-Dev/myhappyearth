// components/productDetails/ProductActions.tsx
import React from 'react';
import Link from 'next/link'; // 1. Import the Link component
// import QuantitySelector from '@/components/ui/QuantitySelector';
import Button from '@/components/ui/Buttons';

interface ProductActionsProps {
  description: string;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}

const ProductActions: React.FC<ProductActionsProps> = ({ description, quantity, setQuantity }) => {
  return (
    <div className="flex flex-col gap-6 py-3">
      <p className="text-earth-dark/90 leading-relaxed">{description}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 2. Wrap the Button in a Link. 
            We add "w-full block" to the Link so it takes up the full grid column 
            and doesn't break your fullWidth button styling! 
        */}
        <Link href="/enquiry" className="w-full block">
          <Button variant="solid" fullWidth>Enquiry</Button>
        </Link>
        
        {/* <Button variant="outline" fullWidth>Add to Wishlist</Button> */}
      </div>

      {/* <QuantitySelector quantity={quantity} setQuantity={setQuantity} /> */}
    </div>
  );
};

export default ProductActions;