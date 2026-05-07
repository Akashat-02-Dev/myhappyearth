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

// The above code defines a ProductDetails component that composes several subcomponents to display detailed information about a product. It receives product data and quantity state as props, and passes relevant information down to the ProductHeader, SustainableAttributes, ProductActions, and SustainableProof components. The ProductActions component now also receives the product name to ensure it can display accurate information when adding items to the cart.