import { CartesianGrid, Line, LineChart, BarChart, Bar, XAxis } from 'recharts';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/common/ui/card';
import { PresentationChart } from '@phosphor-icons/react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/common/ui/chart';
import { Dropdown } from '@/modules/dashboard/components/Dropdown';
import type { WidgetType } from '@/modules/dashboard/types.ts';

type ChartCardProps = {
  title: string;
  description?: string;
  data: any[];
  config: Record<string, { label: string }>; // no color needed
  type: WidgetType;
  loading?: boolean;
};

const chartColors = [
  'var(--color-chart-1)',
  'var(--color-chart-2)',
  'var(--color-chart-3)',
  'var(--color-chart-4)',
  'var(--color-chart-5)',
  'var(--color-chart-6)',
  'var(--color-chart-7)',
];

export const ChartCard = ({
  title,
  description,
  data,
  config,
  type = 'lineChart',
  loading = false,
}: ChartCardProps) => {
  const hasData = data && data.length > 0;

  if (loading || !hasData) {
    return (
      <Card className="relative min-h-[346px] flex flex-col items-center justify-center">
        <PresentationChart
          size={140}
          weight="fill"
          className="text-primary/40 animate-pulse-color"
        />
        <p className="text-muted-foreground mt-2">Waiting for data...</p>
      </Card>
    );
  }

  const keys = Object.keys(config);

  return (
    <Card className="relative min-h-[346px] group">
      <div className="absolute top-2 right-2 opacity-70 group-hover:opacity-100 transition-opacity">
        <Dropdown onRemove={() => alert('remove')} />
      </div>

      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>

      <CardContent>
        <ChartContainer config={config as ChartConfig} className="h-48 w-full flex">
          {type === 'lineChart' ? (
            <LineChart accessibilityLayer data={data} margin={{ left: 12, right: 12 }}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey={Object.keys(data[0])[0]}
                tickLine={false}
                axisLine={false}
                tickMargin={0}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              {keys.map((key, i) => (
                <Line
                  key={key}
                  dataKey={key}
                  type="natural"
                  stroke={chartColors[i % chartColors.length]}
                  strokeWidth={2}
                  dot={false}
                />
              ))}
            </LineChart>
          ) : (
            <BarChart accessibilityLayer data={data} margin={{ left: 12, right: 12 }}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey={Object.keys(data[0])[0]}
                tickLine={false}
                axisLine={false}
                tickMargin={0}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              {keys.map((key, i) => (
                <Bar
                  key={key}
                  dataKey={key}
                  fill={chartColors[i % chartColors.length]}
                  radius={[6, 6, 0, 0]}
                />
              ))}
            </BarChart>
          )}
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="text-muted-foreground leading-none">Showing data for the last 7 days</div>
      </CardFooter>
    </Card>
  );
};
