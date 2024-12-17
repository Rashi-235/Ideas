import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className="bg-gradient-to-r from-[#1A2453] to-[#1B206E] p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white hover:text-[#5B77C8] focus:outline-none transition-transform duration-300"
          >
            {isOpen ? <CloseIcon className="transform rotate-180" /> : <MenuIcon />}
          </button>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-between flex-grow mx-8">
            <div className="flex items-center space-x-4 mx-auto">
              <a href="/" className="text-white hover:text-[#5B77C8] transition-colors px-14 py-2 rounded-md text-lg font-medium border-b-2 border-transparent hover:border-[#5B77C8]">
                Home
              </a>
              <a href="/mentor" className="text-white hover:text-[#5B77C8] transition-colors px-14 py-2 rounded-md text-lg font-medium border-b-2 border-transparent hover:border-[#5B77C8]">
                Mentors
              </a>
              <a href="/admin" className="text-white hover:text-[#5B77C8] transition-colors px-14 py-2 rounded-md text-lg font-medium border-b-2 border-transparent hover:border-[#5B77C8]">
                Admin
              </a>
              <a href="/ideas" className="text-white hover:text-[#5B77C8] transition-colors px-14 py-2 rounded-md text-lg font-medium border-b-2 border-transparent hover:border-[#5B77C8]">
                Ideas
              </a>
             
            </div>
          </div>
        </div>
        {/* Mobile Navigation */}
        <div 
          className={`md:hidden mt-4 overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col space-y-3 py-2">
            <a href="/" className="text-white hover:text-[#5B77C8] transition-all duration-300 px-3 py-2 rounded-md text-base font-medium hover:bg-[#2B3978]/20 hover:translate-x-2">
              Home
            </a>
            <a href="/about" className="text-white hover:text-[#5B77C8] transition-all duration-300 px-3 py-2 rounded-md text-base font-medium hover:bg-[#2B3978]/20 hover:translate-x-2">
              Mentors
            </a>
            <a href="/dsa" className="text-white hover:text-[#5B77C8] transition-all duration-300 px-3 py-2 rounded-md text-base font-medium hover:bg-[#2B3978]/20 hover:translate-x-2">
              Admin
            </a>
            <a href="/lld" className="text-white hover:text-[#5B77C8] transition-all duration-300 px-3 py-2 rounded-md text-base font-medium hover:bg-[#2B3978]/20 hover:translate-x-2">
              Ideas
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;






