import React from 'react';
import { Card, CardContent, CardHeader, Grid, useMediaQuery, useTheme } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

interface BookingCountsCardProps {
  title: string;
  count: number;
}

export const BookingCountsCard: React.FC<BookingCountsCardProps> = ({ title, count }) => {
    return (
      <Card sx={{ minWidth: 300, m: 1 }}>
        <CardHeader
          avatar={<AccessTimeIcon />}
          title={title}
        />
        <CardContent>
          Count: {count}
        </CardContent>
      </Card>
    );
  };