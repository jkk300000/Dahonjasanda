import React from "react";
import Collapse from "@mui/material/Collapse";
import FilterSection from "../FilterSection";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

const FilterPanel = ({
  showFilterBox,
  filterSections,
  checked,
  setChecked,
  onCheckboxChange,
}) => {
  console.log("3. FilterPanel props:", { showFilterBox, filterSections, checked });

  return (
    <Collapse in={showFilterBox}>
      <Box marginY={1} marginX={{ xs: -3, sm: -6 }}>
        <Divider />
      </Box>
      {filterSections.map((section, index) => {
        console.log(`Rendering FilterSection #${index}`, section);
        return (
          <FilterSection
            key={index}
            {...section}
            checked={checked}
            onCheckboxChange={onCheckboxChange}
            setChecked={setChecked}
          />
        );
      })}
    </Collapse>
  );
};

export default FilterPanel;
