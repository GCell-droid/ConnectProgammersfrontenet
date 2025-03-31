import axios from 'axios';
import React, { useState } from 'react';
import { BASE_URL } from '../utils/constants';

const NewFeedCard = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [actionTaken, setActionTaken] = useState(null);
  const { _id, photoUrl, firstName, lastName, skills, gender, age, description } = user;
  
  const handleInterested = async (userId) => {
    try {
      setIsLoading(true);
      await axios.post(`${BASE_URL}/request/interested/${userId}`, {}, { withCredentials: true });
      setActionTaken('interested');
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleIgnored = async (userId) => {
    try {
      setIsLoading(true);
      await axios.post(`${BASE_URL}/request/ignored/${userId}`, {}, { withCredentials: true });
      setActionTaken('ignored');
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card w-full sm:w-80 md:w-96 mx-auto overflow-hidden transition-all duration-300 
      bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800
      shadow-lg hover:shadow-xl dark:shadow-slate-900/50 dark:hover:shadow-slate-900/70
      border border-slate-200 dark:border-slate-700 rounded-2xl flex flex-col">
      
      {/* Profile Image with overlay effect */}
      <figure className="relative w-full h-60 overflow-hidden">
        <img
          src={photoUrl || 'https://via.placeholder.com/400x300'}
          alt={`${firstName}'s profile`}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
        
        {/* Gender indicator badge */}
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium capitalize
          ${gender === 'male' 
            ? 'bg-blue-500/80 text-white dark:bg-blue-600/90' 
            : 'bg-pink-500/80 text-white dark:bg-pink-600/90'}`}>
          {gender}
        </div>
      </figure>

      {/* Card Body */}
      <div className="card-body p-5 text-slate-800 dark:text-slate-100 flex flex-col flex-grow">
        {/* Name and Age */}
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-bold tracking-tight">
            {firstName} {lastName}
          </h2>
          <span className="badge badge-lg bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200 font-medium">
            {age ? `${age} yrs` : ':)'}
          </span>
        </div>
        
        {/* Skills */}
        {skills && skills.length > 0 && (
          <div className="flex flex-wrap gap-2 my-2">
            {skills.map((skill, index) => (
              <span 
                key={index} 
                className="px-3 py-1 text-xs font-medium rounded-full
                bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                {skill}
              </span>
            ))}
          </div>
        )}
        
        {/* Description */}
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 mb-4 line-clamp-3">{description}</p>
        
        {/* Divider */}
        <div className="divider my-1 h-px bg-slate-200 dark:bg-slate-700"></div>
        
        {/* Action Buttons */}
        <div className="card-actions flex justify-between gap-3 mt-3">
          <button 
            onClick={() => !actionTaken && handleInterested(_id)}
            disabled={isLoading || actionTaken}
            className={`flex-1 btn btn-sm h-12 rounded-xl text-white transition-all duration-300
              ${actionTaken === 'interested' 
                ? 'bg-emerald-600 dark:bg-emerald-700' 
                : 'bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700'}
              ${isLoading && 'loading'} 
              ${actionTaken && actionTaken !== 'interested' && 'btn-disabled opacity-50'}`}>
            {actionTaken === 'interested' ? 'Interested ✓' : 'Interested'}
          </button>
          
          <button 
            onClick={() => !actionTaken && handleIgnored(_id)}
            disabled={isLoading || actionTaken}
            className={`flex-1 btn btn-sm h-12 rounded-xl transition-all duration-300
              ${actionTaken === 'ignored' 
                ? 'bg-red-600 dark:bg-red-700 text-white' 
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600'}
              ${isLoading && 'loading'} 
              ${actionTaken && actionTaken !== 'ignored' && 'btn-disabled opacity-50'}`}>
            {actionTaken === 'ignored' ? 'Ignored ✓' : 'Ignore'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewFeedCard;
