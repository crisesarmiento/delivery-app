import { useState, useEffect } from 'react';

/**
 * useIsMobile - custom hook to detect if device is mobile based on window width.
 * @param breakpoint - px value for mobile breakpoint (default 768)
 * @returns boolean
 */
const useIsMobile = (breakpoint = 768): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= breakpoint);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [breakpoint]);

  return isMobile;
}
export default useIsMobile;