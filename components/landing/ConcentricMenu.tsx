"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ConcentricMenuProps {
  onNavigate: (section: string) => void;
  currentSection: string;
}


export const ConcentricMenu: React.FC<ConcentricMenuProps> = ({ onNavigate, currentSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredRing, setHoveredRing] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive listener to check screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Dimensions for rings (0: Center, 1: Home, 2: About, 3: Pricing, 4: Testimonials, 5: FAQs)
  const baseOpen = isMobile ? [64, 150, 240, 330, 420, 510] : [96, 220, 360, 500, 640, 780];
  const deltaOpen = isMobile ? 15 : 25; // Reduced hover expansion width

  const baseClosed = isMobile ? [16, 24, 34, 44, 54, 64] : [20, 30, 42, 54, 66, 78];
  const deltaClosed = isMobile ? 4 : 6; // Reduced closed expansion width


  // Helper to get active ring size dynamically (stable index 0 center)
  const getRingSize = (index: number) => {
    if (index === 0) {
      return isOpen ? baseOpen[0] : baseClosed[0];
    }
    
    if (isOpen) {
      return baseOpen[index] + (hoveredRing !== null && hoveredRing > 0 && index >= hoveredRing ? deltaOpen : 0);
    } else {
      return baseClosed[index] + (hoveredRing !== null && hoveredRing > 0 && index >= hoveredRing ? deltaClosed : 0);
    }
  };

  // Helper to get ring colors (flip when closed & hovered)
  const getRingColors = (index: number) => {
    let isBlack = index % 2 === 0;
    
    // Invert colors if closed and menu is hovered
    if (!isOpen && hoveredRing !== null) {
      isBlack = !isBlack;
    }

    return {
      bg: isBlack ? '#000000' : '#ffffff',
      text: isBlack ? 'text-white' : 'text-black',
    };
  };

  // Click handler for concentric rings
  const handleRingClick = (index: number) => {
    if (!isOpen) {
      setIsOpen(true);
      return;
    }

    if (index === 0) {
      setIsOpen(false);
    } else {
      const targetSections = ['close', 'home', 'about', 'pricing', 'testimonials', 'faqs'];
      onNavigate(targetSections[index]);
      setIsOpen(false);
    }
  };

  const springTransition = {
    type: 'spring' as const,
    stiffness: 110,
    damping: 15,
    bounce: 0,
  };

  // Staggered delay for open/close animation and customized color shifts
  const getRingTransition = (index: number) => {
    return {
      ...springTransition,
      delay: isOpen ? (5 - index) * 0.025 : index * 0.015,
      backgroundColor: {
        type: 'tween' as const,
        ease: 'easeOut' as const,
        duration: 0.1,
      }
    };
  };

  const labelVariants = {
    closed: {
      opacity: 0,
      y: 8,
      scale: 0.7,
      transition: { duration: 0.15, ease: 'easeIn' as const },
    },
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 16,
        delay: 0.15,
      },
    },
  };

  return (
    <>
      {/* Dimmed backdrop when menu is open */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-20 cursor-pointer"
          />
        )}
      </AnimatePresence>

      {/* Main Container positioned with respect to top */}
      <div className="absolute top-[75vh] md:top-[80vh] left-1/2 -translate-x-1/2 z-30">
        <div className="relative w-0 h-0 flex items-center justify-center">
          

          {/* CONCENTRIC RINGS */}
          
          {/* Ring 5 (FAQs) - Outermost */}
          <motion.div
            animate={{
              width: getRingSize(5),
              height: getRingSize(5),
              backgroundColor: getRingColors(5).bg,
              boxShadow: isOpen ? '0 10px 30px rgba(0,0,0,0.3)' : '0 4px 10px rgba(0,0,0,0.2)',
            }}
            transition={getRingTransition(5)}
            onMouseEnter={() => setHoveredRing(5)}
            onMouseLeave={() => setHoveredRing(null)}
            onClick={() => handleRingClick(5)}
            className={`absolute rounded-full flex justify-center items-start cursor-pointer select-none overflow-hidden
              ${isOpen ? 'hover:scale-[1.01] active:scale-[0.995] transition-transform duration-150' : ''}`}
            style={{ zIndex: 21 }}
          >
            <motion.div
              variants={labelVariants}
              animate={isOpen ? 'open' : 'closed'}
              className={`absolute top-4 md:top-5 font-display font-black text-base md:text-lg tracking-wider uppercase pointer-events-none select-none ${getRingColors(5).text}`}
            >
              {currentSection === 'faqs' ? '• faqs' : 'faqs'}
            </motion.div>
          </motion.div>

          {/* Ring 4 (Testimonials) */}
          <motion.div
            animate={{
              width: getRingSize(4),
              height: getRingSize(4),
              backgroundColor: getRingColors(4).bg,
              boxShadow: isOpen ? '0 10px 30px rgba(0,0,0,0.3)' : '0 4px 10px rgba(0,0,0,0.2)',
            }}
            transition={getRingTransition(4)}
            onMouseEnter={() => setHoveredRing(4)}
            onMouseLeave={() => setHoveredRing(null)}
            onClick={() => handleRingClick(4)}
            className={`absolute rounded-full flex justify-center items-start cursor-pointer select-none overflow-hidden
              ${isOpen ? 'hover:scale-[1.01] active:scale-[0.99] transition-transform duration-150' : ''}`}
            style={{ zIndex: 22 }}
          >
            <motion.div
              variants={labelVariants}
              animate={isOpen ? 'open' : 'closed'}
              className={`absolute top-4 md:top-5 font-display font-black text-base md:text-lg tracking-wider uppercase pointer-events-none select-none ${getRingColors(4).text}`}
            >
              {currentSection === 'testimonials' ? '• testimonials' : 'testimonials'}
            </motion.div>
          </motion.div>

          {/* Ring 3 (Pricing) */}
          <motion.div
            animate={{
              width: getRingSize(3),
              height: getRingSize(3),
              backgroundColor: getRingColors(3).bg,
              boxShadow: isOpen ? '0 10px 30px rgba(0,0,0,0.3)' : '0 4px 10px rgba(0,0,0,0.2)',
            }}
            transition={getRingTransition(3)}
            onMouseEnter={() => setHoveredRing(3)}
            onMouseLeave={() => setHoveredRing(null)}
            onClick={() => handleRingClick(3)}
            className={`absolute rounded-full flex justify-center items-start cursor-pointer select-none overflow-hidden
              ${isOpen ? 'hover:scale-[1.01] active:scale-[0.99] transition-transform duration-150' : ''}`}
            style={{ zIndex: 23 }}
          >
            <motion.div
              variants={labelVariants}
              animate={isOpen ? 'open' : 'closed'}
              className={`absolute top-4 md:top-5 font-display font-black text-base md:text-lg tracking-wider uppercase pointer-events-none select-none ${getRingColors(3).text}`}
            >
              {currentSection === 'pricing' ? '• pricing' : 'pricing'}
            </motion.div>
          </motion.div>

          {/* Ring 2 (About) */}
          <motion.div
            animate={{
              width: getRingSize(2),
              height: getRingSize(2),
              backgroundColor: getRingColors(2).bg,
              boxShadow: isOpen ? '0 10px 30px rgba(0,0,0,0.3)' : '0 4px 10px rgba(0,0,0,0.2)',
            }}
            transition={getRingTransition(2)}
            onMouseEnter={() => setHoveredRing(2)}
            onMouseLeave={() => setHoveredRing(null)}
            onClick={() => handleRingClick(2)}
            className={`absolute rounded-full flex justify-center items-start cursor-pointer select-none overflow-hidden
              ${isOpen ? 'hover:scale-[1.01] active:scale-[0.99] transition-transform duration-150' : ''}`}
            style={{ zIndex: 24 }}
          >
            <motion.div
              variants={labelVariants}
              animate={isOpen ? 'open' : 'closed'}
              className={`absolute top-4 md:top-5 font-display font-black text-base md:text-lg tracking-wider uppercase pointer-events-none select-none ${getRingColors(2).text}`}
            >
              {currentSection === 'about' ? '• about' : 'about'}
            </motion.div>
          </motion.div>

          {/* Ring 1 (Home) */}
          <motion.div
            animate={{
              width: getRingSize(1),
              height: getRingSize(1),
              backgroundColor: getRingColors(1).bg,
              boxShadow: isOpen ? '0 10px 30px rgba(0,0,0,0.3)' : '0 4px 10px rgba(0,0,0,0.2)',
            }}
            transition={getRingTransition(1)}
            onMouseEnter={() => setHoveredRing(1)}
            onMouseLeave={() => setHoveredRing(null)}
            onClick={() => handleRingClick(1)}
            className={`absolute rounded-full flex justify-center items-start cursor-pointer select-none overflow-hidden
              ${isOpen ? 'hover:scale-[1.01] active:scale-[0.99] transition-transform duration-150' : ''}`}
            style={{ zIndex: 25 }}
          >
            <motion.div
              variants={labelVariants}
              animate={isOpen ? 'open' : 'closed'}
              className={`absolute top-4 md:top-5 font-display font-black text-base md:text-lg tracking-wider uppercase pointer-events-none select-none ${getRingColors(1).text}`}
            >
              {currentSection === 'home' ? '• home' : 'home'}
            </motion.div>
          </motion.div>

          {/* Ring 0 (Center Circle / Toggle Button) */}
          <motion.div
            animate={{
              width: getRingSize(0),
              height: getRingSize(0),
              backgroundColor: getRingColors(0).bg,
              boxShadow: '0 4px 12px rgba(0,0,0,0.35)',
            }}
            transition={getRingTransition(0)}
            onMouseEnter={() => setHoveredRing(0)}
            onMouseLeave={() => setHoveredRing(null)}
            onClick={() => handleRingClick(0)}
            className={`absolute rounded-full flex items-center justify-center cursor-pointer select-none
              hover:scale-[1.08] active:scale-[0.95] transition-transform duration-200`}
            style={{ zIndex: 26 }}
          >
            {isOpen ? (
              <motion.svg
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ type: 'spring' as const, stiffness: 220, damping: 15 }}
                className="w-5 h-5 md:w-6 md:h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </motion.svg>
            ) : (
              <div 
                className="w-1.5 h-1.5 rounded-full transition-colors duration-200"
                style={{
                  backgroundColor: hoveredRing !== null ? '#000000' : '#ffffff'
                }}
              />
            )}
          </motion.div>

          {/* "menu" label below button when closed */}
          <AnimatePresence>
            {!isOpen && (
              <motion.span
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: isMobile ? 38 : 50 }}
                exit={{ opacity: 0, y: -5 }}
                className="absolute text-xs tracking-widest font-sans font-black uppercase text-foreground/70 pointer-events-none select-none"
              >
                menu
              </motion.span>
            )}
          </AnimatePresence>
          
        </div>
      </div>
    </>
  );
};

export default ConcentricMenu;
