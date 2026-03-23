import Link from 'next/link';
import { mainContactNodes } from '@/data/contactInfo';

export default function ContactIconsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 w-full max-w-[85rem] mb-20 justify-items-center z-20">
      {mainContactNodes.map((node, index) => (
        <div key={index} className="flex flex-col items-center text-center max-w-[280px]">
          
          {/* White Circular Container */}
          <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-earth-light text-earth-deep flex items-center justify-center mb-6 shadow-2xl hover:scale-105 transition-transform duration-300">
            {node.icon}
          </div>
          
          {/* Node Text */}
          {node.isLink ? (
            <Link href={node.href} className="font-sans font-semibold text-base md:text-lg leading-snug whitespace-pre-line text-earth-light hover:text-earth-sage transition-colors duration-300">
              {node.text}
            </Link>
          ) : (
            <h3 className="font-sans font-bold text-base md:text-lg whitespace-pre-line leading-snug text-earth-light">
              {node.text}
            </h3>
          )}
          
        </div>
      ))}
    </div>
  );
}