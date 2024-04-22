import React from "react";
import Box from "@mui/material/Box";

import Main from "layouts/Main";
import Container from "components/Container";

import MyCalendar from "./components/MyCalendar";
import "./components/MyCalendar.module.css";

const Calendar = () => {
  return (
    <Main>
      <Box
        sx={{
          backgroundImage: "linear-gradient(#87CEEB, white, white, white)",
          minHeight: "100vh",
        }}
      >
        <Container>
          <MyCalendar />
        </Container>
      </Box>
    </Main>
  );
};

export default Calendar;
