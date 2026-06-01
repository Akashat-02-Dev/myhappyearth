// src/data/faqData.ts

export interface FAQItemData {
  id: number;
  question: string;
  answer: string;
}

export const faqData: FAQItemData[] = [
  {
    id: 1,
    question: 'What types of bags do you offer?',
    answer: 'We offer a wide range of bags, including promotional bags, shopping bags, tote bags, bottle bags, cooler bags, and drawstring bags to name a few. We can customize them to virtually any size and design.',
  },
  { id: 2, question: 'What makes the fabric sustainable for bags?', answer: 'All the fabrics used by us are natural, biodegradable, and renewable fiber that requires minimal pesticides and fertilizers to grow. It’s a highly sustainable choice for packaging and promotional items.' },
  { id: 3, question: 'How durable are your bags?', answer: 'We don’t compromise on quality. All our bags are manufactured from heavy-duty fabrics, known for their strength and longevity, making them ideal for frequent use and heavy loads. ' },
  { id: 4, question: 'What is your Minimum Order Quantity (MOQ) for custom jute bags?', answer: 'Our standard MOQ for fully customized jute bags is 10,000 units per design. For lower MOQs contact us directly.' },
  { id: 5, question: 'What is the process for customizing our bags with our logo or design?', answer: 'Simply provide us with your logo or design in file formats, e.g., vector AI, EPS, or high-resolution JPG. Our design team will work with you to create proofs for your approval before production begins. We offer screen printing, heat transfer, digital printing and embroidery. Entire manufacturing and printing is done in our own factory in the Jute heartland, Kolkata at very economical rates.' },
  { id: 6, question: 'What are the branding and logo placement options available?', answer: 'We offer versatile options including custom sizing, printing methods, placement areas, single / multi coloured fabric including patterns. Our sales team can guide you on the best options for your design and budget.' },
  { id: 7, question: 'How do I get a quote for a bulk order?', answer: 'Just select the style of bag you require from our product pages & contact us by email, telephone, or by completing our online enquiry form and we will prepare your personalised quotation.' },
  { id: 8, question: 'What are your payment terms for wholesale orders?', answer: 'For new B2B clients, our standard payment terms are 50% advance payment upon order confirmation, and 50% before final delivery. We also offer Letters of Credit (LC) for larger International and Overseas orders.' },
  { id: 9, question: 'How long does shipping to Australia typically take?', answer: 'We have a streamlined export-import setup and can arrange shipping via sea freight or air freight, depending on your urgency and budget (can do FOB and CIF if required). Sea freight usually takes between [e.g., 20-30] days from dispatch. Air freight is faster, typically [e.g., 5-7] days, but at a higher cost. Your assigned representative will provide precise estimates.' },
  { id: 10, question: 'What are your company\'s sustainability practices?', answer: 'Sustainability is at the core of our ethos. Jute is a naturally eco-friendly fiber. Our factory also [mention any specific practices like water conservation, waste reduction, ethical labor practices, or community support if applicable]' },
];