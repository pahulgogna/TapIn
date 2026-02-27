import React, { useEffect, useRef } from "react";
import gsap from "gsap";

function Pricing() {
  const pricingRef = useRef(null);

  useEffect(() => {
    gsap.from(pricingRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
    });
  }, []);

  return (
    <div ref={pricingRef} className="min-h-screen  text-white flex flex-col items-center py-10">
      
      {/* Section Header */}
      <span className="px-4 py-2 bg-gray-800 text-gray-300 text-xl rounded-full mb-10">
        Pricing Plans
      </span>
      <h2 className="text-4xl font-bold text-[#18cb96] mb-15">Choose Your Plan</h2>

      {/* Pricing Cards Container */}
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Standard Plan */}
        <div className="bg-gray-900 p-8 rounded-2xl shadow-lg w-80 md:w-96">
          <h3 className="text-xl font-semibold">Standard</h3>
          <p className="text-gray-400 mb-4">Ideal for small teams.</p>
          <p className="text-3xl font-bold">$900<span className="text-lg font-normal"> /month</span></p>

          <button className="mt-5 w-full bg-[#18cb96] text-black font-semibold py-3 rounded-lg hover:bg-green-500 transition duration-300 transform hover:scale-105 shadow-md">
            Get Started →
          </button>

          <div className="mt-6 text-gray-300 text-sm">
            <p>✔ Up to 10 users</p>
            <p>✔ Basic support</p>
            <p>✔ Standard features</p>
          </div>
        </div>

        {/* Pro Plan */}
        <div className="bg-gray-900 p-8 rounded-2xl shadow-lg w-80 md:w-96 relative">
          <span className="absolute top-4 right-4 bg-gray-700 text-gray-200 text-xs px-3 py-1 rounded-full">Popular</span>
          <h3 className="text-xl font-semibold">Pro</h3>
          <p className="text-gray-400 mb-4">For growing businesses.</p>
          <p className="text-3xl font-bold">$1,600<span className="text-lg font-normal"> /month</span></p>

          <button className="mt-5 w-full bg-[#18cb96] text-black font-semibold py-3 rounded-lg hover:bg-green-500 transition duration-300 transform hover:scale-105 shadow-md">
            Get Started →
          </button>

          <div className="mt-6 text-gray-300 text-sm">
            <p>✔ Up to 50 users</p>
            <p>✔ Priority support</p>
            <p>✔ Advanced Analytics</p>
            <p>✔ Custom Workflows</p>
            <p>✔ Enhanced Security</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Pricing;
