import React from 'react';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';

export default function ColorModeSelect(props) {
  return (
    <IconButton 
      color="inherit" 
      {...props}
      onClick={() => alert('Theme toggling placeholder - using dark theme by default')}
    >
      <Brightness4Icon />
    </IconButton>
  );
}
