import React, { useState, useEffect } from 'react';
import NewFeedCard from './NewFeedCard.jsx';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';

const StackComponent = () => {
  const feed = useSelector(store => store.feed);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Show only the current user card
  const currentUser = feed[currentIndex];

  // Handle card action (interested or ignored)
  const handleCardAction = () => {
    try{
      if (isAnimating || currentIndex >= feed.length - 1) return;
      
      setIsAnimating(true);
      
      // Reduced delay to 150ms for faster transitions
      setTimeout(() => {
        setCurrentIndex(prevIndex => prevIndex + 1);
        setIsAnimating(false);
      }, 150);
    }catch(err){
      <Error message={err?.message}/>
    }
  };

  // Listen for card actions from NewFeedCard component
  useEffect(() => {
    const handleUserAction = () => {
      handleCardAction();
    };

    window.addEventListener('userAction', handleUserAction);
    return () => window.removeEventListener('userAction', handleUserAction);
  }, [currentIndex, isAnimating, feed.length]);

  return (
    <div className='flex justify-center mt-10 w-full'>
      {/* Remove fixed width constraints and preserve the card's natural responsiveness */}
      <div className="stack gap-4 relative min-h-[500px] w-full max-w-md">
        <AnimatePresence mode="wait">
          {currentUser && (
            <motion.div
              key={currentUser._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="w-full" // Let the card's own responsiveness handle sizing
            >
              <NewFeedCard user={currentUser} />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Show a message when there are no more profiles */}
        {currentIndex >= feed.length && (
          <div className="flex items-center justify-center h-96 w-full">
            <p className="text-lg text-slate-600 dark:text-slate-300">
              No more profiles to show
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StackComponent;