import React from 'react';
import { ChevronRight } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white relative overflow-hidden">
      {/* Left Section - Content */}
      <div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-16 relative z-10">
        {/* Logo */}
        <div className="mb-16 relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg blur opacity-20"></div>
          <a href='/'>
          <img
            src="https://freelogopng.com/images/all_img/1659761100uber-logo-png.png"
            alt="RideX Logo"
            className="h-10 w-auto relative"
          />
        </a>
        </div>

        <div className="max-w-xl">
          <h1 className="text-4xl md:text-6xl font-bold text-black mb-6 tracking-tight">
            Your ride is just a{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              click away
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
            Experience the future of transportation. Fast, reliable, and comfortable rides at your fingertips.
          </p>
          <div className="flex items-center gap-4">
            <a href="/auth" className="bg-black text-white px-8 py-4 rounded-full text-lg hover:bg-gray-800 transition-all duration-300 flex items-center group shadow-lg hover:shadow-xl">
              Get Started 
              <ChevronRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
            </a>
            <button className="px-8 py-4 rounded-full text-lg text-gray-600 hover:text-gray-800 transition-all duration-300 flex items-center group border border-gray-200 hover:border-gray-300">
              Learn More
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-3 gap-8">
          {[
            { number: '10M+', label: 'Happy Riders' },
            { number: '500+', label: 'Cities' },
            { number: '24/7', label: 'Support' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl font-bold text-gray-800">{stat.number}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section - Image */}
      <div className="w-full md:w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-20"></div>
        <img
          src="https://images.unsplash.com/photo-1542210504-2409eb7928d2?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          //src='https://images.pexels.com/photos/950223/pexels-photo-950223.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          alt="Nighttime city street with lights"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default LandingPage;