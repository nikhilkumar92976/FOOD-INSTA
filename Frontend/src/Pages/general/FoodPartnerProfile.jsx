import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Add custom animations matching UserProfile
const styles = `
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
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

const FoodPartnerProfile = () => {
  const [partner, setPartner] = useState(null);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [videoErrors, setVideoErrors] = useState(new Set());
  const navigate = useNavigate();

  // Fetch food partner profile and their foods
  const fetchPartnerData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch food partner profile data
      console.log('Fetching food partner profile...');
      const profileResponse = await fetch('https://food-insta-3.onrender.com/api/auth/profile/foodpatner', {
        credentials: 'include' // Include cookies for authentication
      });

      if (!profileResponse.ok) {
        throw new Error(`Failed to fetch profile: ${profileResponse.status} ${profileResponse.statusText}`);
      }

      const profileData = await profileResponse.json();
      console.log('Profile API response:', profileData);

      // Fetch foods from API - specific to this food partner
      console.log('Fetching foods from API...');
      const foodsResponse = await fetch('https://food-insta-3.onrender.com/api/food/getfood', {
        credentials: 'include' // Include cookies for authentication
      });

      console.log('Foods response status:', foodsResponse.status);

      if (!foodsResponse.ok) {
        const errorText = await foodsResponse.text();
        console.error('Foods API Error Response:', errorText);
        throw new Error(`Failed to fetch foods: ${foodsResponse.status} ${foodsResponse.statusText}`);
      }

      const foodsData = await foodsResponse.json();
      console.log('Foods API response:', foodsData);
      console.log('Foods array from API:', foodsData.food);

      // Ensure foodsData is an array - the API returns { message, food: [...] }
      const foodsArray = Array.isArray(foodsData) ? foodsData :
                        (foodsData.food && Array.isArray(foodsData.food)) ? foodsData.food :
                        (foodsData.foods && Array.isArray(foodsData.foods)) ? foodsData.foods :
                        [];

      console.log('Processed foods array:', foodsArray);
      console.log('Number of foods found:', foodsArray.length);

      // Debug: Also check all foods to see if any exist
      try {
        const allFoodsResponse = await fetch('https://food-insta-3.onrender.com/api/food', {
          credentials: 'include'
        });
        if (allFoodsResponse.ok) {
          const allFoodsData = await allFoodsResponse.json();
          console.log('All foods in database:', allFoodsData);
        }
      } catch (debugError) {
        console.log('Debug fetch failed:', debugError);
      }

      // Use real partner data from API
      const realPartner = {
        name: profileData.user.name,
        email: profileData.user.email,
        contact: profileData.user.contact,
        address: profileData.user.address,
        totalPosts: foodsArray.length,
        totalFollowers: "12.5K", // You can add this to backend later
        totalFollowing: 156, // You can add this to backend later
        bio: `Serving delicious food since ${new Date(profileData.user.createdAt).getFullYear()} 🍽️`,
        id: profileData.user.id,
        createdAt: profileData.user.createdAt
      };

      console.log('Real partner data:', realPartner);
      setPartner(realPartner);
      setFoods(foodsArray);
      console.log('Foods set to state:', foodsArray);
      console.log('✅ Partner data loaded successfully');
    } catch (err) {
      console.error("❌ Failed to fetch partner data:", err);
      console.error("Error details:", err.message);
      console.error("Stack trace:", err.stack);
      setError(err.message);
      setFoods([]); // Ensure foods is always an array
    } finally {
      console.log('🔄 Setting loading to false');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartnerData();
  }, []);

  // Listen for focus event to refresh data when returning to page
  useEffect(() => {
    const handleFocus = () => {
      fetchPartnerData();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  const handleCreateFood = () => {
    // Navigate to create food page
    navigate('/create-food');
  };

  const handleVideoClick = (food) => {
    console.log('Playing video:', food.name);
    console.log('Video URL:', food.video);
    // Navigate to dedicated video player page
    navigate(`/video/${food._id || food.id}`);
  };



  const handleVideoError = (foodId) => {
    setVideoErrors(prev => new Set([...prev, foodId]));
  };

  const goBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading profile...</div>
        <div className="text-gray-400 text-sm mt-2">
          Check console for loading details
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">Error: {error}</div>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!partner) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-yellow-500 text-xl mb-4">No partner data found</div>
          <div className="text-gray-400 text-sm mb-4">
            Partner data: {JSON.stringify(partner)}
          </div>
          <button
            onClick={fetchPartnerData}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Retry Loading
          </button>
        </div>
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
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <button onClick={goBack} className="text-white hover:text-blue-400 transition-all duration-300 hover:scale-105 group">
              <svg className="w-6 h-6 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">{partner?.name}</h1>
              <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div className="w-32"></div> {/* Spacer for centering */}
        </div>
      </div>

      {/* Profile Section */}
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
                  <span className="text-2xl font-bold text-gray-300 group-hover:text-blue-400 transition-colors duration-300">
                    {partner?.name?.charAt(0)?.toUpperCase()}
                  </span>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full opacity-0 group-hover:opacity-20 blur transition-opacity duration-500"></div>
                {/* Verified Badge */}
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-4 border-black flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent animate-fade-in-right">{partner?.name}</h2>
                <p className="text-gray-300 text-lg mb-1 animate-fade-in-right animation-delay-200">Food Partner</p>
                <div className="flex items-center gap-4 animate-fade-in-right animation-delay-400">
                  <div className="text-center">
                    <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                      {partner?.totalPosts || foods.length}
                    </div>
                    <div className="text-gray-400 text-sm">Food Items</div>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30 animate-pulse">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-ping"></div>
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Business Information */}
              <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-500 hover:scale-105 hover:shadow-2xl group animate-fade-in-up animation-delay-600">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-white group-hover:text-blue-400 transition-colors duration-300">
                  <svg className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a2 2 0 104 0 2 2 0 00-4 0zm6 0a2 2 0 104 0 2 2 0 00-4 0z" clipRule="evenodd" />
                  </svg>
                  Business Information
                </h3>
                <div className="space-y-4">
                  <div className="group/item hover:bg-gray-800/50 p-3 rounded-lg transition-all duration-300">
                    <label className="text-gray-400 text-sm group-hover/item:text-gray-300 transition-colors duration-300">Business Name</label>
                    <p className="text-white font-medium group-hover/item:text-blue-300 transition-colors duration-300">{partner?.name}</p>
                  </div>
                  <div className="group/item hover:bg-gray-800/50 p-3 rounded-lg transition-all duration-300">
                    <label className="text-gray-400 text-sm group-hover/item:text-gray-300 transition-colors duration-300">Contact Person</label>
                    <p className="text-white font-medium group-hover/item:text-blue-300 transition-colors duration-300">{partner?.contact}</p>
                  </div>
                  <div className="group/item hover:bg-gray-800/50 p-3 rounded-lg transition-all duration-300">
                    <label className="text-gray-400 text-sm group-hover/item:text-gray-300 transition-colors duration-300">Business Location</label>
                    <p className="text-white font-medium group-hover/item:text-blue-300 transition-colors duration-300">{partner?.address}</p>
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
                    <label className="text-gray-400 text-sm group-hover/item:text-gray-300 transition-colors duration-300">Email Address</label>
                    <p className="text-white font-medium group-hover/item:text-green-300 transition-colors duration-300">{partner?.email}</p>
                  </div>
                  <div className="group/item hover:bg-gray-800/50 p-3 rounded-lg transition-all duration-300">
                    <label className="text-gray-400 text-sm group-hover/item:text-gray-300 transition-colors duration-300">Partner ID</label>
                    <p className="text-white font-medium font-mono text-sm group-hover/item:text-green-300 transition-colors duration-300">{partner?._id}</p>
                  </div>
                  <div className="group/item hover:bg-gray-800/50 p-3 rounded-lg transition-all duration-300">
                    <label className="text-gray-400 text-sm group-hover/item:text-gray-300 transition-colors duration-300">Account Status</label>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30 animate-pulse">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-ping"></div>
                      Active Partner
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-8 flex justify-center animate-fade-in-up animation-delay-1000">
              <button
                onClick={handleCreateFood}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-500/25 hover:scale-105 group border border-blue-500/30"
              >
                <svg className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span className="group-hover:translate-x-1 transition-transform duration-300">Create New Food</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Food Videos Grid Section */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 pb-8">
        <div className="bg-black/60 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-gray-800">
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-700 bg-gray-900/50">
            <button className="flex-1 py-4 text-center border-b-2 border-blue-500 bg-blue-500/10">
              <svg className="w-6 h-6 mx-auto text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zM4 16h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z"/>
              </svg>
            </button>
          </div>

          {/* Food Videos Grid */}
          <div className="p-4">
            <div className="grid grid-cols-3 gap-4">
        {Array.isArray(foods) && foods.length > 0 ? foods.map((food) => {
          const hasVideoError = videoErrors.has(food._id || food.id);

          return (
            <div
              key={food._id || food.id}
              onClick={() => handleVideoClick(food)}
              className="aspect-square bg-gray-800 relative cursor-pointer group overflow-hidden"
            >
              {!hasVideoError ? (
                /* Video element with poster frame */
                <video
                  src={food.video}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  muted
                  preload="metadata"
                  poster="" // This will show the first frame
                  onLoadedMetadata={(e) => {
                    // Set the video to show first frame as thumbnail
                    e.target.currentTime = 0.1;
                  }}
                  onError={(e) => {
                    console.error('Video load error for:', food.name, 'URL:', food.video, 'Error:', e);
                    handleVideoError(food._id || food.id);
                  }}
                  onLoadStart={() => {
                    console.log('Video loading started for:', food.name, 'URL:', food.video);
                  }}
                />
              ) : (
                /* Fallback for failed videos */
                <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <p className="text-xs">Video Error</p>
                  </div>
                </div>
              )}

            {/* Play button overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
              <div className="w-12 h-12 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>

            {/* Hover effect */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300"></div>

            {/* Food name */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
              <p className="text-white text-xs font-medium truncate">{food.name}</p>
            </div>

            {/* Video indicator */}
            <div className="absolute top-2 right-2">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
              </svg>
            </div>
          </div>
        );
        }) : (
          <div className="col-span-3 text-center py-8">
            <p className="text-gray-400">No food items found</p>
            <p className="text-gray-500 text-sm mt-2">Create your first food item to get started!</p>
          </div>
        )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerProfile;
 