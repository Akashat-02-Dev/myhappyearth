// src/data/faqData.ts

export interface FAQItemData {
  id: number;
  question: string;
  answer: string;
}

export const faqData: FAQItemData[] = [
  {
    id: 1,
    question: 'What makes your products eco-friendly?',
    answer: 'Our products are crafted from sustainably sourced and biodegradable materials, minimizing environmental impact. We use renewable energy in our manufacturing process and offset all carbon emissions. Each item is designed for longevity and packaged with the planet in mind.',
  },
  { id: 2, question: 'Do you ship Australia-wide?', answer: 'Yes, we offer shipping to all addresses across Australia!' },
  { id: 3, question: 'What is your return policy?', answer: 'We stand by our products. You can return any item within 30 days of purchase for a full refund or exchange.' },
  { id: 4, question: 'Can I order in bulk for my business?', answer: 'Absolutely! We provide bulk and wholesale options for businesses. Please contact us for more information and pricing.' },
  { id: 5, question: 'Are your products certified?', answer: 'Yes, our products are certified by reputable third-party organizations for environmental and ethical standards.' },
  { id: 6, question: 'Is your packaging sustainable?', answer: 'Yes, all our packaging is made from recycled and recyclable materials, and we use eco-friendly inks.' },
  { id: 7, question: 'Do you offer gift cards?', answer: 'Yes, we offer digital gift cards in various denominations. Perfect for any eco-conscious friend!' },
  { id: 8, question: 'Are your products cruelty-free?', answer: 'Yes, none of our products or their ingredients are tested on animals.' },
  { id: 9, question: 'How can I track my order?', answer: 'Once your order has shipped, we will email you a tracking number to monitor its progress.' },
  { id: 10, question: 'Do you use certified organic ingredients?', answer: 'Many of our products use certified organic ingredients where possible. Please check the individual product pages for details.' },
];