import {
  FaApple,
  FaAndroid,
  FaArrowRight,
  FaTwitter,
  FaFacebook,
  FaEnvelope,
  FaInstagram,
  FaRegLightbulb,
  FaChartLine,
  FaPiggyBank,
  FaLightbulb,
  FaBullseye,
  FaCloud,
  FaHeadset,
  FaFileAlt,
  FaStar,
  FaQuoteLeft,
  FaLock,
  FaWallet,
} from "react-icons/fa";
import { FiZap } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify"; 
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import heroImg from "../assets/pfm-hero-new.png";
import laptopChart from "../assets/laptop-piechart.png";
import screen1 from "../assets/app-screen-1.png";
import screen2 from "../assets/app-screen-2.png";
import appStore from "../assets/app-store.png";
import googlePlay from "../assets/google-play.png";
import "aos/dist/aos.css";
import AOS from "aos";
import CountUp from "react-countup";
import React from 'react';
import worksImg from "../assets/works-img.png";




const testimonials = [
  {
    name: "Anjali M.",
    feedback: "PFM Pro made my monthly budgeting so easy! Love the UI and charts!",
  },
  {
    name: "Rahul K.",
    feedback: "I've finally started saving thanks to how intuitive this app is!",
  },
  {
    name: "Nisha R.",
    feedback: "This is the best budgeting tool I’ve used — sleek and super fast.",
  },
];

