// src/components/TheProblem.tsx
export default function TheProblem() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-earth-light text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-earth-deep mb-8 leading-tight">
          We're drowning the planet in choices we didn't mean to make.
        </h2>
        
        <div className="space-y-6 text-lg md:text-xl text-earth-deep/80 font-medium leading-relaxed max-w-3xl">
          <p>
            Every year, over 8 million tonnes of plastic pour into our oceans. Every day, forests the size of football fields disappear. Every hour, the equivalent of one garbage truck of textile waste is landfilled or burned.
          </p>
          <p>
            This isn't someone else's problem. It's in our kitchens, our bathrooms, our lunchboxes - in the "convenient" choices we make without thinking.
          </p>
          <p>
            But here's the thing no one tells you:
          </p>
        </div>

        <div className="my-12 py-8 px-6 bg-earth-sage/10 border border-earth-sage/20 rounded-3xl w-full">
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-earth-forest italic">
            "The same power that created this mess can undo it."
          </h3>
        </div>

        <div className="space-y-6 text-lg md:text-xl text-earth-deep/80 font-medium leading-relaxed max-w-3xl mb-12">
          <p>
            Every plastic bag refused. Every disposable replaced. Every "normal" product swapped for one that returns safely to the earth. It all adds up. And when millions of us do it together, it doesn't just reduce harm - it rewrites what "normal" looks like.
          </p>
          <p>
            That's what we're here to do. Not to sell you products. To hand you the tools to fight back.
          </p>
        </div>

        <button className="bg-earth-deep text-earth-light px-10 py-4 rounded-full font-bold text-lg hover:bg-earth-forest transition-all duration-300 shadow-xl hover:-translate-y-1">
          See How We're Turning the Tide
        </button>
      </div>
    </section>
  );
}