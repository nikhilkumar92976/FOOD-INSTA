import React, { useState, useEffect, useRef } from 'react';

const VideoReels = ({ goToProfile }) => {
  const [videos, setVideos] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likedVideos, setLikedVideos] = useState(new Set());
  const videoRefs = useRef([]);
  const containerRef = useRef(null);

  // Fetch videos from API
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3000/api/food');

        if (!response.ok) {
          throw new Error('Failed to fetch videos');
        }

        const data = await response.json();
        console.log('API Response:', data); // Debug log

        // Handle different API response formats
        let videosArray = [];
        if (Array.isArray(data)) {
          videosArray = data;
        } else if (data.videos && Array.isArray(data.videos)) {
          videosArray = data.videos;
        } else if (data.data && Array.isArray(data.data)) {
          videosArray = data.data;
        } else if (data.foods && Array.isArray(data.foods)) {
          videosArray = data.foods;
        } else if (data.food && Array.isArray(data.food)) {
          videosArray = data.food;
        } else {
          console.error('Unexpected API response format:', data);
          throw new Error('Invalid API response format');
        }

        setVideos(videosArray);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching videos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // Handle video play/pause when scrolling
  useEffect(() => {
    if (videos.length === 0) return;

    console.log(`Playing video ${currentVideoIndex + 1} of ${videos.length}`);
    const currentVideo = videoRefs.current[currentVideoIndex];
    if (currentVideo) {
      currentVideo.play().catch(console.error);
    }

    // Pause other videos
    videoRefs.current.forEach((video, index) => {
      if (video && index !== currentVideoIndex) {
        video.pause();
      }
    });
  }, [currentVideoIndex, videos.length]);

  // Handle scroll to next/previous video with infinite loop
  const handleScroll = (direction) => {
    console.log(`Scrolling ${direction}, current: ${currentVideoIndex}, total: ${videos.length}`);

    if (direction === 'up') {
      if (currentVideoIndex > 0) {
        setCurrentVideoIndex(currentVideoIndex - 1);
      } else {
        // Loop to last video when at first video
        console.log('Looping to last video');
        setCurrentVideoIndex(videos.length - 1);
      }
    } else if (direction === 'down') {
      if (currentVideoIndex < videos.length - 1) {
        setCurrentVideoIndex(currentVideoIndex + 1);
      } else {
        // Loop to first video when at last video
        console.log('Looping to first video');
        setCurrentVideoIndex(0);
      }
    }
  };

  // Handle wheel scroll
  const handleWheel = (e) => {
    // Don't scroll if clicking on video element
    if (e.target.tagName === 'VIDEO') return;

    e.preventDefault();
    if (e.deltaY > 0) {
      handleScroll('down');
    } else {
      handleScroll('up');
    }
  };

  // Handle touch events for mobile
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isUpSwipe = distance > 50;
    const isDownSwipe = distance < -50;

    if (isUpSwipe) {
      handleScroll('down');
    } else if (isDownSwipe) {
      handleScroll('up');
    }
  };

  // Handle video click to play/pause
  const handleVideoClick = (e, index) => {
    e.stopPropagation(); // Prevent event bubbling
    const video = videoRefs.current[index];
    if (video) {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    }
  };

  // Handle action buttons
  const handleLike = (videoId) => {
    setLikedVideos(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(videoId)) {
        newLiked.delete(videoId);
      } else {
        newLiked.add(videoId);
      }
      return newLiked;
    });
  };

  const handleShare = (video) => {
    if (navigator.share) {
      navigator.share({
        title: video.title || 'Check out this food video!',
        text: video.description || 'Amazing food content on FoodInsta',
        url: window.location.href
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleComment = (video) => {
    console.log('Comment on video:', video.title || video._id);
    // Add your comment functionality here
    alert('Comment feature coming soon!');
  };



  const handleBuy = (video) => {
    console.log('Buy item from video:', video.title || video._id);
    // Add your buy functionality here
    alert('Buy feature coming soon!');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-white text-xl">Loading videos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-red-500 text-xl">Error: {error}</div>
      </div>
    );
  }

  if (!Array.isArray(videos) || videos.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-white text-xl">
          {!Array.isArray(videos) ? 'Invalid data format' : 'No videos found'}
        </div>
      </div>
    );
  }

  return (
    <div 
      className="relative w-full h-screen overflow-hidden bg-black"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      ref={containerRef}
    >
      {/* Video Container - Shows ALL videos */}
      <div
        className="flex flex-col transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateY(-${currentVideoIndex * 100}vh)`,
          height: `${videos.length * 100}vh`
        }}
      >
        {Array.isArray(videos) && videos.map((video, index) => (
          <div
            key={video._id || index}
            className="relative w-full h-screen flex items-center justify-center flex-shrink-0"
          >
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              className="w-full h-full object-cover cursor-pointer"
              src={video.videoUrl || video.video}
              loop
              muted
              playsInline
              onClick={(e) => handleVideoClick(e, index)}
              onError={(e) => console.error('Video error:', e)}
            />

            {/* Video Overlay Info */}
            <div className="absolute bottom-17 left-4 right-4 text-white z-10 flex gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-2 ">
                  {video.title || video.name || `Video ${index + 1}`}
                </h3>
                {video.description && (
                  <p className="text-sm opacity-80 mb-2">{video.description}</p>
                )}
              </div>
              {video.tags && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {video.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="bg-white/20 px-2 py-1 rounded-full text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Buy Button - Positioned with Product Info */}
              <button
                onClick={() => handleBuy(video)}
                className="h-[12vw] inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-full transition-colors duration-200 shadow-lg"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293A1 1 0 006 17h12M16 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
                <span className="text-white text-sm font-medium">Buy Now</span>
              </button>
            </div>

            {/* Play/Pause Indicator */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-100">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            {/* Instagram-like Action Buttons */}
            <div className="absolute right-4 bottom-16 flex flex-col gap-6 z-20">
              {/* Like Button */}
              <button
                onClick={() => handleLike(video._id || index)}
                className="flex flex-col items-center gap-1 hover:scale-110 transition-transform duration-200"
              >
                <div className="w-12 h-12 rounded-full bg-black/30 flex items-center justify-center">
                  <svg
                    className={`w-7 h-7 ${likedVideos.has(video._id || index) ? 'text-red-500' : 'text-white'}`}
                    fill={likedVideos.has(video._id || index) ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <span className="text-white text-xs font-medium">
                  {video.likes || Math.floor(Math.random() * 1000) + 100}
                </span>
              </button>

              {/* Comment Button */}
              <button
                onClick={() => handleComment(video)}
                className="flex flex-col items-center gap-1 hover:scale-110 transition-transform duration-200"
              >
                <div className="w-12 h-12 rounded-full bg-black/30 flex items-center justify-center">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <span className="text-white text-xs font-medium">
                  {video.comments || Math.floor(Math.random() * 500) + 50}
                </span>
              </button>

              {/* Share Button */}
              <button
                onClick={() => handleShare(video)}
                className="flex flex-col items-center gap-1 hover:scale-110 transition-transform duration-200"
              >
                <div className="w-12 h-12 rounded-full bg-black/30 flex items-center justify-center">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                </div>
                <span className="text-white text-xs font-medium">Share</span>
              </button>

              {/* Profile Button */}
              <button
                onClick={goToProfile}
                className="flex flex-col items-center gap-1 hover:scale-110 transition-transform duration-200"
              >
                <div className="w-12 h-12 rounded-full bg-black/30 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-white text-xs font-medium">Profile</span>
              </button>
            </div>




          </div>
        ))}
      </div>

      {/* Navigation Dots - Show max 5 dots */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-2 z-20">
        {Array.isArray(videos) && (() => {
          const totalVideos = videos.length;
          const maxDots = 5;

          if (totalVideos <= maxDots) {
            // Show all dots if total videos <= 5
            return videos.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentVideoIndex
                    ? 'bg-white scale-125'
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                onClick={() => setCurrentVideoIndex(index)}
              />
            ));
          } else {
            // Show 5 dots with smart positioning
            let startIndex;

            if (currentVideoIndex <= 2) {
              // Show first 5 dots
              startIndex = 0;
            } else if (currentVideoIndex >= totalVideos - 3) {
              // Show last 5 dots
              startIndex = totalVideos - 5;
            } else {
              // Show current video in center with 2 dots on each side
              startIndex = currentVideoIndex - 2;
            }

            return Array.from({ length: 5 }, (_, i) => {
              const videoIndex = startIndex + i;
              return (
                <button
                  key={videoIndex}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    videoIndex === currentVideoIndex
                      ? 'bg-white scale-125'
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                  onClick={() => setCurrentVideoIndex(videoIndex)}
                />
              );
            });
          }
        })()}
      </div>


    </div>
  );
};

export default VideoReels;
