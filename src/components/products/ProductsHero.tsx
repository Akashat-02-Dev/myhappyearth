import Image from 'next/image';

export default function ProductsHero() {
  return (
    // Section with relative positioning for elements
    <section className="relative w-full h-screen overflow-hidden bg-earth-deep z-10 flex flex-col items-center justify-center">
      
      {/* Target Background Image (Generated specifically to match image_7.png) */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/products-hero-bg.jpeg" // Placeholder for your image asset name
          alt="Eco-friendly Sustainable Collection flat lay"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Semi-Transparent Dark Overlay (Matches palette tint and opacity) */}
        <div className="absolute inset-0 bg-black/30 backdrop-brightness-[.85]"></div>
      </div>

      {/* Top-Level Elements (relative z-10 to sit above overlay) */}
      <div className="absolute inset-0 z-10 w-full h-full flex flex-col items-center justify-center pt-24 pb-12 px-6 md:px-12 lg:px-24 text-white">
        
        {/* Breadcrumbs (Top-Left, matching small sans-serif style) */}
        {/* <div className="absolute top-10 left-10 text-sm font-sans font-medium text-white/90">
          Home &gt; Products
        </div> */}

        {/* Central Content Column */}
        <div className="text-center max-w-4xl">
          {/* Main Title: Large Serif White Text */}
          <h1 className="font-serif font-extrabold text-5xl md:text-6xl lg:text-7xl leading-tight mb-8">
            Sustainable Collection
          </h1>
          
          {/* Subtitle/Tagline: Medium Serif White Text */}
          {/* NOTE: Replicated typos "is vote vote" exactly as shown in reference image_7.png */}
          <p className="font-serif font-medium text-lg md:text-xl lg:text-2xl leading-relaxed opacity-90">
            Every product you choose is vote vote for the planet
          </p>
        </div>

      </div>
      
    </section>
  );
}