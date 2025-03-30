import React from 'react';

const NewFeedCard = ({ user }) => {
  const { photoUrl, firstName, lastName, skills, gender, age, description } = user;
  
  const glow = gender === "male"
    ? "bg-gradient-to-br from-blue-900 via-black to-black border border-blue-400 shadow-[0_0_15px_#4da6ff] hover:shadow-[0_0_30px_#0080ff]" 
    : "bg-gradient-to-br from-pink-900 via-black to-black border border-pink-400 shadow-[0_0_15px_#ff66b2] hover:shadow-[0_0_30px_#ff1493]";

  return (
    <div className={`card w-96 h-auto p-4 rounded-xl overflow-hidden transition-all duration-300 ${glow}`}>
      
      {/* Profile Image */}
      <figure className="w-full h-60 flex justify-center items-center overflow-hidden rounded-t-xl">
        <img
          src={photoUrl || 'https://via.placeholder.com/150'} // Placeholder if no image
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </figure>

      {/* Card Body */}
      <div className="card-body text-white p-4">
        
        {/* Name */}
        <h2 className="card-title text-2xl font-semibold text-center">
          {firstName} {lastName}
        </h2>

        {/* Details */}
        <div className="flex justify-center gap-4 text-lg mt-2">
          <span className="bg-gray-800 px-3 py-1 rounded-md">{age} yrs</span>
          <span className="bg-gray-800 px-3 py-1 rounded-md">{gender}</span>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm mt-3 text-center">{description}</p>

        {/* Buttons */}
        <div className="flex justify-between mt-4">
          <button className="btn w-1/2 bg-green-600 hover:bg-green-700 text-white rounded-lg">
            Interested
          </button>
          <button className="btn w-1/2 bg-red-600 hover:bg-red-700 text-white rounded-lg">
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewFeedCard;
