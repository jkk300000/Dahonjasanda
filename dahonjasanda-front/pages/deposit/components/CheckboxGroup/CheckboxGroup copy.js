import React from "react";
import { FormControlLabel, Checkbox, Box, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';

const CheckboxGroup = ({ groupName, options, checked, onCheckboxChange }) => {
  
  const nameToKorean = {
    companies: "회사",
    intrRateType: "이자율 유형",
    saveTrm: "저축 기간",
    rsrvType: "적립 유형",
    pnsnKind: "연금 종류",
    prdtType: "상품 유형",
  };
  
  const handleChange = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;
    // Log when a checkbox is clicked, its value, and its new checked state
    console.log(`Checkbox for "${value}" is now ${isChecked ? 'checked' : 'unchecked'}.`);

    const newChecked = isChecked ? [...checked, value] : checked.filter(item => item !== value);
    // Log the updated list of checked values
    console.log(`Updated checked values for "${groupName}":`, newChecked);

    onCheckboxChange(groupName, newChecked);
  };
  
  return (
    <Box sx={{ p: 1, border: '1px dashed grey' }} borderRadius={2}>
      <Typography variant="subtitle1" gutterBottom>
        {nameToKorean[groupName] || groupName}
        
      </Typography>
      <Divider />
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 0.1,
        '& .MuiFormControlLabel-root': {
          flexGrow: 0,
          flexShrink: 0,
          flexBasis: `calc((100% / 6))`, // 100% / 6 - total gap size (assuming gap is 16px, adjust accordingly)
          maxWidth: `calc((100% / 6))`, // Ensure items do not grow beyond this limit
        },
      }}>
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            control={
              <Checkbox
                checked={checked.includes(option.value)}
                onChange={handleChange}
                value={option.value}
                color="primary"
              />
            }
            label={option.name}
          />
        ))}
      </Box>
    </Box>
  );
};

export default CheckboxGroup;
