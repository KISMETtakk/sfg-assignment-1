import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = ["Home", "Dashboard", "Profile", "Logout"];

export default function NavigationBar() {
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed w-full z-50 bg-gradient-to-r from-purple-900 via-pink-700 to-red-600 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-white text-2xl font-extrabold tracking-widest">ALUMNI SPACE</h1>
        <div className="md:hidden">
          <button onClick={() => setOpen(!open)} className="text-white">
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
        <ul className="hidden md:flex space-x-6">
          {navItems.map((item, idx) => (
            <li key={idx} className="text-white font-semibold hover:text-yellow-300 transition duration-300 cursor-pointer">
              {item}
            </li>
          ))}
        </ul>
      </div>
      {open && (
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="md:hidden flex flex-col bg-black/80 text-white space-y-4 px-6 py-4"
        >
          {navItems.map((item, idx) => (
            <li key={idx} className="hover:text-yellow-300 transition duration-300 cursor-pointer">
              {item}
            </li>
          ))}
        </motion.ul>
      )}
    </motion.nav>
  );
}
