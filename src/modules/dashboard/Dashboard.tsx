import { useDashboard } from './hooks/useDashboards.ts';
import { Header } from '@/modules/dashboard/components/Header.tsx';
import { EmptyCard } from '@/modules/dashboard/components/EmptyCard.tsx';
import { ChartCard } from '@/modules/dashboard/components/ChartCard.tsx';
import { TextCard } from '@/modules/dashboard/components/TextCard.tsx';
import { useWidgets } from '@/modules/dashboard/hooks/useWidgets.ts';
import { adaptChartData } from '@/modules/dashboard/components/utils/adaptChartData.ts';

export const Dashboard = () => {
  const { data, isLoading, error } = useDashboard();
  const { data: widgets } = useWidgets('1');
  console.log('widgets', widgets);

  return (
    <div>
      <Header title="Dashboard" />
      <section className="p-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
        {widgets?.map((widget) => {
          if (widget.type === 'text') {
            return <TextCard key={widget.id} text={widget.data as string} />;
          }

          const { chartData, chartConfig, title, description } = adaptChartData(widget);

          return (
            <ChartCard
              key={widget.id}
              title={title}
              description={description}
              data={chartData}
              config={chartConfig}
              type={widget.type}
            />
          );
        })}

        <EmptyCard />
      </section>
    </div>
  );
};
