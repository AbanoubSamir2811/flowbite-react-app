import { doc, onSnapshot } from 'firebase/firestore';
import { db } from './Firebase/configs';
import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const videoSrc = new URL("./assets/test.mp4", import.meta.url).href;

function Desplay() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isMuted, setIsMuted] = useState(true); // Start with muted video
  
    // Unmute the video on user interaction
    const handleUnmute = () => {
      if (videoRef.current) {
        videoRef.current.muted = false;
        setIsMuted(false);
      }
    };
  
    useEffect(() => {
      if (videoRef.current) {
        videoRef.current.volume = 1; // Set volume to maximum
        videoRef.current.muted = isMuted; // Mute or unmute based on state
      }
    }, [isMuted]);

    const [vedio, setVedio] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const docRef = doc(db, "vedio2", "vedio2");
        
        const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
            setVedio(docSnapshot.exists());
        });
        // Cleanup the listener on component unmount
        return () => unsubscribe();
    }, []);
    useEffect(() => {
        if (vedio) {
            setTimeout(() => {
                navigate('/vedio');
            }, 100);
        }
    }, [vedio]);
  return (
    <div
      className="flex justify-center items-center h-screen w-screen overflow-hidden"
      onClick={handleUnmute} // Unmute on click
    >
      <video
        ref={videoRef}
        autoPlay={vedio? true : false}
        muted={isMuted} // Muted initially
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
  )
}

export default Desplay