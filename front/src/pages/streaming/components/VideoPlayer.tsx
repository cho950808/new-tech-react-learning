import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, Loader2 } from 'lucide-react';

const VideoPlayer: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loading, setLoading] = useState(true);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleVolumeToggle = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !isMuted;
    setIsMuted(video.muted);
  };

  const handleFullscreenToggle = () => {
    const video = videoRef.current;
    if (!video) return;

    if (!isFullscreen) {
      video.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
    setIsFullscreen(!isFullscreen);
  };

  const handleProgress = () => {
    const video = videoRef.current;
    if (!video) return;

    const currentProgress = (video.currentTime / video.duration) * 100;
    setProgress(currentProgress);
  };

  const handleLoadedData = () => setLoading(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.addEventListener('timeupdate', handleProgress);
    video.addEventListener('loadeddata', handleLoadedData);

    return () => {
      video.removeEventListener('timeupdate', handleProgress);
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="video-container bg-gray-900 rounded-lg shadow-lg overflow-hidden relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <Loader2 className="animate-spin text-white w-16 h-16" />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>

        <video
          ref={videoRef}
          className="w-full h-auto rounded-lg"
          controls={false}
          autoPlay
          muted={isMuted}
          loop
          src="http://localhost:4002/video"
        >
        </video>

        <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between text-white">
          <button onClick={togglePlayPause} className="focus:outline-none">
            {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
          </button>

          <button onClick={handleVolumeToggle} className="focus:outline-none">
            {isMuted ? <VolumeX className="w-8 h-8" /> : <Volume2 className="w-8 h-8" />}
          </button>

          <button onClick={handleFullscreenToggle} className="focus:outline-none">
            {isFullscreen ? <Minimize className="w-8 h-8" /> : <Maximize className="w-8 h-8" />}
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-gray-800 h-2">
          <div
            style={{ width: `${progress}%` }}
            className="bg-blue-500 h-full transition-all duration-300"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;