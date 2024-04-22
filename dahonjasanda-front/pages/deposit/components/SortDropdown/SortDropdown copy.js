import React, { useEffect } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';
import { depositsApiClient } from '../../DepositsApiService'; // Axios 설정 파일의 경로를 정확히 지정하세요.

const SortDropdown = ({ updateData, activePanel, sortField, sortOrder, handleSortFieldChange, handleSortOrderChange, sortOptions }) => {

  const fetchSortedData = async () => {
    try {
      const panelPath = activePanel.toLowerCase().replace(/ /g, "-");
      const response = await depositsApiClient.get(`/${panelPath}?sortField=${sortField}&sortOrder=${sortOrder}`);
      updateData(response.data);
    } catch (error) {
      console.error('Fetching sorted data failed:', error);
    }
  };

  useEffect(() => {
    if (sortField && sortOrder && activePanel) {
      fetchSortedData();
    }
  }, [sortField, sortOrder, activePanel]);

  return (
    <Box sx={{ p: 1, border: '1px dashed grey' }} borderRadius={2}>
        <Box display="flex" alignItems="center" gap={2}>
        <Typography variant="body1">정렬 방법:</Typography>
        <FormControl size="small">
            <InputLabel id="sort-field-select-label">기준</InputLabel>
            <Select
            labelId="sort-field-select-label"
            id="sort-field-select"
            value={sortField}
            label="기준"
            onChange={handleSortFieldChange}
            sx={{ width: 150 }} // 드롭다운 너비 조절
            >
                {activePanel === "예금" && (
                <>
                    <MenuItem value="intrRate">기본금리</MenuItem>
                    <MenuItem value="intrRate2">최고금리</MenuItem>
                </>
                )}
                {activePanel === "적금" && (
                <>
                    <MenuItem value="intrRate">기본금리</MenuItem>
                    <MenuItem value="intrRate2">최고금리</MenuItem>
                </>
                )}
                {activePanel === "연금" && (
                <>
                    <MenuItem value="monPaymAtm">월납입금액</MenuItem>
                    <MenuItem value="pnsnRecpAmt">연금수령금액</MenuItem>
                </>
                )}

            </Select>
        </FormControl>
        <FormControl size="small">
            <InputLabel id="sort-order-select-label">순서</InputLabel>
            <Select
            labelId="sort-order-select-label"
            id="sort-order-select"
            value={sortOrder}
            label="순서"
            onChange={handleSortOrderChange}
            sx={{ width: 150 }} // 드롭다운 너비 조절
            >
              {activePanel === "예금" && (
                <>
                    <MenuItem value="desc">금리 높은 순으로 보기</MenuItem>
                    <MenuItem value="asc">금리 낮은 순으로 보기</MenuItem>
                </>
              )}
              {activePanel === "적금" && (
                <>
                    <MenuItem value="desc">금리 높은 순으로 보기</MenuItem>
                    <MenuItem value="asc">금리 낮은 순으로 보기</MenuItem>
                </>
              )}
              {activePanel === "연금" && (
                <>
                    <MenuItem value="desc">높은 순으로 보기</MenuItem>
                    <MenuItem value="asc">낮은 순으로 보기</MenuItem>
                </>
              )}
            
            </Select>
        </FormControl>
        </Box>
    </Box>
  );
};

export default SortDropdown;