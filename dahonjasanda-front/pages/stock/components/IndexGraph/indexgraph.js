import { Typography } from '@mui/material';
import React from 'react';
import { Sparklines, SparklinesLine } from 'react-sparklines';

const IndexGraph = ({ data }) => {
  if (!data || data.length === 0) {
    return <Typography>로딩중..</Typography>;
  }
  
  const lastValue = data[data.length - 1];
  const prevValue = data[data.length - 2];
  const difference = lastValue - prevValue;

  const color = difference < 0 ? "red" : "blue";

  return (
      <Sparklines data={data}>
        <SparklinesLine color={color} />
      </Sparklines>
  );
}

export default IndexGraph;