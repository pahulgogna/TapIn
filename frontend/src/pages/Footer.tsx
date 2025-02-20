import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="w-full bg-black text-white py-6 mt-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        
        {/* Left Section - Logo & Branding */}
        <div className="flex items-center space-x-4">
          <img src="/images/logo.png" alt="TapIn Logo" className="h-12" />
          <div>
            <h2 className="text-lg font-semibold">TapIn</h2>
            <p className="text-sm text-gray-400">© {new Date().getFullYear()} TapIn. All rights reserved.</p>
          </div>
        </div>

        {/* Center Section - Navigation Links */}
        <div className="flex space-x-6 text-gray-300 text-sm">
          <a href="#about" className="hover:text-[#18cb96] transition duration-200">About</a>
          <a href="#services" className="hover:text-[#18cb96] transition duration-200">Services</a>
          <a href="#contact" className="hover:text-[#18cb96] transition duration-200">Contact</a>
        </div>

        {/* Right Section - Social Icons */}
        <div className="flex space-x-4">
          <a href="#" className="hover:text-[#18cb96] transition duration-200"><FaFacebook size={20} /></a>
          <a href="#" className="hover:text-[#18cb96] transition duration-200"><FaTwitter size={20} /></a>
          <a href="#" className="hover:text-[#18cb96] transition duration-200"><FaInstagram size={20} /></a>
          <a href="#" className="hover:text-[#18cb96] transition duration-200"><FaLinkedin size={20} /></a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
