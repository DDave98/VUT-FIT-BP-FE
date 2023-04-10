import { useState, useRef } from 'react';
import { ConsoleOut, consoleType } from '../Services/DebugService';

export const useTimeout = (delay) =>
{
    return new Promise( res => setTimeout(res, delay) );
}

/**
 * Hook to use a callback function after a delay
 * @param {*} countdownFrom - delay in seconds 
 * @param {*} onComplete  - callback function
 * @returns count, startCountdown, startCountdown
 */
export const useCountdownCall = (countdownFrom, onComplete) =>
{
  const [count, setCount] = useState(countdownFrom);
  const intervalIdRef = useRef(null);

  const startCountdown = () => 
  {
    ConsoleOut(consoleType.log, "useTimeout", "startCountdown");
    intervalIdRef.current = setInterval(() => {
      setCount(count => count - 1);
    }, 1000);
  };

  const stopCountdown = () => 
  {
    ConsoleOut(consoleType.log, "useTimeout", "stopCountdown");
    clearInterval(intervalIdRef.current);
    setCount(countdownFrom);
  };

  const handleComplete = () => 
  {
    ConsoleOut(consoleType.log, "useTimeout", "handle complete");
    stopCountdown();
    onComplete();
  };

  if (count === 0) handleComplete();

  return [count, startCountdown, stopCountdown];
}