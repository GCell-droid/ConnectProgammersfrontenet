import React from 'react';

const ShimmerFeedCard = () => {
  return (
    <div className="card w-full mt-10 sm:w-80 md:w-96 mx-auto overflow-hidden transition-all duration-300
      bg-gradient-to-br shadow-lg rounded-2xl flex flex-col">
      
      {/* Shimmer Profile Image */}
      <div className="relative w-full h-52 overflow-hidden skeleton"></div>
      
      {/* Card Body */}
      <div className="card-body p-5  flex flex-col flex-grow">
        
        {/* Name and Age */}
        <div className="flex justify-between items-center mb-3">
          <div className="skeleton h-6 w-32"></div>
          <div className="skeleton h-6 w-12"></div>
        </div>
        
        {/* Skills */}
        <div className="flex flex-wrap gap-2 my-2">
          <div className="skeleton h-5 w-16"></div>
          <div className="skeleton h-5 w-20"></div>
          <div className="skeleton h-5 w-14"></div>
        </div>
        
        {/* Description */}
        <div className="skeleton h-4 w-full my-2"></div>
        <div className="skeleton h-4 w-3/4"></div>
        <div className="skeleton h-4 w-5/6"></div>
        
        {/* Divider */}
        <div className="divider my-1 h-px"></div>
        
        {/* Action Buttons */}
        <div className="card-actions flex justify-between gap-3 mt-3">
          <div className="skeleton h-12 w-24 rounded-xl"></div>
          <div className="skeleton h-12 w-24 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
};

export default ShimmerFeedCard;