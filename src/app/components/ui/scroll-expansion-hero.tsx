import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const ScrollExpandMedia = ({ mediaType = 'video', mediaSrc, posterSrc, bgImageSrc, title, scrollToExpand, textBlend, children }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);
  const [isMobileState, setIsMobileState] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => { setScrollProgress(0); setShowContent(false); setMediaFullyExpanded(false); }, [mediaType]);

  useEffect(() => {
    const handleWheel = (e) => {
      if (mediaFullyExpanded && e.deltaY < 0 && window.scrollY <= 5) {
        setMediaFullyExpanded(false); e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const np = Math.min(Math.max(scrollProgress + e.deltaY * 0.0009, 0), 1);
        setScrollProgress(np);
        if (np >= 1) { setMediaFullyExpanded(true); setShowContent(true); }
        else if (np < 0.75) setShowContent(false);
      }
    };
    const handleTouchStart = (e) => setTouchStartY(e.touches[0].clientY);
    const handleTouchMove = (e) => {
      if (!touchStartY) return;
      const ty = e.touches[0].clientY;
      const dy = touchStartY - ty;
      if (mediaFullyExpanded && dy < -20 && window.scrollY <= 5) {
        setMediaFullyExpanded(false); e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const np = Math.min(Math.max(scrollProgress + dy * (dy < 0 ? 0.008 : 0.005), 0), 1);
        setScrollProgress(np);
        if (np >= 1) { setMediaFullyExpanded(true); setShowContent(true); }
        else if (np < 0.75) setShowContent(false);
        setTouchStartY(ty);
      }
    };
    const handleScroll = () => { if (!mediaFullyExpanded) window.scrollTo(0, 0); };
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', () => setTouchStartY(0));
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [scrollProgress, mediaFullyExpanded, touchStartY]);

  useEffect(() => {
    const check = () => setIsMobileState(window.innerWidth < 768);
    check(); window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const mW = 300 + scrollProgress * (isMobileState ? 650 : 1250);
  const mH = 400 + scrollProgress * (isMobileState ? 200 : 400);
  const tX = scrollProgress * (isMobileState ? 180 : 150);
  const w1 = title ? title.split(' ')[0] : '';
  const w2 = title ? title.split(' ').slice(1).join(' ') : '';

  return (
    <div ref={sectionRef} className='transition-colors duration-700 ease-in-out overflow-x-hidden'>
      <section className='relative flex flex-col items-center justify-start min-h-[100dvh]'>
        <div className='relative w-full flex flex-col items-center min-h-[100dvh]'>
          <motion.div className='absolute inset-0 z-0 h-full' initial={{ opacity: 0 }} animate={{ opacity: 1 - scrollProgress }} transition={{ duration: 0.1 }}>
            <img src={bgImageSrc} alt='Background' className='w-screen h-screen object-cover' />
            <div className='absolute inset-0 bg-black/10' />
          </motion.div>
          <div className='container mx-auto flex flex-col items-center justify-start relative z-10'>
            <div className='flex flex-col items-center justify-center w-full h-[100dvh] relative'>
              <div className='absolute z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl' style={{ width: mW + 'px', height: mH + 'px', maxWidth: '95vw', maxHeight: '85vh', boxShadow: '0 0 50px rgba(0,0,0,0.3)' }}>
                {mediaType === 'video' ? (
                  <div className='relative w-full h-full pointer-events-none'>
                    <video src={mediaSrc} poster={posterSrc} autoPlay muted loop playsInline className='w-full h-full object-cover rounded-xl' />
                    <motion.div className='absolute inset-0 bg-black/30 rounded-xl' initial={{ opacity: 0.7 }} animate={{ opacity: 0.5 - scrollProgress * 0.3 }} transition={{ duration: 0.2 }} />
                  </div>
                ) : (
                  <div className='relative w-full h-full'>
                    <img src={mediaSrc} alt={title || 'Media'} className='w-full h-full object-cover rounded-xl' />
                    <motion.div className='absolute inset-0 bg-black/50 rounded-xl' initial={{ opacity: 0.7 }} animate={{ opacity: 0.7 - scrollProgress * 0.3 }} transition={{ duration: 0.2 }} />
                  </div>
                )}
                {scrollToExpand && (
                  <p className='text-blue-200 font-medium text-center mt-4' style={{ transform: 'translateX(' + tX + 'vw)' }}>{scrollToExpand}</p>
                )}
              </div>
              <div className={'flex items-center justify-center text-center gap-4 w-full relative z-10 flex-col ' + (textBlend ? 'mix-blend-difference' : 'mix-blend-normal')}>
                <motion.h2 className='text-4xl md:text-5xl lg:text-6xl font-bold text-blue-200' style={{ transform: 'translateX(-' + tX + 'vw)' }}>{w1}</motion.h2>
                <motion.h2 className='text-4xl md:text-5xl lg:text-6xl font-bold text-blue-200' style={{ transform: 'translateX(' + tX + 'vw)' }}>{w2}</motion.h2>
              </div>
            </div>
            <motion.section className='flex flex-col w-full px-8 py-10 md:px-16 lg:py-20' initial={{ opacity: 0 }} animate={{ opacity: showContent ? 1 : 0 }} transition={{ duration: 0.7 }}>
              {children}
            </motion.section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;
