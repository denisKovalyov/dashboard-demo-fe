import { useState } from 'react';
import { useDashboard } from './hooks/useDashboards.ts';
import { useWidgets } from '@/modules/dashboard/hooks/useWidgets.ts';
import { adaptChartData } from '@/modules/dashboard/components/utils/adaptChartData.ts';
import { Header } from '@/modules/dashboard/components/Header.tsx';
import { EmptyCard } from '@/modules/dashboard/components/EmptyCard.tsx';
import { ChartCard } from '@/modules/dashboard/components/ChartCard.tsx';
import { TextCard } from '@/modules/dashboard/components/TextCard.tsx';
import { AddWidgetModal } from '@/modules/dashboard/components/AddWidgetModal.tsx';
import { EditTextModal } from '@/modules/dashboard/components/EditTextModal.tsx';
import { DeleteWidgetModal } from '@/modules/dashboard/components/DeleteWidgetModal.tsx';
import { LoadingCard } from '@/modules/dashboard/components/LoadingCard.tsx';

export const Dashboard = () => {
  const [addOpen, setAddOpen] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [editingWidgetId, setEditingWidgetId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState<string>('');

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteWidgetId, setDeleteWidgetId] = useState<number | null>(null);

  const { data: dashboards, isLoading: isDashboardsLoading, error: dashboardErr } = useDashboard();
  const defaultDashboard = dashboards?.[0];
  const dashboardId = defaultDashboard?.id;

  const { data: widgets, isLoading: isWidgetsLoading } = useWidgets(dashboardId);

  const handleEditClick = (widgetId: number, currentText: string) => {
    setEditingWidgetId(widgetId);
    setEditingText(currentText);
    setIsEditing(true);
  };

  const openDelete = (widgetId: number) => {
    setDeleteWidgetId(widgetId);
    setDeleteOpen(true);
  };

  if (isDashboardsLoading) return <div className="p-4 text-primary border-b border-gray-200">Loading dashboards...</div>;

  return (
    <div>
      {dashboardErr ? (
        <p className="border-b border-red-400 p-4 text-red-500">Error on dashboard loading</p>
      ) : (
        <Header title={defaultDashboard?.name || 'Dashboard'} />
      )}

      <section className="p-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
        {isWidgetsLoading && defaultDashboard ? (
          Array.from({ length: defaultDashboard.widgetCount }, (_, i) => <LoadingCard key={i} />)
        ) : (
          <>
            {widgets?.map((widget) => {
              if (widget.type === 'text') {
                return (
                  <TextCard
                    key={widget.id}
                    text={widget.data as string}
                    onEdit={() => handleEditClick(widget.id, widget.data as string)}
                    onRemove={() => openDelete(widget.id)}
                  />
                );
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
                  onRemove={() => openDelete(widget.id)}
                />
              );
            })}

            <EmptyCard onClick={() => setAddOpen(true)} />
          </>
        )}
      </section>

      {addOpen && dashboardId && (
        <AddWidgetModal
          open={addOpen}
          onOpenChange={setAddOpen}
          dashboardId={dashboardId}
          position={(widgets?.length || 0) + 1}
        />
      )}

      {isEditing && dashboardId && editingWidgetId !== null && (
        <EditTextModal
          open={isEditing}
          onOpenChange={setIsEditing}
          dashboardId={dashboardId}
          widgetId={editingWidgetId}
          currentText={editingText}
        />
      )}

      {deleteOpen && deleteWidgetId !== null && (
        <DeleteWidgetModal
          open={deleteOpen}
          onOpenChange={setDeleteOpen}
          dashboardId={dashboardId!}
          widgetId={deleteWidgetId}
        />
      )}
    </div>
  );
};
