import { doc, setDoc } from "firebase/firestore";
import { db } from "./Firebase/configs";
import { useRef, useEffect, useState } from 'react';

const videoSrc = new URL("./assets/hand.mp4", import.meta.url).href;

function Hero() {
  const [user, setUser] = useState<string | null>(null);

   // Explicitly type the ref as an HTMLVideoElement
   const videoRef = useRef<HTMLVideoElement>(null);
 
   // Unmute the video on user interaction
   const handleUnmute = () => {
 
    toDesplay();
   };
 

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  async function toDesplay() {
      const userRef = doc(db, "vedio2", "vedio2");
      await setDoc(userRef, { vedio2: "vedio2" });
  }

  useEffect(() => {
    console.log(user);
  }, [user]);

  // ✅ Add touch event listener for iPads
  useEffect(() => {
    function handleTouch() {
      toDesplay(); // Call the function when touched anywhere
    }

    document.addEventListener("touchstart", handleTouch);

    return () => {
      document.removeEventListener("touchstart", handleTouch);
    };
  }, []); // Runs only once on mount

  return (
    <div
      className="flex justify-center items-center h-screen w-screen overflow-hidden"
      onClick={handleUnmute} // Unmute on click
    >
      <video
        ref={videoRef}
        autoPlay
        loop
        muted // Muted initially
        id="myVideo"
        className="w-full h-full object-cover"
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Optional: Add a button to indicate unmute
      {isMuted && (
        <button
          className="absolute bottom-10 bg-white text-black px-4 py-2 rounded"
          onClick={handleUnmute}
        >
          Unmute
        </button>
      )} */}
    </div>
  );
}

export default Hero;
