import React, { useState } from 'react';

const CustomCarousel = ({ offerListings }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!offerListings || offerListings.length === 0) return null;

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? offerListings.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === offerListings.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      <div
        className="w-full h-full bg-center bg-no-repeat bg-cover transition-all duration-500"
        style={{
          backgroundImage: `url(${offerListings[currentIndex].imageUrls[0]})`,
        }}
        key={offerListings[currentIndex]._id}
      ></div>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded"
      >
        ‹
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded"
      >
        ›
      </button>

      {/* Optional: Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {offerListings.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-gray-400'
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default CustomCarousel;
