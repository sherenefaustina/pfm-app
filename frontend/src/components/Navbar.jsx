// src/components/Navbar.jsx
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { AiFillHome } from 'react-icons/ai';
import { MdSpaceDashboard } from 'react-icons/md';
import { RiMoneyDollarCircleFill } from 'react-icons/ri';
//import { TbReportMoney } from 'react-icons/tb';
import { FaPiggyBank } from 'react-icons/fa';


const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
  { name: 'Home', path: '/', icon: <AiFillHome /> },
  { name: 'Dashboard', path: '/dashboard', icon: <MdSpaceDashboard /> },
  { name: 'Expenses', path: '/expenses', icon: <RiMoneyDollarCircleFill /> },
  //{ name: 'Budgeting', path: '/budgeting', icon: <TbReportMoney /> },//
  { name: 'Savings', path: '/savings', icon: <FaPiggyBank /> },
];


  return (
    <nav className="bg-gradient-to-r from-[#9933ff] to-[#ff00ff] shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-white hover:text-gray-100 transition duration-300"
        >
          PFM Pro
        </Link>

        {/* Desktop Nav */}
        <div className="space-x-6 hidden md:flex">
          {navItems.map((item) => (
  <Link
    key={item.name}
    to={item.path}
    className={`relative text-white transition duration-300 pb-1 flex items-center gap-2 ${
      location.pathname === item.path ? 'font-semibold' : ''
    } group`}
  >
    <span className="text-lg">{item.icon}</span>
    {item.name}
    <span
      className={`absolute left-0 bottom-0 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full ${
        location.pathname === item.path ? 'w-full' : ''
      }`}
    ></span>
  </Link>
))}

        </div>

        {/* Mobile Toggle Button */}
        <div className="md:hidden text-white text-2xl cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#9933ff] text-white px-4 py-4 space-y-4 shadow-lg">
          {navItems.map((item) => (
  <Link
    key={item.name}
    to={item.path}
    className={`block text-lg flex items-center gap-2 transition duration-300 ${
      location.pathname === item.path ? 'font-semibold underline' : ''
    }`}
    onClick={() => setIsOpen(false)}
  >
    <span className="text-xl">{item.icon}</span>
    {item.name}
  </Link>
))}

        </div>
      )}
    </nav>
  );
};

export default Navbar;
