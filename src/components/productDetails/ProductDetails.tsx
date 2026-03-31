// components/product/ProductDetails.tsx
import React from 'react';
import ProductHeader from './ProductHeader';
import SustainableAttributes from './SustainableAttributes';
import ProductActions from './ProductActions';
import SustainableProof from './SustainableProof';

interface ProductDetailsProps {
  data: any; // Type with exact fields is better in production
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
        description={data.description}
        quantity={quantity}
        setQuantity={setQuantity}
      />
      <SustainableProof proofPoints={data.sustainableProof} />
    </>
  );
};

export default ProductDetails;