import React from 'react';
import Button from '@mui/material/Button';



const FilterToggleButton = ({ showFilterBox, onClick, text }) => {
    // 들어오는 text 값에 따라 다른 텍스트를 반환하는 함수
    const getDisplayText = (text) => {
      switch(text) {
        case 'term-deposits':
          return '예금';
        case 'savings':
          return '적금';
        case 'annuity-savings':
          return '연금';
        default:
          return text; // 기본값은 전달된 text 그대로 사용
      }
    };

  return (
    <Button
      size="large"
      variant={showFilterBox ? "outlined" : "contained"}
      onClick={onClick}
    >
      {getDisplayText(text)}
    </Button>
  );
};

export default FilterToggleButton;