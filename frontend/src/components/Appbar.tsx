import { useRecoilValueLoadable } from "recoil";
import { notesAtom, userAtom } from "../store/atom/atom";
import { Avatar } from "./basics/Avatar";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

function Appbar() {
  const user = useRecoilValueLoadable(userAtom);
  const notes = useRecoilValueLoadable(notesAtom);
  const [showNotes, setShowNotes] = useState(false);

  if (user.state === "loading" || notes.state === "loading") {
    return (
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-1/2 transform -translate-x-1/2 w-[90%] max-w-5xl flex justify-between items-center px-8 py-2 mt-4 bg-black/80 backdrop-blur-md rounded-full border border-gray-700 shadow-lg z-50"
      >
        <Link to={"/"}>
          <img src="/images/logo.png" alt="Logo" className="h-15 ml-6" />
        </Link>
        <div className="flex space-x-8 text-lg text-white">
          <a href="#why-us" className="hover:text-[#18cb96] transition duration-200">Why Us</a>
          <a href="#mission" className="hover:text-[#18cb96] transition duration-200">Mission</a>
          <a href="#services" className="hover:text-[#18cb96] transition duration-200">Services</a>
          <Link to={"/signup"} className="hover:text-[#18cb96] transition duration-200">Sign-Up</Link>
        </div>
      </motion.nav>
    );
  } else {
    if (!user.contents) {
      return (
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="fixed top-0 left-1/2 transform -translate-x-1/2 w-[90%] max-w-5xl flex justify-between items-center px-8 py-2 mt-4 bg-black/80 backdrop-blur-md rounded-full border border-gray-700 shadow-lg z-50"
        >
          <Link to={"/"}>
            <img src="/images/logo.png" alt="Logo" className="h-15 ml-6" />
          </Link>
          <div className="flex space-x-8 text-lg text-white">
            <a href="#why-us" className="hover:text-[#18cb96] transition duration-200">Why Us</a>
            <a href="#mission" className="hover:text-[#18cb96] transition duration-200">Mission</a>
            <a href="#services" className="hover:text-[#18cb96] transition duration-200">Services</a>
            <Link to={"/signup"} className="hover:text-[#18cb96] transition duration-200">Sign-Up</Link>
          </div>
        </motion.nav>
      );
    }

    return (
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-1/2 transform -translate-x-1/2 w-[90%] max-w-5xl flex justify-between items-center px-8 py-2 mt-4 bg-black/80 backdrop-blur-md rounded-full border border-gray-700 shadow-lg z-50"
      >
        <Link to={"/"}>
          <img src="/images/logo.png" alt="Logo" className="h-15 ml-6" />
        </Link>
        <div className="flex space-x-8 text-lg text-white">
          <a href="#why-us" className="hover:text-[#18cb96] transition duration-200">Why Us</a>
          <a href="#mission" className="hover:text-[#18cb96] transition duration-200">Mission</a>
          <a href="#services" className="hover:text-[#18cb96] transition duration-200">Services</a>
          <Link to={"/signup"} className="hover:text-[#18cb96] transition duration-200">Sign-Up</Link>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setShowNotes(true)}
          onMouseLeave={() => setShowNotes(false)}
        >
          <motion.button
            className="px-6 py-2 text-white rounded-full transition duration-600 mr-6"
            whileHover={{ scale: 1.05 }}
          >
            <Link to={"/dashboard"}>
                <Avatar>{user.contents?.name}</Avatar>
            </Link>
          </motion.button>

          {showNotes && notes.contents.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 1 }}
              className="absolute right-0 mt-1 w-32 bg-black/80 text-white text-center py-2 rounded-lg shadow-lg border border-gray-700"
            >
              <a href={"/notes"}>Notes: {notes.contents.length}</a>
            </motion.div>
          )}
        </div>
      </motion.nav>
    );
  }
}

export default Appbar;
