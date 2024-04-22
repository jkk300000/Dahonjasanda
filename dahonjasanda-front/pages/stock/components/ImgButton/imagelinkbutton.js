import React from 'react';
import Button from '@mui/material/Button';

const ImageLinkButton = ({ src, alt, to }) => {

  const handleClick = () => {
    window.location.href = to;
  };

  return (
    <Button onClick={handleClick} variant="text" style={{ padding: 0 }}>
      <img src={src} alt={alt} />
    </Button>
  );
};

export default ImageLinkButton;