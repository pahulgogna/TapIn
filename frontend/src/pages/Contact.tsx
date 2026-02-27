import React from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Footer from "./Footer";

function Contact() {
  return (
    <div className="min-h-screen bg-black text-white px-6 flex flex-col">
      
      {/* Content Wrapper - Avoids affecting Footer */}
      <div className="flex flex-col justify-center items-center flex-grow">
        <h1 className="text-4xl font-bold text-[#18cb96] mb-6 mt-30">Get in Touch</h1>
        <p className="text-gray-300 text-center max-w-2xl mb-10">
          Have a question? <br/> Want to work together? <br/>Fill out the form below or contact us directly.
        </p>

        {/* Contact Form */}
        <div className="w-full max-w-3xl bg-gray-900 p-8 rounded-xl shadow-lg">
          <form>
            <div className="mb-4">
              <label className="block text-gray-400 mb-2">Your Name</label>
              <input type="text" className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-[#18cb96]" placeholder="John Doe" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-400 mb-2">Email Address</label>
              <input type="email" className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-[#18cb96]" placeholder="example@email.com" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-400 mb-2">Message</label>
              <textarea className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-[#18cb96]" placeholder="Write your message here..." rows={4}></textarea>
            </div>
            <button type="submit" className="w-full bg-[#18cb96] text-black font-bold py-3 rounded-lg hover:bg-green-500 transition duration-300">
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="mt-10 text-center">
          <p className="flex items-center justify-center space-x-3 text-gray-400 text-xl">
            <FaPhone /> <span>+91 123 456 7890</span>
          </p>
          <p className="flex items-center justify-center space-x-3 text-gray-400 text-xl mt-2 mb-2">
            <FaEnvelope /> <span>contact@tapin.com</span>
          </p>
          <p className="flex items-center justify-center space-x-3 text-gray-400 text-xl">
            <FaMapMarkerAlt /> <span>New Delhi, India</span>
          </p>
        </div>
      </div>

      {/* Footer is outside the flex-grow content, so it's not affected */}
      <Footer />
      
    </div>
  );
}

export default Contact;
