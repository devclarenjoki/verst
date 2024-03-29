import React, { useState } from 'react';

// @mui
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Card, Typography, Box, Divider, Stack, Icon } from '@mui/material';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';

// icons
import SendIcon from '@mui/icons-material/Send';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';

// components
import { textAlign } from '@mui/system';
// //

// import FullScreen from '../../portable/FullScreen';

// ----------------------------------------------------------------------

// const IconWrapperStyle = styled('div')(({ theme }) => ({
//   margin: 'auto',
//   display: 'flex',
//   borderRadius: '50%',
//   // alignItems: 'center',
//   width: theme.spacing(8),
//   height: theme.spacing(8),
//   justifyContent: 'center',
//   marginBottom: theme.spacing(3),
// }));

// ----------------------------------------------------------------------

MessagesSent.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  sx: PropTypes.object,
};

// const styles = {

// }

export default function MessagesSent({ title, total, icon, color = 'primary', sx, ...other }) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Card variant="outlined">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          m: 2,
        }}
      >
        <Typography variant="body2" fontSize={15}>Number of projects</Typography>
      </Box>
      <Stack direction="row" sx={{ display: 'flex', alignItems: 'center', m: 2, justifyContent: 'center' }}>
        <AccessTimeFilledIcon />
        <Typography variant="subtitle1" fontSize={20}>
          2
        </Typography>
      </Stack>
    </Card>
  );
}
