import React from "react";
import { FormControlLabel, Checkbox, Box, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';

const CheckboxGroup = ({ groupName, options, checked, setChecked }) => {
  
  const nameToKorean = {
    companies: "회사",
    intrRateType: "이자율 유형",
    saveTrm: "저축 기간",
    rsrvType: "적립 유형",
    paymPrd: "납입기간",
    pnsnRecpTrm: "연금수령기간",
  };
  
  const handleChange = (event) => {
    const { value, checked: isChecked } = event.target;
    const groupCheckedValues = checked[groupName] || [];
    const newGroupChecked = isChecked
      ? [...groupCheckedValues, value]
      : groupCheckedValues.filter(item => item !== value);

    setChecked(prev => ({ ...prev, [groupName]: newGroupChecked }));
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
                checked={checked[groupName]?.includes(option.value) || false}
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
