import React, { useState } from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

const SearchBox = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSearch = () => {
    let path = "";

    if (selectedCategory === "housing") {
      path =
        "/housing/housingMap?transactionType=&location=&propertyType=&searchValue=";
    } else if (selectedCategory === "board") {
      path = "/board/list?page=1&searchType=all&searchValue=";
    } else {
      // Default category
      path = "/default/list?page=1&searchType=all&searchValue=";
    }

    window.location.href = path + encodeURIComponent(searchValue);
  };

  const handleCheckboxChange = (event) => {
    setSelectedCategory(event.target.checked ? event.target.value : null);
  };

  return (
    <Box>
      <Box
        padding={2}
        width={1}
        component={Card}
        boxShadow={4}
        marginBottom={4}
      >
        <form noValidate autoComplete="off">
          <Box display="flex" alignItems="center">
            <Box width={1} marginRight={1}>
              <TextField
                sx={{
                  height: 54,
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "0 !important",
                  },
                }}
                variant="outlined"
                color="primary"
                size="medium"
                placeholder="청약공고,관심지역을 검색해보세요"
                fullWidth
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Box
                        component={"svg"}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        width={24}
                        height={24}
                        color={"primary.main"}
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
            </Box>
            <Box>
              <FormControlLabel
                sx={{ minWidth: 100 }}
                control={
                  <Checkbox
                    checked={selectedCategory === "housing"}
                    onChange={handleCheckboxChange}
                    value="housing"
                  />
                }
                label="부동산 "
              />
            </Box>
            <Box>
              <FormControlLabel
                sx={{ minWidth: 100 }}
                control={
                  <Checkbox
                    checked={selectedCategory === "board"}
                    onChange={handleCheckboxChange}
                    value="board"
                  />
                }
                label="게시판 "
              />
            </Box>
            <Box>
              <Button
                sx={{ height: 54, minWidth: 100, whiteSpace: "nowrap" }}
                variant="contained"
                color="primary"
                size="medium"
                fullWidth
                onClick={handleSearch}
                disabled={!selectedCategory}
              >
                검색
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default SearchBox;
