import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import Footer from "./Footer";
import Pricing from "./Premium";
import FAQSection from "./Faq";

gsap.registerPlugin(ScrollTrigger);

function NewsletterSignup() {
  const formRef = useRef(null);

  useEffect(() => {
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 50, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.5,
          ease: "power3.out",
        }
      );
    }
  }, []);

  return (
    <motion.div
      ref={formRef}
      className="mt-12 p-8 bg-black/50 backdrop-blur-lg rounded-2xl border border-gray-600 shadow-xl w-full max-w-3xl mx-auto text-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <h2 className="text-3xl font-bold text-[#18cb96] mb-4">Subscribe</h2>
      <p className="text-gray-300 mb-4">
        Stay updated with the latest features and news!
      </p>

      <form
        action="https://gmail.us22.list-manage.com/subscribe/post?u=2effdeba16676c40f83062a5d&amp;id=70cb75e305&amp;f_id=008fdbe1f0"
        method="post"
        target="_blank"
        className="flex flex-col space-y-4"
      >
        <input
          type="email"
          name="EMAIL"
          placeholder="Email Address"
          required
          className="p-3 rounded-lg border border-gray-500 bg-black/70 text-white focus:border-[#18cb96] focus:outline-none"
        />
        <input
          type="text"
          name="FNAME"
          placeholder="First Name"
          className="p-3 rounded-lg border border-gray-500 bg-black/70 text-white focus:border-[#18cb96] focus:outline-none"
        />
        <input
          type="text"
          name="LNAME"
          placeholder="Last Name"
          className="p-3 rounded-lg border border-gray-500 bg-black/70 text-white focus:border-[#18cb96] focus:outline-none"
        />

        {/* Animated Subscribe Button */}
        <motion.button
          type="submit"
          className="w-full py-3 mt-2 bg-[#18cb96] text-black font-bold rounded-full shadow-md hover:bg-[#14a67f] transition duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Subscribe
        </motion.button>
      </form>
    </motion.div>
  );
}

