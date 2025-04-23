import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import './ImageGrid.css';

import Image1 from '../assets/images/img27.png';
import Image2 from '../assets/images/img24.jpg';
import Image3 from '../assets/images/img26.png';
import Image4 from '../assets/images/img28.jpg';
import Image5 from '../assets/images/img34.jpg';
import Image6 from '../assets/images/img82.jpg';

function ImageGrid() {
  const controls = useAnimation();

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: (i) => ({
      scale: 1,
      opacity: 1,
      transition: { delay: i * 0.2, duration: 0.6 },
    }),
    exit: (i) => ({
      scale: 0.8,
      opacity: 0,
      transition: { delay: i * 0.1, duration: 0.4 },
    }),
  };

  const images = [Image1, Image2, Image3, Image4, Image5, Image6];

  useEffect(() => {
    let isMounted = true;

    const loopAnimation = async () => {
      while (isMounted) {
        if (!isMounted) return;
        await controls.start((i) => imageVariants.visible(i));
        if (!isMounted) return;
        await new Promise((r) => setTimeout(r, 2500)); // stay visible
        if (!isMounted) return;
        await controls.start((i) => imageVariants.exit(i));
        if (!isMounted) return;
        await new Promise((r) => setTimeout(r, 500)); // small delay before reappearing
      }
    };

    loopAnimation();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="image-grid-wrapper">
      <div className="image-grid">
        {images.map((src, i) => (
          <motion.img
            key={i}
            src={src}
            alt={`Person ${i + 1}`}
            custom={i}
            variants={imageVariants}
            initial="hidden"
            animate={controls}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageGrid;
