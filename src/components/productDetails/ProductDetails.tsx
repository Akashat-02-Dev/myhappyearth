// src/components/productDetails/ProductDetails.tsx
import React from 'react';
import ProductHeader from './ProductHeader';
import SustainableAttributes from './SustainableAttributes';
import ProductActions from './ProductActions';
import SustainableProof from './SustainableProof';

interface ProductDetailsProps {
  data: any; 
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ data, quantity, setQuantity }) => {
  return (
    <>
      <ProductHeader
        title={data.title}
        rating={data.rating}
        reviewCount={data.reviewCount}
        price={data.price}
      />
      <SustainableAttributes attributes={data.sustainableAttributes} />
      <ProductActions
        productName={data.title} // THE FIX: Passing the product name down
        description={data.description}
        quantity={quantity}
        setQuantity={setQuantity}
      />
      <SustainableProof proofPoints={data.sustainableProof} />
    </>
  );
};

export default ProductDetails;