import React from 'react';
import FilterToggleButton from '../FilterToggleButton'; // Ensure this path is correct
import Box from '@mui/material/Box';


const FilterToggleButtons = ({ activePanel, togglePanel, filterOptions }) => (
  <Box display="flex" gap={2} flexDirection={{ xs: 'column', sm: 'row' }} alignItems={{ xs: 'stretched', sm: 'flex-start' }} marginBottom={2}>
    {filterOptions.map(({ key, text }) => (
      <FilterToggleButton key={key} showFilterBox={activePanel === key} onClick={() => togglePanel(key)} text={text} />
    ))}
  </Box>
);

export default FilterToggleButtons;