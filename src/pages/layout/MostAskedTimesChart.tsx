  import React from 'react';
  import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
  } from 'recharts';

  interface MostAskedTimesChartProps {
    data: { datetime: string; count: number }[];
  }

  const MostAskedTimesChart: React.FC<MostAskedTimesChartProps> = ({ data }) => {
    const renderCustomBarLabel = (props: any) => {
      const { x, y, width, value } = props;
      const xPos = x + width / 2;
      return (
        <text
          x={xPos}
          y={y}
          fill="#666"
          textAnchor="middle"
          dy={-6}
          fontSize={12}
        >
          {value}
        </text>
      );
    };

    return (
      <BarChart width={300} height={200} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="datetime" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#2196f3" label={renderCustomBarLabel} />
      </BarChart>
    );
  };

  export default MostAskedTimesChart;