const Home = () => {
  const [showMoreFeatures, setShowMoreFeatures] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const features = [
    {
      title: "Smart Budgeting",
      desc: "Automate, plan, and stick to your budgets easily.",
      icon: <FaLightbulb className="text-[#9933ff] text-4xl animate-pulse" />,
    },
    {
      title: "Track Expenses",
      desc: "Visualize and monitor your spending in real-time.",
      icon: <FaChartLine className="text-[#9933ff] text-4xl animate-pulse" />,
    },
    {
      title: "Set Savings Goals",
      desc: "Define your targets and track progress steadily.",
      icon: <FaBullseye className="text-[#9933ff] text-4xl animate-pulse" />,
    },
    {
      title: "Financial Insights",
      desc: "Get personalized insights to grow your wealth.",
      icon: <FaPiggyBank className="text-[#9933ff] text-4xl animate-pulse" />,
    },
    // New Features
    {
      title: "Cloud Sync",
      desc: "Access your data from anywhere, securely synced.",
      icon: <FaCloud className="text-[#9933ff] text-4xl animate-pulse" />,
    },
    {
      title: "24/7 Support",
      desc: "Our team is here to help, anytime you need.",
      icon: <FaHeadset className="text-[#9933ff] text-4xl animate-pulse" />,
    },
    {
      title: "Detailed Reports",
      desc: "Export or view in-depth financial reports anytime.",
      icon: <FaFileAlt className="text-[#9933ff] text-4xl animate-pulse" />,
    },
    {
      title: "Smart Alerts",
      desc: "Stay notified on bills, goals, and spending spikes.",
      icon: <FaRegLightbulb className="text-[#9933ff] text-4xl animate-pulse" />,
    },
  ];


  const featuresToShow = showMoreFeatures ? features : features.slice(0, 4);

  return (
    <div className="text-gray-800 font-sans overflow-x-hidden relative">
      {/* Floating Action Button */}
      <Link
  to="/authpage"
  className="fixed bottom-6 right-6 bg-gradient-to-r from-[#9933ff] to-[#ff00ff] text-white px-5 py-3 rounded-full shadow-lg hover:scale-105 transition z-50"
>
  Get Started
</Link>

      {/* Hero Section */}
      <section id="home">
      <section className="min-h-[100vh] flex flex-col-reverse md:flex-row justify-center items-center text-center md:text-left bg-gradient-to-br from-[#fbe7ff] to-[#f3ccff] px-6 md:px-20 gap-10 pt-10">
        <div className="md:w-1/2 w-full">
          <p className="text-md md:text-lg text-[#ff00cc] font-medium mb-2 animate-fadeInDown">
            💰 Your Personal Finance Partner in One Tap
          </p>
          <h1
  className="text-4xl md:text-5xl font-bold mb-4 animate-fadeInDown bg-gradient-to-r from-[#9933ff] to-[#ff00ff] text-transparent bg-clip-text leading-[1.5]"
  style={{ paddingBottom: "10px" }}
>
  Take Charge of Your Finances Effortlessly
</h1>



          <p className="text-base md:text-lg text-gray-700 max-w-xl mb-6 animate-fadeInDown delay-75">
            Master your money, reach your goals, and enjoy financial peace — all in one smart app.
          </p>
          <button
  onClick={() => navigate('/authpage')}
  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-full shadow-lg hover:opacity-90 transition"
>
  Get Started
</button>

          <p className="text-[#9933ff] mb-2">Now available on mobile</p>
          <div className="flex gap-6 text-2xl md:text-3xl text-[#9933ff] animate-fadeInUp justify-center md:justify-start">
            <FaApple />
            <FaAndroid />
          </div>

          {/* Sleek Scrolling Ticker Bar */}
          <div className="w-full overflow-hidden bg-gradient-to-r from-[#9933ff] to-[#cc66ff] py-2 shadow-inner mt-6">
            <div className="whitespace-nowrap animate-scroll flex items-center gap-12 text-white font-medium text-sm tracking-wide px-6">
              <span>🚀 Over <strong>50,000 users</strong> love PFM Pro</span>
              <span>📊 Manage your money <strong>smarter than ever</strong></span>
              <span>🌱 Set goals, track growth, <strong>save big</strong></span>
              <span>💸 Zero effort. <strong>Max results</strong>.</span>
              <span>🔐 Your data is <strong>safe & private</strong></span>
            </div>
          </div>

          {/* Animated Stats */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-10 mt-8 text-[#9933ff] text-lg font-semibold">
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-bold">
                <CountUp end={50000} duration={2} separator="," />+
              </h3>
              <p className="text-sm text-gray-600">Active Users</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-bold">
                $<CountUp end={12000000} duration={2.5} separator="," />+
              </h3>
              <p className="text-sm text-gray-600">Money Managed</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-bold">
                <CountUp end={4.9} decimals={1} duration={1.5} />★
              </h3>
              <p className="text-sm text-gray-600">App Rating</p>
            </div>
          </div>
        </div>

        <div className="md:w-1/2 w-full flex justify-center items-center relative" data-aos="fade-left">
          <div className="absolute -top-8 -right-8 w-64 h-64 bg-gradient-to-br from-[#f3ccff] to-[#fbe7ff] rounded-full opacity-40 blur-2xl z-0"></div>
          <img src={heroImg} alt="PFM Preview" className="w-full max-w-md animate-float relative z-10" />
        </div>
      </section>
      </section>

      

      {/* Feature Highlights */}
      <section className="bg-gray-100 py-24 px-6 md:px-20" data-aos="fade-up">
  <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-[#9933ff] to-[#ff00ff] text-transparent bg-clip-text">
    Why Choose PFM Pro?
  </h2>

  <div className="grid md:grid-cols-3 gap-12">
    {[
      {
        title: "Smart Budgeting",
        description: "Track expenses easily with intelligent budgeting tools that help you stay in control of your finances every day.",
      },
      {
        title: "Instant Insights",
        description: "Visualize your income, spending, and trends in real-time with beautiful charts and graphs.",
      },
      {
        title: "Bank-level Security",
        description: "Your data is encrypted and protected with top-notch privacy settings, ensuring peace of mind.",
      },
    ].map((benefit, idx) => (
      <div key={idx} className="relative group w-full max-w-sm mx-auto">
        {/* Hidden Card */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[90%] bg-white border border-gray-200 p-5 rounded-md opacity-0 group-hover:opacity-100 group-hover:-translate-y-32 transition-all duration-700 shadow-xl z-30">
          <h3 className="text-md font-bold text-purple-800 mb-2">{benefit.title}</h3>
          <p className="text-sm text-gray-700 leading-snug">{benefit.description}</p>
        </div>

        {/* Envelope */}
        

        <div className="relative w-full h-48 bg-[#f5f0ff] rounded-b-xl border border-purple-200 shadow-md overflow-hidden z-10">
          {/* Diagonal Flap */}
          <div className="absolute top-0 left-0 w-full h-24 bg-[#d8c4ff] rounded-tr-[100%] transform origin-top group-hover:-rotate-45 transition-transform duration-500 ease-in-out z-20" />

          {/* Bottom of Envelope with Label */}
          <div className="absolute bottom-0 w-full h-20 bg-[#e7dcfd] rounded-b-xl flex items-center justify-center z-20">
            <span className="text-purple-800 text-sm font-semibold uppercase flex items-center gap-2 animate-glow">
              <FiZap className="text-base" />
              {benefit.title}
            </span>
          </div>
        </div>
      </div>
    ))}
  </div>
  </section>

      {/* SVG Divider */}
      <div className="-mt-1 overflow-hidden relative">
  <svg
    viewBox="0 0 1440 320"
    className="w-full h-[140px] rotate-180"
    preserveAspectRatio="none"
  >
    <path
      fill="#fbe7ff"
      fillOpacity="1"
      d="M0,64L60,74.7C120,85,240,107,360,117.3C480,128,600,128,720,117.3C840,107,960,85,1080,96C1200,107,1320,149,1380,170.7L1440,192V320H1380C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320H0Z"
    />
    <path
      fill="#f3d9ff"
      fillOpacity="0.8"
      d="M0,192L60,176C120,160,240,128,360,133.3C480,139,600,181,720,181.3C840,181,960,139,1080,133.3C1200,128,1320,160,1380,176L1440,192V320H1380C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320H0Z"
    />
  </svg>
</div>



      {/* How it Works */}
      <section id="how-it-works">
<section className="bg-white py-16 px-6 md:px-20" data-aos="fade-up" id="how-it-works">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-[#9933ff] to-[#ff00ff] text-transparent bg-clip-text">
      How It Works
    </h2>

    <div className="flex flex-col-reverse lg:flex-row items-center gap-10">

      
      {/* Image */}
      <div className="w-full md:w-1/2 flex justify-center relative z-10 md:-ml-6">
        <img
          src={worksImg} // replace with your new image import variable
          alt="App Preview"
          className="w-full max-w-md animate-float"
        />
      </div>

    
      {/* Steps */}
      <div className="lg:w-1/2 grid md:grid-cols-1 gap-6">
        {[{
          title: "1. Create Your Budget",
          desc: "Easily set monthly budgets based on your income and spending habits.",
          icon: <FaRegLightbulb className="text-[#9933ff] text-4xl mb-2" />,
        },
        {
          title: "2. Track in Real-Time",
          desc: "Automatically categorize expenses and monitor spending live.",
          icon: <FaChartLine className="text-[#9933ff] text-4xl mb-2" />,
        },
        {
          title: "3. Save Smarter",
          desc: "Set savings goals and visualize your progress beautifully.",
          icon: <FaPiggyBank className="text-[#9933ff] text-4xl mb-2" />,
        }].map((item, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-[#fbe7ff] to-[#f3ccff] rounded-xl p-6 shadow hover:shadow-lg transition text-center"
            data-aos="fade-up"
            data-aos-delay={index * 150}
          >
            <div className="flex justify-center">{item.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-[#9933ff]">{item.title}</h3>
            <p className="text-gray-700">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>
</section>



            {/* Features */}
            <section id="features">

<section className="bg-gradient-to-br from-[#fbe7ff] to-[#f3ccff] py-16 px-6 md:px-20 text-center" data-aos="fade-up">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-[#9933ff] to-[#ff00ff] text-transparent bg-clip-text mb-12">
          What You Get
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuresToShow.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center border border-[#f3ccff]"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="font-semibold text-lg bg-gradient-to-r from-[#9933ff] to-[#ff00ff] text-transparent bg-clip-text mb-1">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>

        <button
          className="mt-12 px-6 py-2 border-2 border-[#9933ff] text-[#9933ff] font-medium rounded-full transition-all duration-500 ease-in-out hover:bg-gradient-to-r hover:from-[#9933ff] hover:to-[#ff00ff] hover:text-white hover:shadow-lg hover:scale-105"
          onClick={() => setShowMoreFeatures(!showMoreFeatures)}
        >
          {showMoreFeatures ? "Show Less" : "Explore More"}
        </button>
      </section>
      </section>


      {/* App Preview */}
      <section className="bg-white py-20 px-6 md:px-20 text-center" data-aos="fade-up">
  <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#9933ff] to-[#ff00ff] text-transparent bg-clip-text mb-4">
    Take Control from Anywhere
  </h2>
  <p className="text-gray-600 mb-10 text-base md:text-lg">
    Experience PFM Pro on any device – seamless, intuitive and always with you.
  </p>

  {/* Device Cards with Hover Descriptions */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 justify-center items-start">
    {[
      {
        label: "Laptop Dashboard",
        src: laptopChart,
        desc: "Visualize your finances on a big screen with advanced analytics and reports.",
      },
      {
        label: "Mobile Overview",
        src: screen1,
        desc: "Track budgets, savings, and expenses anytime, anywhere — in your pocket.",
      },
      {
        label: "Smart App Login",
        src: screen2,
        desc: "Enjoy a secure and seamless login experience with facial or fingerprint unlock.",
      },
    ].map((item, index) => (
      <div
        key={index}
        className="group relative bg-white border border-[#f3ccff] rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden hover:scale-[1.03] backdrop-blur-md"
        data-aos="zoom-in"
        data-aos-delay={index * 150}
      >
        {/* Glowing Gradient Backdrop */}
        <div className="absolute -inset-1 bg-gradient-to-br from-[#fbe7ff] to-[#f3ccff] blur-xl opacity-60 group-hover:opacity-100 transition-all duration-500 pointer-events-none z-0" />

        {/* Card Content */}
        <div className="relative z-10 p-6 flex flex-col items-center">
          <img
            src={item.src}
            alt={item.label}
            className="w-40 h-auto mb-6 object-contain drop-shadow-md transition-transform duration-500"
          />
          <p className="text-[#9933ff] font-semibold mb-4 text-base md:text-lg">
            {item.label}
          </p>
        </div>

        {/* Hover Slide-in Description */}
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-r from-[#9933ff] to-[#ff00ff] text-white text-sm px-4 py-3 transform translate-y-full group-hover:translate-y-0 transition-all duration-500 ease-in-out z-20 shadow-md rounded-b-3xl">
          {item.desc}
        </div>
      </div>
    ))}
  </div>

  {/* App Store Buttons */}
  <div className="flex justify-center gap-6 mt-12 flex-wrap">
    <img
      src={appStore}
      alt="App Store"
      className="w-32 hover:scale-110 transition-all duration-300 cursor-pointer drop-shadow-lg"
    />
    <img
      src={googlePlay}
      alt="Google Play"
      className="w-32 hover:scale-110 transition-all duration-300 cursor-pointer drop-shadow-lg"
    />
  </div>
</section>

      
{/* Testimonials */}
<section
  className="bg-gradient-to-r from-[#fbe7ff] to-[#f3ccff] py-20 px-6 text-center overflow-hidden"
  data-aos="fade-up"
>
  <h2 className="text-3xl md:text-4xl font-bold mb-12 bg-gradient-to-r from-[#9933ff] to-[#ff00ff] text-transparent bg-clip-text">
    What Our Users Say
  </h2>

  {/* Auto-scrolling testimonials */}
  <div className="relative overflow-hidden">
    <div className="flex gap-8 animate-scroll-x px-4 w-max">
      {[
        {
          name: "Anjali M.",
          feedback: "PFM Pro made my monthly budgeting so easy! Love the UI and charts!",
          rating: 5,
          image: "https://randomuser.me/api/portraits/women/65.jpg",
        },
        {
          name: "Rahul K.",
          feedback: "I've finally started saving thanks to how intuitive this app is!",
          rating: 4,
          image: "https://randomuser.me/api/portraits/men/44.jpg",
        },
        {
          name: "Nisha R.",
          feedback: "This is the best budgeting tool I’ve used — sleek and super fast.",
          rating: 5,
          image: "https://randomuser.me/api/portraits/women/75.jpg",
        },
        {
          name: "Karthik D.",
          feedback: "Love how clean and simple it is. Been tracking all my expenses easily!",
          rating: 4,
          image: "https://randomuser.me/api/portraits/men/34.jpg",
        },
        {
          name: "Annie S.",
          feedback: "Such a visually appealing app. My savings journey finally makes sense!",
          rating: 5,
          image: "https://randomuser.me/api/portraits/women/50.jpg",
        },
        {
          name: "Arjun V.",
          feedback: "This is the personal finance buddy I didn’t know I needed!",
          rating: 4,
          image: "https://randomuser.me/api/portraits/men/22.jpg",
        },
      ].map((t, i) => (
        <div
          key={i}
          className="min-w-[300px] max-w-sm w-full bg-white bg-opacity-60 backdrop-blur-lg border border-[#f3ccff] rounded-2xl p-6 shadow-xl transition-all hover:scale-105 hover:border-[#9933ff] relative"
          data-aos="fade-up"
          data-aos-delay={i * 100}
        >
          {/* Avatar */}
          <img
            src={t.image}
            alt={t.name}
            className="w-16 h-16 rounded-full mx-auto mb-4 border-4 border-[#9933ff] shadow-lg"
          />

          {/* Quote Icon */}
          <div className="flex justify-center mb-4">
            <FaQuoteLeft className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#9933ff] to-[#ff00ff] drop-shadow-md animate-pulse" />
          </div>

          {/* Feedback */}
          <p className="text-gray-800 text-base mb-4 leading-relaxed">{t.feedback}</p>

          {/* Star Rating */}
          <div className="flex justify-center text-[#ffcc00] mb-2">
            {Array(t.rating)
              .fill()
              .map((_, index) => (
                <FaStar key={index} />
              ))}
          </div>

          {/* User Name */}
          <h4 className="font-bold text-[#9933ff]">- {t.name}</h4>
        </div>
      ))}
    </div>
  </div>

  {/* Write a Review */}
  <div className="mt-16 bg-white bg-opacity-60 backdrop-blur-md p-8 rounded-xl border border-[#f3ccff] max-w-xl mx-auto shadow-md">
    <h3 className="text-2xl font-bold mb-6 text-[#9933ff]">Write a Review</h3>
    <form
      className="space-y-4 text-left"
      onSubmit={(e) => {
        e.preventDefault();
        toast.success("Thanks for your review!");
        e.target.reset(); // clear the form
      }}
    >
      <input
        type="text"
        placeholder="Your Name"
        required
        className="w-full p-3 rounded-md border border-[#ddd] focus:outline-none focus:ring-2 focus:ring-[#9933ff]"
      />
      <input
        type="url"
        placeholder="Your Photo URL (optional)"
        className="w-full p-3 rounded-md border border-[#ddd] focus:outline-none focus:ring-2 focus:ring-[#9933ff]"
      />
      <textarea
        rows="3"
        placeholder="Your Feedback"
        required
        className="w-full p-3 rounded-md border border-[#ddd] focus:outline-none focus:ring-2 focus:ring-[#9933ff]"
      />
      <div className="flex justify-center mt-6">
  <button
    type="submit"
    className="bg-gradient-to-r from-[#9933ff] to-[#ff00ff] text-white font-semibold py-3 px-6 rounded-full hover:scale-105 transition-all duration-300"
  >
    Submit Review
  </button>
</div>

    </form>
  </div>
</section>


      {/* CTA Section */}
      <section
  className="bg-gradient-to-r from-[#9933ff] to-[#ff00ff] text-white py-20 px-4 text-center relative overflow-hidden"
  data-aos="fade-up"
>
  {/* Glow or Animated Overlay Optional Later */}

  <motion.h2
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="text-3xl md:text-4xl font-bold mb-6 drop-shadow-lg"
>
  Ready to <span className="text-white">Budget Like a Pro?</span>
</motion.h2>

<Link to="/authpage"> {/* <-- Replace '/auth' with your actual route for AuthPage.jsx */}
  <motion.button
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    className="bg-white text-[#9933ff] px-8 py-3 font-semibold rounded-full shadow-lg hover:shadow-[#ff00ff] hover:bg-purple-100 transition-all duration-300 inline-flex items-center justify-center gap-2"
  >
    Sign Up Free <FaArrowRight />
  </motion.button>
</Link>

</section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-[#9933ff] to-[#ff00ff] text-white px-6 md:px-20 py-14 relative z-10">
  <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
    {/* Brand Section */}
    <div>
      <h3 className="text-2xl font-extrabold mb-3 tracking-wide">PFM Pro</h3>
      <p className="text-sm leading-relaxed text-white/90">
        Budget well. Live smart. Do good.
      </p>
      <div className="flex gap-4 text-xl mt-4">
        <a href="#" className="hover:scale-110 transition" title="Facebook"><FaFacebook /></a>
        <a href="#" className="hover:scale-110 transition" title="Twitter"><FaTwitter /></a>
        <a href="#" className="hover:scale-110 transition" title="Email"><FaEnvelope /></a>
        <a href="#" className="hover:scale-110 transition" title="Instagram"><FaInstagram /></a>
      </div>
    </div>

    {/* Explore */}
    <div>
      <h4 className="text-lg font-semibold mb-3 border-b border-white/30 pb-1 w-fit">Explore</h4>
      <ul className="space-y-2 text-sm">
        <li>
          <a href="#home" className="hover:text-gray-200 transition cursor-pointer">Home</a>
        </li>
        <li>
          <a href="#how-it-works" className="hover:text-gray-200 transition cursor-pointer">How It Works</a>
        </li>
        <li>
          <a href="#features" className="hover:text-gray-200 transition cursor-pointer">Features</a>
        </li>
      </ul>
    </div>

    {/* Get Started */}
    <div>
      <h4 className="text-lg font-semibold mb-3 border-b border-white/30 pb-1 w-fit">Get Started</h4>
      <ul className="space-y-2 text-sm">
        <li>
      <Link to="/authpage" className="text-white hover:underline">Signup</Link>
    </li>
        <li className="hover:text-gray-200 transition cursor-pointer">Pricing</li>
        <li className="hover:text-gray-200 transition cursor-pointer">Download</li>
      </ul>
    </div>

    {/* Help */}
    <div>
      <h4 className="text-lg font-semibold mb-3 border-b border-white/30 pb-1 w-fit">Help</h4>
      <ul className="space-y-2 text-sm">
        <li className="hover:text-gray-200 transition cursor-pointer">FAQs</li>
        <li className="hover:text-gray-200 transition cursor-pointer">Support</li>
        <li className="hover:text-gray-200 transition cursor-pointer">Contact</li>
      </ul>
    </div>
  </div>
</footer>


      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default Home;
