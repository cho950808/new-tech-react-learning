import React, { useState } from "react";

const SlickSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1521747116042-5a810fda9664?fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1542257048-08f0f1a3c42d?fit=crop&w=800&q=80",
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="flex justify-center items-center h-full bg-gray-100">
      <div className="relative w-full max-w-5xl mx-auto overflow-hidden h-96 bg-gray-900 rounded-lg shadow-lg">
        <div className="absolute inset-y-0 left-0 flex items-center">
          <button
            className="bg-gray-800 text-white p-3 rounded-full ml-4 focus:outline-none"
            onClick={prevSlide}
          >
            &#10094;
          </button>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center">
          <button
            className="bg-gray-800 text-white p-3 rounded-full mr-4 focus:outline-none"
            onClick={nextSlide}
          >
            &#10095;
          </button>
        </div>
        <div
          className="flex transition-transform ease-in-out duration-700"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div className="min-w-full h-96" key={index}>
              <img
                src={image}
                alt={`Slide ${index}`}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <span
              key={index}
              className={`w-4 h-4 bg-gray-800 rounded-full cursor-pointer ${
                currentIndex === index ? "bg-white" : ""
              }`}
              onClick={() => setCurrentIndex(index)}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SlickSlider;