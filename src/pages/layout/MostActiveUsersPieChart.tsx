import React from 'react';
import { PieChart, Pie, Tooltip, Cell, Legend } from 'recharts';

interface UserData {
  user: string;
  count: number;
}

interface MostActiveUsersPieChartProps {
  data: UserData[];
}

const MostActiveUsersPieChart: React.FC<MostActiveUsersPieChartProps> = ({
  data,
}) => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  // Sort the data array in descending order based on count
  const sortedData = data.sort((a, b) => b.count - a.count);

  // Get the top 10 users with highest usage
  const topUsers = sortedData.slice(0, 10);

  const totalUsage = topUsers.reduce((total, user) => total + user.count, 0);

  return (
    <PieChart width={300} height={200}>
      <Tooltip />
      <Legend
        layout="horizontal"
        align="center"
        verticalAlign="bottom"
        iconType="square"
        iconSize={8}
        formatter={(value, entry) =>
          `${value} (${((entry.payload as unknown as UserData).count / totalUsage * 100).toFixed(2)}%)`
        }
        wrapperStyle={{ color: '#000' }}
      />
      <Pie
        dataKey="count"
        data={topUsers}
        outerRadius={80}
        innerRadius={50}
        label={false} // Disable labels inside the pie
      >
        {topUsers.map((entry, index) => (
          <Cell
            key={index}
            fill={COLORS[index % COLORS.length]}
            name={entry.user}
          />
        ))}
      </Pie>
    </PieChart>
  );
};

export default MostActiveUsersPieChart;
