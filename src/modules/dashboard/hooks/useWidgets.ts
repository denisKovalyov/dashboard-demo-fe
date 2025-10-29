import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/api/client';
import type { Widget } from '@/modules/dashboard/types.ts';

export function useWidgets(dashboardId?: number) {
  return useQuery({
    queryKey: ['widgets', dashboardId],
    queryFn: () => apiFetch<Widget[]>(`/dashboard/${dashboardId}/widgets`),
    enabled: !!dashboardId,
  });
}
