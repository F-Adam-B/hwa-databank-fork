import React from 'react';
import { Box, Typography } from '@mui/material';

interface AboutProps {
  // Define any props here if necessary
}

const AboutPage = (props: AboutProps) => {
  return (
    <Box sx={{ width: '100%', maxWidth: 800 }}>
      <Typography variant="h3">About Headwaters Alliance</Typography>
      <Typography variant="body1">
        Headwaters Alliance fosters a sustainable environmental and economic
        future for the URG basin in Southern Colorado through education,
        stewardship, and resource conservation. Their work involves hosting
        stewardship projects, community meetings with regulatory entities, and
        volunteer activities such as planting willows.
      </Typography>
      <Typography variant="body2">
        They also do watershed restoration through sampling and monitoring water
        and soil to guide construction projects that improve water quality and
        quantity while alleviating exposure to mine wastes in Mineral County.
        Headwaters Alliance is located in Creede, CO.
      </Typography>
    </Box>
  );
};

export default AboutPage;
