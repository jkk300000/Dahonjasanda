import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

const SearchBox = ({ onSearch, checkedItems }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    // Log the current search term whenever it changes
    console.log("Search term updated from SearchBox:", newSearchTerm);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submit action
    // Log the search term when attempting to search
    console.log("Submitting search for from SearchBox:", searchTerm);
    console.log("Checked Items at the time of search from SearchBox:", checkedItems);
    onSearch(searchTerm);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card sx={{ p: 2 }}>
            <Box component="form" onSubmit={handleSubmit} display="flex" alignItems="center">
              <TextField
                fullWidth
                variant="outlined"
                color="primary"
                size="medium"
                placeholder="찾으시는 상품 키워드를 입력해주세요."
                value={searchTerm}
                onChange={handleChange} // Here, we're using handleChange correctly.
                sx={{ flexGrow: 3, mr: 2 }}


                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Box
                        component={'svg'}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        width={24}
                        height={24}
                        color={'primary.main'}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </Box>
                    </InputAdornment>
                  ),
                }}
                
              />
              <Button 
              sx={{ height: 54, whiteSpace: 'nowrap' }}
              variant="contained" color="primary" size="medium" type="submit">
                검색
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SearchBox;
