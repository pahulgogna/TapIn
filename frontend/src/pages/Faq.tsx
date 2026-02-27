import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Footer from './Footer';

const faqs = [
  {
    question: 'What Makes Automatix Different From Other Agencies?',
    answer: 'Automatix offers unique AI-driven solutions tailored to specific business needs, ensuring efficiency and innovation.'
  },
  {
    question: 'How Does AI Enhance The Services Provided By Automatix?',
    answer: 'AI helps streamline processes, improve accuracy, and provide data-driven insights that optimize overall performance.'
  },
  {
    question: 'How Does Automatix Ensure The Quality Of Its AI Solutions?',
    answer: 'Through rigorous testing, continuous monitoring, and adapting to industry best practices.'
  },
  {
    question: 'Does Automatix Offer Customized Solutions?',
    answer: 'Yes, Automatix works closely with clients to create tailored solutions that fit their unique requirements.'
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div
      className="relative min-h-screen bg-black bg-cover bg-fixed bg-center text-white flex flex-col justify-center items-center"
      style={{
        backgroundImage: "url('/images/background.png')"
      }}
    >
      <section className="flex flex-col items-center p-2 mb-5">
        <p className="text-sm text-gray-400 mb-2">Need to Know</p>
        <h2 className="text-4xl font-bold mb-8">Frequently Asked Questions</h2>
        <div className="w-full max-w-3xl">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4 border-b border-gray-700">
              <button
                className="flex justify-between items-center w-full p-4 text-lg font-medium hover:bg-gray-800 focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <span>{faq.question}</span>
                {openIndex === index ? <ChevronUp /> : <ChevronDown />}
              </button>
              {openIndex === index && (
                <div className="p-4 bg-gray-900 text-gray-300 transition-all duration-300">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
