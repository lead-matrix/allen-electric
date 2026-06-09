import { useEffect } from 'react';

export const useExitIntent = (handler: () => void) => {
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger if cursor leaves the top of the viewport (common back button/tab switch behavior)
      if (e.clientY < 50) {
        handler();
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handler]);
};
