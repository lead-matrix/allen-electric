import React, { useState, useRef, useEffect } from 'react';

interface BeforeAfterProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  heightClass?: string;
}

export const BeforeAfterGallery: React.FC<BeforeAfterProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = 'Before',
  afterLabel = 'After',
  heightClass = 'h-[300px] md:h-[400px]',
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 0) return;
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    if (isDragging) {
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden rounded-2xl select-none group cursor-ew-resize border border-slate-200 shadow-lg ${heightClass}`}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseDown={() => setIsDragging(true)}
      onTouchStart={() => setIsDragging(true)}
    >
      {/* After Image (Background) */}
      <img
        src={afterImage}
        alt="After Upgrade"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />
      <div className="absolute top-4 right-4 bg-brand-navy-900/80 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-md z-10 uppercase tracking-wider">
        {afterLabel}
      </div>

      {/* Before Image (Foreground overlay clipped by slider position) */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
        style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
      >
        <img
          src={beforeImage}
          alt="Before Upgrade"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4 bg-red-600/80 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-md z-10 uppercase tracking-wider">
          {beforeLabel}
        </div>
      </div>

      {/* Vertical Slider line */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize pointer-events-none z-20 shadow-2xl"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Slider Button */}
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-brand-gold-500 text-brand-navy-950 flex items-center justify-center shadow-lg border-2 border-white pointer-events-none transition-transform group-hover:scale-110">
          <svg
            className="w-5 h-5 fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
          </svg>
        </div>
      </div>
    </div>
  );
};
