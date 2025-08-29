import { useState, useEffect, useCallback } from 'react';

interface TypewriterOptions {
  text: string;
  speed?: number;
  delay?: number;
  loop?: boolean;
  loopDelay?: number;
  codeLike?: boolean;
}

export function useTypewriter({
  text,
  speed = 100,
  delay = 0,
  loop = false,
  loopDelay = 2000,
  codeLike = false
}: TypewriterOptions) {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [isDone, setIsDone] = useState(false);

  const resetTypewriter = useCallback(() => {
    setDisplayText('');
    setIsTyping(true);
    setIsDone(false);
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let currentIndex = 0;
    let currentText = '';

    // Delay before starting
    timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (codeLike) {
          // Occasionally add a short pause to mimic thinking while coding
          const shouldPause = Math.random() > 0.9;
          if (shouldPause && currentIndex > 0) {
            // Short pause
            clearInterval(interval);
            setTimeout(() => {
              // Resume typing
              setInterval(() => {
                if (currentIndex < text.length) {
                  currentText += text.charAt(currentIndex);
                  setDisplayText(currentText);
                  currentIndex++;
                } else {
                  clearInterval(interval);
                  setIsTyping(false);
                  setIsDone(true);
                  
                  if (loop) {
                    timeout = setTimeout(() => {
                      resetTypewriter();
                    }, loopDelay);
                  }
                }
              }, speed);
            }, speed * 3); // Pause for 3x the typing speed
            return;
          }
        }
        
        if (currentIndex < text.length) {
          currentText += text.charAt(currentIndex);
          setDisplayText(currentText);
          currentIndex++;
        } else {
          clearInterval(interval);
          setIsTyping(false);
          setIsDone(true);
          
          if (loop) {
            timeout = setTimeout(() => {
              resetTypewriter();
            }, loopDelay);
          }
        }
      }, speed);
      
      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }, delay);
    
    return () => clearTimeout(timeout);
  }, [text, speed, delay, loop, loopDelay, resetTypewriter, codeLike]);

  return { displayText, isTyping, isDone, resetTypewriter };
}
