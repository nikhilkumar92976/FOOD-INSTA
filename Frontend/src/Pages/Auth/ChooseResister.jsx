import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SiIfood } from "react-icons/si";
import { FaBurger } from "react-icons/fa6";

const ChooseRegister = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 border border-gray-800 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-gray-800 rounded-full animate-ping"></div>
        <div className="absolute bottom-32 left-1/4 w-16 h-16 border border-gray-800 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 right-1/3 w-20 h-20 border border-gray-800 rounded-full animate-pulse"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-float opacity-20"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-white rounded-full animate-float-delayed opacity-30"></div>
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-white rounded-full animate-float-slow opacity-25"></div>
      </div>

      {/* Navigation */}
      <nav className={`relative z-10 flex items-center justify-between p-6 lg:px-12 transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
        <div className="flex items-center space-x-2 group">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
            <span className="text-black font-bold text-lg"><SiIfood /></span>
          </div>
          <span className="text-xl font-bold transition-all duration-300 group-hover:text-gray-300">FoodInsta</span>
        </div>
        <button className="p-2 hover:bg-gray-900 rounded-lg transition-all duration-300 hover:scale-110 hover:rotate-90">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-start justify-center min-h-[calc(100vh-120px)] px-6 lg:px-12">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mb-16 w-full">
          <div className={`inline-flex items-center bg-gray-900 rounded-full px-4 py-2 mb-8 border border-gray-800 transition-all duration-1000 delay-300 ${isLoaded ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'} hover:bg-gray-800 hover:border-gray-700 hover:scale-105 cursor-pointer group`}>
            <span className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">🚀 Introducing FoodInsta Platform</span>
            <svg className="w-4 h-4 ml-2 text-gray-400 group-hover:text-white transition-all duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>

          <h1 className={`text-5xl lg:text-5xl font-bold mb-6 leading-tight transition-all duration-1000 delay-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <span className="inline-block animate-fade-in-up">From kitchen</span>
            <br />
            <span className="inline-block animate-fade-in-up">to couch</span>
            <br />
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent animate-gradient-x inline-block animate-fade-in-up-delayed">
              in minutes
            </span>
          </h1>

          <p className={`text-xl text-gray-400  max-w-2xl leading-relaxed transition-all duration-1000 delay-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            Connect with millions of food lovers or grow your restaurant business.
            Choose your path and start your journey with FoodInsta today.
          </p>
        </div>

          {/* CTA Buttons */}
        <div className={`flex flex-col sm:flex-row gap-4 w-full max-w-md transition-all duration-1000 delay-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <Link
            to="/user/register"
            className="flex-1 bg-white text-black px-8 py-4 rounded-xl font-semibold text-center transition-all duration-500 transform hover:scale-110 hover:shadow-2xl hover:shadow-white/20 hover:-translate-y-2 active:scale-95 group relative overflow-hidden"
          >
            <span className="relative z-10 group-hover:text-gray-800 transition-colors duration-300">Join as Customer</span>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </Link>
          <Link
            to="/foodpatner/register"
            className="flex-1 bg-transparent border-2 border-gray-800 text-white px-8 py-4 rounded-xl font-semibold text-center transition-all duration-500 transform hover:scale-110 hover:bg-gray-900 hover:border-gray-600 hover:shadow-2xl hover:shadow-gray-800/50 hover:-translate-y-2 active:scale-95 group relative overflow-hidden"
          >
            <span className="relative z-10 group-hover:text-gray-200 transition-colors duration-300">Partner with Us</span>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </Link>
        </div>

        {/* Sign In Link */}
        <div className={`mt-2 mb-5  text-center transition-all duration-1000 delay-1200 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <p className="text-gray-400 ml-15 ">
            Already have an account?{' '}
            <Link
              to="/user/login"
              className="text-white hover:text-gray-300 font-medium underline underline-offset-4 transition-all duration-300 hover:underline-offset-8 hover:decoration-2 relative group"
            >
              <span className="relative z-10">Sign in</span>
              <span className="absolute inset-0 bg-white/10 rounded px-2 py-1 scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></span>
            </Link>
          </p>
        </div>
      </div>

        {/* Trusted By Section */}
        <div className={`mb-16 text-center transition-all duration-1000 delay-900 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <p className="text-sm text-gray-500 mb-6 animate-fade-in">Trusted by companies and people working at</p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
            <div className="flex items-center space-x-2 hover:opacity-100 transition-all duration-300 hover:scale-110 cursor-pointer animate-slide-in-left" style={{animationDelay: '1s'}}>
              <div className="w-6 h-6 bg-yellow-600 rounded flex items-center justify-center animate-pulse">
                <span className="text-white text-xs font-bold">M</span>
              </div>
              <span className="text-sm font-medium">McDonald's</span>
            </div>
            <div className="flex items-center space-x-2 hover:opacity-100 transition-all duration-300 hover:scale-110 cursor-pointer animate-slide-in-left" style={{animationDelay: '1.1s'}}>
              <div className="w-6 h-6 bg-red-600 rounded flex items-center justify-center animate-pulse">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2L3 7v11h4v-6h6v6h4V7l-7-5z"/>
                </svg>
              </div>
              <span className="text-sm font-medium">KFC</span>
            </div>
            <div className="flex items-center space-x-2 hover:opacity-100 transition-all duration-300 hover:scale-110 cursor-pointer animate-slide-in-left" style={{animationDelay: '1.2s'}}>
              <div className="w-6 h-6 bg-green-600 rounded flex items-center justify-center animate-pulse">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                </svg>
              </div>
              <span className="text-sm font-medium">Subway</span>
            </div>
            <div className="flex items-center space-x-2 hover:opacity-100 transition-all duration-300 hover:scale-110 cursor-pointer animate-slide-in-left" style={{animationDelay: '1.3s'}}>
              <div className="w-6 h-6 bg-red-700 rounded-full flex items-center justify-center animate-pulse">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"/>
                </svg>
              </div>
              <span className="text-sm font-medium">Pizza Hut</span>
            </div>
            <div className="flex items-center space-x-2 hover:opacity-100 transition-all duration-300 hover:scale-110 cursor-pointer animate-slide-in-left" style={{animationDelay: '1.4s'}}>
              <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center animate-pulse">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <span className="text-sm font-medium">Domino's</span>
            </div>
          </div>
        </div>

      

       

      {/* Bottom Section */}
      <div className={`relative z-10 text-center pb-8 transition-all duration-1000 delay-1400 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <p className="text-sm text-gray-500 animate-pulse">
          Trusted by millions of users and partners worldwide
        </p>
        <p className="text-xs text-gray-600 mt-2 hover:text-gray-400 transition-colors duration-300">
          Get started with FoodInsta in minutes, not hours
        </p>
      </div>

      {/* Custom Styles */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }

        @keyframes gradient-x {
          0%, 100% { background-size: 200% 200%; background-position: left center; }
          50% { background-size: 200% 200%; background-position: right center; }
        }

        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fade-in-up-delayed {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 4s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 5s ease-in-out infinite; }
        .animate-gradient-x { animation: gradient-x 3s ease infinite; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out 0.5s both; }
        .animate-fade-in-up-delayed { animation: fade-in-up-delayed 0.8s ease-out 0.7s both; }
        .animate-slide-in-left { animation: slide-in-left 0.6s ease-out both; }
        .animate-fade-in { animation: fade-in 0.8s ease-out 0.9s both; }
      `}</style>
    </div>
  );
};

export default ChooseRegister;