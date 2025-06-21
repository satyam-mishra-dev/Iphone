import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Highlights from './components/Highlights';
import Model from './components/Model';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';

import * as Sentry from '@sentry/react';
import { useEffect } from 'react';

const App = () => {
  useEffect(() => {
    // Fix for mobile viewport height issues
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);

    // Prevent default touch behaviors that might interfere with scrolling
    const preventDefaultTouch = (e) => {
      // Only prevent default for specific gestures, not all touches
      if (e.touches.length > 1) {
        e.preventDefault(); // Prevent pinch zoom
      }
    };

    // Add passive event listeners for better performance
    document.addEventListener('touchstart', preventDefaultTouch, { passive: false });
    document.addEventListener('touchmove', (e) => {
      // Allow normal scrolling but prevent horizontal scroll
      if (Math.abs(e.touches[0].clientX - e.touches[0].pageX) > Math.abs(e.touches[0].clientY - e.touches[0].pageY)) {
        e.preventDefault();
      }
    }, { passive: false });

    return () => {
      window.removeEventListener('resize', setVH);
      window.removeEventListener('orientationchange', setVH);
      document.removeEventListener('touchstart', preventDefaultTouch);
    };
  }, []);

  return (
    <main className="bg-black scrollable">
      <Navbar />
      <Hero />
      <Highlights />
      <Model />
      <Features />
      <HowItWorks />
      <Footer />
    </main>
  )
}

export default Sentry.withProfiler(App);