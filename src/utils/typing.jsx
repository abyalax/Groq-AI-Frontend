import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const TypingAnimation = ({ text, speed = 100 }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1); 
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [index, text, speed]); 

  return <span>{displayedText}</span>; 
};

TypingAnimation.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number,
};

export default TypingAnimation;
