import React, { useState, useEffect } from 'react';
import { MenuItem, FormControl, Select, Box, Typography } from '@mui/material';

const SortDropdown = ({ sortOptions = [], onSortChange }) => {
  const [selectedSortField, setSelectedSortField] = useState('');
  const [selectedSortOrder, setSelectedSortOrder] = useState('desc');

  useEffect(() => {
    if (sortOptions.length > 0) {
        setSelectedSortField(sortOptions[0].value);
      }
      console.log('Initial selectedSortField:', selectedSortField);
    }, [sortOptions]);

    const handleChange = () => {
      console.log('Sorting options changed:', { selectedSortField, selectedSortOrder });
      // `onSortChange` 함수에 변경된 정렬 옵션 전달
      onSortChange(selectedSortField, selectedSortOrder);
    };


  return (
    <Box sx={{ p: 1, border: '1px dashed grey' }} borderRadius={2}>
      <Box display="flex" alignItems="center" gap={2}>
        <FormControl size="small">
          <Typography variant="overline">정렬 기준</Typography>
          <Select
            value={selectedSortOption}
            onChange={handleSortFieldChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            sx={{ width: 300 }}
          >
            {sortOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.text}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small">
          <Typography variant="overline">정렬 순서</Typography>
          <Select
            defaultValue="selectedSortOrder"
            onChange={handleSortOrderChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Sort Order' }}
            sx={{ width: 300 }}
          >
            <MenuItem value="desc">높은 순으로 보기</MenuItem>
            <MenuItem value="asc">낮은 순으로 보기</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default SortDropdown;
