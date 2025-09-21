import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Add custom animations
const customStyles = `
  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fade-in-right {
    from {
      opacity: 0;
      transform: translateX(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes gradient-x {
    0%, 100% {
      transform: translateX(-100%);
    }
    50% {
      transform: translateX(100%);
    }
  }

  .animate-fade-in-up {
    animation: fade-in-up 0.8s ease-out forwards;
  }

  .animate-fade-in-right {
    animation: fade-in-right 0.8s ease-out forwards;
  }

  .animate-gradient-x {
    animation: gradient-x 3s ease-in-out infinite;
  }

  .animation-delay-200 {
    animation-delay: 0.2s;
  }

  .animation-delay-400 {
    animation-delay: 0.4s;
  }

  .animation-delay-600 {
    animation-delay: 0.6s;
  }

  .animation-delay-800 {
    animation-delay: 0.8s;
  }

  .animation-delay-1000 {
    animation-delay: 1s;
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = customStyles;
  document.head.appendChild(styleSheet);
}

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/auth/profile", {
          method: "GET",
          credentials: "include", // important for cookies
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data = await response.json();
        setUser(data.user);
      } catch (err) {
        console.error("Profile fetch failed:", err);
        setError(err.message);
        // If unauthorized, redirect to login
        if (err.message.includes('401') || err.message.includes('Unauthorized')) {
          navigate("/user/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  // Logout function
  const logout = async () => {
    try {
      // Call backend logout
      await fetch("http://localhost:3000/api/auth/logout", {
        method: "GET",
        credentials: "include", // important if using cookies
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Clear token or session from localStorage
      localStorage.removeItem("authToken");

      // Redirect to login
      navigate("/user/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // Go back to home
  const goToHome = () => {
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-red-500 text-xl">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)] animate-pulse"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-20 right-20 w-1 h-1 bg-blue-400 rounded-full animate-pulse animation-delay-200"></div>
          <div className="absolute bottom-20 left-20 w-1 h-1 bg-purple-400 rounded-full animate-pulse animation-delay-400"></div>
          <div className="absolute bottom-10 right-10 w-2 h-2 bg-white rounded-full animate-pulse animation-delay-600"></div>
        </div>
      </div>

      {/* Header */}
      <div className="relative z-10 bg-black/80 backdrop-blur-sm border-b border-gray-800 shadow-2xl">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={goToHome}
            className="flex items-center gap-2 text-white hover:text-blue-400 transition-all duration-300 hover:scale-105 group"
          >
            <svg className="w-6 h-6 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">Back to Home</span>
          </button>
          {/* <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent animate-pulse">My Profile</h1> */}
          <div className="w-32"></div> {/* Spacer for centering */}
        </div>
      </div>

      {/* Profile Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        <div className="bg-black/60 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-gray-800 animate-fade-in-up">
          {/* Profile Header */}
          <div className="relative bg-gradient-to-r from-gray-900 via-black to-gray-900 px-6 py-8 overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-gradient-x"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-pulse"></div>

            <div className="relative flex items-center gap-6">
              {/* Profile Avatar */}
              <div className="relative group">
                <div className="w-24 h-24 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center shadow-2xl border-2 border-gray-600 group-hover:border-blue-500 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                  <svg className="w-12 h-12 text-gray-300 group-hover:text-blue-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full opacity-0 group-hover:opacity-20 blur transition-opacity duration-500"></div>
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent animate-fade-in-right">{user?.fullname}</h2>
                <p className="text-gray-300 text-lg mb-1 animate-fade-in-right animation-delay-200">{user?.email}</p>
                <p className="text-gray-400 text-sm animate-fade-in-right animation-delay-400">
                  Member since {new Date(user?.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-500 hover:scale-105 hover:shadow-2xl group animate-fade-in-up animation-delay-600">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-white group-hover:text-blue-400 transition-colors duration-300">
                  <svg className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  Personal Information
                </h3>
                <div className="space-y-4">
                  <div className="group/item hover:bg-gray-800/50 p-3 rounded-lg transition-all duration-300">
                    <label className="text-gray-400 text-sm group-hover/item:text-gray-300 transition-colors duration-300">Full Name</label>
                    <p className="text-white font-medium group-hover/item:text-blue-300 transition-colors duration-300">{user?.fullname}</p>
                  </div>
                  <div className="group/item hover:bg-gray-800/50 p-3 rounded-lg transition-all duration-300">
                    <label className="text-gray-400 text-sm group-hover/item:text-gray-300 transition-colors duration-300">Email Address</label>
                    <p className="text-white font-medium group-hover/item:text-blue-300 transition-colors duration-300">{user?.email}</p>
                  </div>
                  <div className="group/item hover:bg-gray-800/50 p-3 rounded-lg transition-all duration-300">
                    <label className="text-gray-400 text-sm group-hover/item:text-gray-300 transition-colors duration-300">User ID</label>
                    <p className="text-white font-medium font-mono text-sm group-hover/item:text-blue-300 transition-colors duration-300">{user?.id}</p>
                  </div>
                </div>
              </div>

              {/* Account Information */}
              <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-500 hover:scale-105 hover:shadow-2xl group animate-fade-in-up animation-delay-800">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-white group-hover:text-green-400 transition-colors duration-300">
                  <svg className="w-5 h-5 text-green-400 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  Account Information
                </h3>
                <div className="space-y-4">
                  <div className="group/item hover:bg-gray-800/50 p-3 rounded-lg transition-all duration-300">
                    <label className="text-gray-400 text-sm group-hover/item:text-gray-300 transition-colors duration-300">Account Created</label>
                    <p className="text-white font-medium group-hover/item:text-green-300 transition-colors duration-300">
                      {new Date(user?.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className="group/item hover:bg-gray-800/50 p-3 rounded-lg transition-all duration-300">
                    <label className="text-gray-400 text-sm group-hover/item:text-gray-300 transition-colors duration-300">Last Updated</label>
                    <p className="text-white font-medium group-hover/item:text-green-300 transition-colors duration-300">
                      {new Date(user?.updatedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className="group/item hover:bg-gray-800/50 p-3 rounded-lg transition-all duration-300">
                    <label className="text-gray-400 text-sm group-hover/item:text-gray-300 transition-colors duration-300">Account Status</label>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30 animate-pulse">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-ping"></div>
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-1000">
              <button
                onClick={goToHome}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-500/25 hover:scale-105 group border border-blue-500/30"
              >
                <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="group-hover:translate-x-1 transition-transform duration-300">Back to Home</span>
              </button>

              <button
                onClick={logout}
                className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-red-500/25 hover:scale-105 group border border-red-500/30"
              >
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="group-hover:translate-x-1 transition-transform duration-300">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
