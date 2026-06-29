// src/components/TakeThePledge.tsx
export default function TakeThePledge() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-earth-forest text-earth-light text-center">
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
          Take the Plastic-Free Pledge.
        </h2>
        <h3 className="text-xl md:text-2xl font-bold text-earth-sage mb-6">
          You don't have to do everything. You just have to do something.
        </h3>
        <p className="text-lg text-earth-light/90 font-medium leading-relaxed mb-8">
          Pledge to make one swap - one single, small change that keeps plastic out of your home, your bin, and our oceans. We'll send you a free 7-day guide to going plastic-free, weekly tips, and real ways to take action.
        </p>
        <p className="text-lg font-bold mb-10">
          No spam. No pressure. Just a movement you can actually be part of.
        </p>

        <form className="w-full max-w-md flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="email" 
            placeholder="Enter your email address" 
            className="w-full px-6 py-4 rounded-2xl bg-earth-light text-earth-deep placeholder-earth-deep/50 outline-none focus:ring-4 focus:ring-earth-sage/50 transition-all font-medium"
            required
          />
          <button 
            type="submit"
            className="w-full bg-earth-sage text-earth-deep px-8 py-4 rounded-2xl font-bold text-lg hover:bg-earth-light transition-colors shadow-lg hover:-translate-y-0.5"
          >
            I'm In - Take the Pledge
          </button>
          <p className="text-xs text-earth-light/60 mt-3 px-4 leading-relaxed">
            Join 50,000+ people refusing single-use plastic. By pledging, you agree to receive movement updates (you can leave anytime).
          </p>
        </form>
      </div>
    </section>
  );
}