"use client";

import { useEffect, useState } from 'react';

/**
 * A hook to get the correct viewport height, especially on mobile browsers
 * where the viewport height can change when the address bar shows/hides.
 */
export const useViewportHeight = () => {
  const [vh, setVh] = useState(0);

  useEffect(() => {
    // Function to update the custom property
    const updateHeight = () => {
      // Get the viewport height
      const vh = window.innerHeight * 0.01;
      // Set the value in the --vh custom property
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      setVh(vh);
    };

    // Add event listener
    window.addEventListener('resize', updateHeight);
    window.addEventListener('orientationchange', updateHeight);
    
    // Call the function to set the height initially
    updateHeight();
    
    // Return a cleanup function to remove the event listener
    return () => {
      window.removeEventListener('resize', updateHeight);
      window.removeEventListener('orientationchange', updateHeight);
    };
  }, []);

  return vh;
};

export default useViewportHeight;
