import React, { useEffect, useRef } from 'react';

function MyVideo() {
  const videoRef = useRef(null);

  useEffect(() => {
    async function getMedia() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Error accessing media devices:', err);
      }
    }

    getMedia();
  }, []);

  return (
    <div>
      <h1>My Video</h1>
      <video ref={videoRef} autoPlay playsInline />
    </div>
  );
}

export default MyVideo;
