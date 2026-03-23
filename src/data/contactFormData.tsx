export const contactInputs = [
  { 
    label: 'NAME', 
    type: 'text', 
    placeholder: 'John Doe', 
    icon: (
      <svg className="w-5 h-5 text-earth-leaf/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ) 
  },
  { 
    label: 'EMAIL', 
    type: 'email', 
    placeholder: 'john@example.com', 
    icon: (
      <svg className="w-5 h-5 text-earth-leaf/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ) 
  },
  { 
    label: 'SUBJECT', 
    type: 'text', 
    placeholder: 'How can we help?', 
    icon: (
      <svg className="w-5 h-5 text-earth-leaf/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ) 
  },
];