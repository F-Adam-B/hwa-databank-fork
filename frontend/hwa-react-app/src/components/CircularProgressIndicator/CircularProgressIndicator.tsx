import React from 'react';

import { Box, CircularProgress } from '@mui/material';

const CircularProgressIndicator = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default CircularProgressIndicator;
