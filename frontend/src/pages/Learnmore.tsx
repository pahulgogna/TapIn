import React from "react";
import { motion } from "framer-motion";

const teamMembers = [
  { name: "Lakshay Goyal", role: "CEO & Founder", image: "/images/lakshay.jpg" },
  { name: "Pahul Veer", role: "CTO", image: "/images/pahul.jpg" },
  { name: "Navdeep Singh", role: "Lead AI Engineer", image: "/images/navdeep.jpg" },
  { name: "Milan Khanchi", role: "Product Manager", image: "/images/milan.jpg" },
  { name: "Aayush Mishra", role: "UI/UX Designer", image: "/images/aayush.jpg" },
];

function Learnmore() {
  return (
    <div
      className="relative min-h-screen bg-black text-white flex flex-col items-center p-8"
      style={{
        backgroundImage: "url('/images/background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="flex justify-center items-center mt-32 mb-20">
        <img src="/images/logo.png" alt="TapIn Logo" className="w-125 h-60" />
      </div>
      
      <motion.h1
        className="text-4xl font-bold mt-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        TapIn - AI-Powered Learning
      </motion.h1>
      
      <motion.p
        className="text-center max-w-3xl mt-6 text-lg mb-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        TapIn is an AI-powered platform that centralizes academic resource sharing and enhances collaboration. It provides a
        unified space for students to store, access, and organize materials efficiently. With AI-driven note-taking, TapIn
        automatically transcribes and summarizes lectures, ensuring key insights are never missed. Real-time collaboration,
        intelligent search, and structured organization streamline learning, eliminating duplication and improving accessibility
        for students.
      </motion.p>

      <motion.h2
        className="text-5xl font-semibold mt-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Meet Our Team
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
        {teamMembers.slice(0, 4).map((member, index) => (
          <motion.div
            key={index}
            className="bg-gray-800 rounded-xl p-8 text-center flex flex-col items-center transform transition duration-500 hover:scale-105 hover:shadow-lg hover:shadow-blue-500"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-48 h-48 object-cover mb-6"
            />
            <h3 className="text-2xl font-semibold">{member.name}</h3>
            <p className="text-gray-400 text-lg">{member.role}</p>
          </motion.div>
        ))}
      </div>
      
      <div className="flex justify-center mt-12">
        <motion.div
          className="bg-gray-800 rounded-xl p-8 text-center flex flex-col items-center transform transition duration-500 hover:scale-105 hover:shadow-lg hover:shadow-blue-500"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <img
            src={teamMembers[4].image}
            alt={teamMembers[4].name}
            className="w-48 h-48 object-cover mb-6"
          />
          <h3 className="text-2xl font-semibold">{teamMembers[4].name}</h3>
          <p className="text-gray-400 text-lg">{teamMembers[4].role}</p>
        </motion.div>
      </div>
    </div>
  );
}

export default Learnmore;
