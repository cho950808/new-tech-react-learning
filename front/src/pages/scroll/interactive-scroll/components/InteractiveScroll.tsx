import React, { useEffect, useState, useRef } from 'react';

const InteractiveScroll: React.FC = () => {
  const [offsetY, setOffsetY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (containerRef.current) {
      setOffsetY(containerRef.current.scrollTop);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    container?.addEventListener('scroll', handleScroll);

    return () => {
      container?.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
    <div ref={containerRef} className="min-h-screen text-white overflow-y-auto">
      <div
        className="h-screen flex items-center justify-center bg-fixed bg-center bg-cover"
        style={{
          backgroundImage: 'url(https://source.unsplash.com/random/1920x1080)',
          transform: `translateY(${offsetY * 0.3}px)`,
        }}
      >
        <h1
          className="text-6xl font-bold"
          style={{
            transform: `translateY(${offsetY * 0.5}px)`,
            opacity: `${1 - offsetY / 500}`,
          }}
        >
          Scroll Down
        </h1>
      </div>

      <div
        className={`h-screen flex items-center justify-center transition-colors duration-500 ${
          offsetY > 600 ? 'bg-purple-700' : 'bg-gray-900'
        }`}
      >
        <h2 className="text-5xl font-semibold">
          Watch the background change
        </h2>
      </div>

      <div className="h-screen flex items-center justify-center bg-gray-800">
        <div
          className="p-10 bg-gray-700 rounded-lg"
          style={{
            transform: `scale(${1 + offsetY / 1000})`,
            opacity: `${1 - offsetY / 1000}`,
          }}
        >
          <h3 className="text-4xl">Interactive Scaling Box</h3>
          <p className="mt-4 text-lg">
            As you scroll, this box grows and fades out.
          </p>
        </div>
      </div>

      <div className="h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-3xl">More content to scroll...</p>
      </div>
    </div>
  );
};

export default InteractiveScroll;