function Landing() {
  const serviceRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    serviceRefs.current.forEach((el, index) => {
      if (el) {
        gsap.fromTo(
          el,
          { opacity: 0, x: index % 2 === 0 ? -100 : 100 }, // Left for even, right for odd
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    });
  }, []);
  return (
    <div
      className="relative min-h-screen bg-black text-white flex flex-col items-center"
      style={{
        backgroundImage: "url('/images/background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Fixed Navbar */}
      {/* <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-1/2 transform -translate-x-1/2 w-[90%] max-w-5xl flex justify-between items-center px-8 py-2 mt-4 bg-black/80 backdrop-blur-md rounded-full border border-gray-700 shadow-lg z-50"
      >
        <img src="/images/logo.png" alt="Logo" className="h-15 ml-6" />
        <div className="flex space-x-8 text-lg">
          <a href="#why-us" className="hover:text-[#18cb96] transition duration-200">Why Us</a>
          <a href="#mission" className="hover:text-[#18cb96] transition duration-200">Mission</a>
          <a href="#services" className="hover:text-[#18cb96] transition duration-200">Services</a>
          <a href="#signup" className="hover:text-[#18cb96] transition duration-200">Sign-Up</a>
        </div>
        <motion.button
          className="px-6 py-2 bg-black text-white border border-gray-600 rounded-full hover:bg-gray-800 transition duration-300 mr-6"
          whileHover={{ scale: 1.05 }}
        >
          Let’s Talk ↗
        </motion.button>
      </motion.nav> */}
      {/* Hero Section */}
      <motion.div
        className="text-center mt-80"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-6xl font-extrabold intro-class">INTRODUCING</h1>

        {/* Logo Replacing "TAPIN" */}
        <motion.img
          src="/images/logo.png"
          alt="Tapin Logo"
          className="h-48 mx-auto mt-1 my-0"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        />

        <p className="text-4xl text-gray-300 mt-6 max-w-2xl mx-auto dis-class">
          AI-powered smart notes, resource sharing, and collaboration
        </p>

        <motion.button
          className="mt-12 px-6 py-3 bg-[#18cb96] text-black font-semibold rounded-full hover:bg-[#14a67f] transition duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Learn More
        </motion.button>

        {/* Why Us Heading (Shifted Down) */}
        <h2 className="mt-20 text-3xl font-semibold text-gray-200">Why Us</h2>
      </motion.div>

      {/* Why Us Section (Moved Up Slightly) */}
      <section id="why-us" className="w-full max-w-6xl mt-32 text-center">
        <motion.h2
          className="text-5xl font-bold"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Experience The Benefits Of Our Expertise
        </motion.h2>
        <motion.p
          className="text-lg text-gray-400 mt-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          That drives impactful gain powerful results
        </motion.p>

        {/* Three Features with Hover Effects */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {/* Card 1 */}
          <motion.div
            className="bg-[#121212] p-8 rounded-xl border border-gray-700 shadow-lg hover:shadow-2xl transition duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <img src="/images/feature1.png" alt="Innovative Approach" className="mx-auto h-20" />
            <h3 className="text-2xl font-semibold mt-4 text-[#18cb96]">Innovative Approach</h3>
            <p className="text-gray-400 mt-2">
              Look for works that reflect a unique character and differentiate in a crowded marketplace.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            className="bg-[#121212] p-8 rounded-xl border border-gray-700 shadow-lg hover:shadow-2xl transition duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <img src="/images/feature2.png" alt="Seamless Experience" className="mx-auto h-20" />
            <h3 className="text-2xl font-semibold mt-4 text-[#18cb96]">Seamless Experience</h3>
            <p className="text-gray-400 mt-2">
              A seamless user experience across all devices, ensuring every interaction connects with the user.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            className="bg-[#121212] p-8 rounded-xl border border-gray-700 shadow-lg hover:shadow-2xl transition duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <img src="/images/feature3.png" alt="Ongoing Partnership" className="mx-auto h-20" />
            <h3 className="text-2xl font-semibold mt-4 text-[#18cb96]">Ongoing Partnership</h3>
            <p className="text-gray-400 mt-2">
              Find a new partner easily, not just providers, who offer ongoing support even after the project ends.
            </p>
          </motion.div>
        </div>


        <FAQSection/>

        {/* CTA Button with Animation */}
        <motion.button
          className="mt-12 px-6 py-3 bg-[#18cb96] text-black font-semibold rounded-full hover:bg-[#14a67f] transition duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          See Services
        </motion.button>
      </section>
      <section id="services" className="w-full max-w-6xl mt-12 text-center">
        <motion.h2 className="text-5xl font-bold">Services</motion.h2>
        <motion.p className="text-lg text-gray-400 mt-5 mb-5">
          Our wide range of services to choose from
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 mb-40">
          {[
            { title: "Resource Viewer", desc: "Access and manage shared resources easily." },
            { title: "Audio Transcribing", desc: "Convert speech into accurate text automatically." },
            { title: "Smart Summaries (Coming Soon)", desc: "Summarize content efficiently using AI." },
            { title: "Personalized Study (Coming Soon)", desc: "Get tailored study material based on your needs." },
          ].map((service, index) => (
            <motion.div
              key={index}
              ref={(el) => (serviceRefs.current[index] = el)}
              className="bg-[#121212] p-10 rounded-2xl border border-gray-700 shadow-lg transition duration-300 h-48 flex flex-col justify-center items-center"
              whileHover={{ scale: 1.05, borderColor: "#18cb96", boxShadow: "0px 0px 20px #18cb96" }}
            >
              <motion.h3
                className="text-2xl font-semibold transition duration-300"
                whileHover={{ color: "#18cb96" }}
              >
                {service.title}
              </motion.h3>
              <p className="text-gray-400 mt-2">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

          <div className="mb-10">
            <Pricing />
          </div>
          <div className="newsletter">
          <motion.h2 className={`text-5xl font-bold join-us`}>JOIN-US</motion.h2>
          <NewsletterSignup />
          </div>

    <Footer/>
    </div>
    
  )
}

export default Landing
