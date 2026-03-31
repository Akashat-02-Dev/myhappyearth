// components/product/SustainableProof.tsx
import React from 'react';

interface SustainableProofProps {
  proofPoints: string[];
}

const SustainableProof: React.FC<SustainableProofProps> = ({ proofPoints }) => {
  return (
    <div className="flex flex-col gap-3.5 pt-4 border-t border-earth-dark/10">
      <h2 className="text-xl font-extrabold text-earth-dark">Why This Product is Sustainable</h2>
      <ul className="flex flex-col gap-3">
        {proofPoints.map((point, index) => (
          <li key={index} className="flex items-center gap-3">
            {/* Clean leaf line icon matching overall theme */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C12 2 12 9 10 11C8 13 4 13 4 13M12 2C12 2 16 4 16 6C16 8 16 11 14 13C12 15 4 18 4 18M4 18L12 12M12 2C12 2 19 2 20 4C21 6 21 13 21 13" stroke="#5D7C5D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-earth-dark/90 text-md">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SustainableProof;