// components/ui/QuantitySelector.tsx
import React from 'react';

interface QuantitySelectorProps {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({ quantity, setQuantity }) => {
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="flex items-center justify-between gap-4 max-w-[200px] bg-white border border-earth-dark/10 rounded-full px-5 py-2.5 shadow-inner">
      <button onClick={handleDecrement} className="text-earth-green text-3xl font-bold p-1 hover:text-earth-green/80">
         －
      </button>
      <span className="text-2xl font-extrabold text-earth-dark tabular-nums">{quantity}</span>
      <button onClick={handleIncrement} className="text-earth-green text-3xl font-bold p-1 hover:text-earth-green/80">
         ＋
      </button>
    </div>
  );
};

export default QuantitySelector;