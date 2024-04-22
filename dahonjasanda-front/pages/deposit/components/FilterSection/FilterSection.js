import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CheckboxGroup from '../CheckboxGroup';
import Divider from '@mui/material/Divider';
// import SortDropdown from '../SortDropdown/SortDropdown';


const FilterSection = ({ title, groups, checked, setChecked, onCheckboxChange }) => {
  
  // const safeChecked = checked || {};
  
  // title에 따른 한글 텍스트 변환
  const getTranslatedTitle = (titleKey) => {
    switch(titleKey) {
      case 'term-deposits':
        return '예금';
      case 'savings':
        return '적금';
      case 'annuity-savings':
        return '연금';
      default:
        return titleKey; // 알려지지 않은 key면 기본값을 그대로 사용
    }
  };

  const handleCheckboxChange = (groupName, newChecked) => {
    // console.log(`Checkbox change in '${groupName}':`, newChecked); // 체크박스 변경 로그 추가
    onCheckboxChange(groupName, newChecked);
  };

    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          {getTranslatedTitle(title)}
        </Typography>
        
        {groups.map((group, index) => {
          // console.log(`Group name: ${group.name}, Checked values:`, checked[group.name] || []); // 그룹명과 체크된 값들에 대한 로그 추가
          return (
            <CheckboxGroup
              key={index}
              groupName={group.name}
              options={group.options}
              // checked={safeChecked[group.name] || []}
              checked={checked}
              setChecked={setChecked}
              onCheckboxChange={handleCheckboxChange}
            />
          );
        })}
        {/* Positioning SortDropdown here applies sorting to the entire section */}
        {/* <SortDropdown 
          sortOptions={sortOptions} 
          onSortChange={onSortChange} 
        /> */}
      </Box>
    );
  };

export default FilterSection;