import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface MiniChartProps {
  data: number[];
  direction: 'up' | 'down' | 'neutral';
  className?: string;
}

export const MiniChart = ({ data, direction, className = '' }: MiniChartProps) => {
  if (data.length < 2) {
    return (
      <div className={`h-8 w-16 flex items-center justify-center ${className}`}>
        <div className="w-2 h-2 bg-neutral rounded-full" />
      </div>
    );
  }

  const chartData = data.map((value, index) => ({ value, index }));
  const strokeColor = direction === 'up' ? 'hsl(var(--chart-bull))' : 
                     direction === 'down' ? 'hsl(var(--chart-bear))' : 
                     'hsl(var(--neutral))';

  return (
    <div className={`h-8 w-16 ${className}`}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <Line
            type="monotone"
            dataKey="value"
            stroke={strokeColor}
            strokeWidth={1.5}
            dot={false}
            activeDot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};