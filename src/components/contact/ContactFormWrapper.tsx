import Image from 'next/image';
import ContactFormContent from './ContactFormContent';

export default function ContactFormWrapper() {
  return (
    <section className="w-full min-h-screen py-24 px-12 md:px-24 lg:px-32 bg-earth-deep relative overflow-hidden">
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/contact-form-bg.jpeg" 
          alt="Contact form background"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Subtle dark overlay to ensure the white card pops */}
        <div className="absolute inset-0 bg-earth-deep/10 backdrop-brightness-[.85]"></div>
      </div>

      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center relative z-10">
        
        {/* Form Card (White) */}
        <div className="w-full p-12 lg:p-16 bg-earth-light rounded-3xl shadow-2xl flex flex-col items-center">
          
          <h2 className="text-4xl md:text-5xl font-sans font-extrabold text-center leading-tight mb-20 text-earth-leaf drop-shadow-sm">
            Contact Us
          </h2>

          <ContactFormContent />
          
        </div>

      </div>
    </section>
  );
}