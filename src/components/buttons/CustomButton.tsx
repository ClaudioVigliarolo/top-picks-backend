import { Button } from '@material-ui/core';
import { COLORS } from '../../constants/colors';

import React from 'react';

export default function CustomAlert({
  color = COLORS.primaryOrange,
  title,
  onClick,
}: {
  color?: string;
  title: string;
  onClick: any;
}) {
  return (
    <Button
      variant="contained"
      style={{
        backgroundColor: color,
        color: 'white',
      }}
      onClick={onClick}
    >
      {title}
    </Button>
  );
}
