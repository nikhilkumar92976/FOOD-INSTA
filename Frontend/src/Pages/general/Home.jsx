import { useNavigate } from "react-router-dom";
import VideoReels from "./VideoReels";


const Home = () => {
  const navigate = useNavigate(); // ✅ Call hook at top level

  const goToProfile = () => {
    navigate("/profile");
  };

  return (
    <div className="relative w-full h-screen">
      {/* Video Reels Component */}
      <VideoReels goToProfile={goToProfile} />
    </div>
  );
};

export default Home;
