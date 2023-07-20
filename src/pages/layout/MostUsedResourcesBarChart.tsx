import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

interface MostUsedResourcesBarChartProps {
  data: { resource: string; count: number; name: string }[];
}

const MostUsedResourcesBarChart: React.FC<MostUsedResourcesBarChartProps> = ({
  data,
}) => {
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
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="count" fill="#e91e63" label={renderCustomBarLabel} />
    </BarChart>
  );
};

export default MostUsedResourcesBarChart;
