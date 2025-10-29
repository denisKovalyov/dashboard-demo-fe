import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/api/client';
import type { Widget } from '@/modules/dashboard/types.ts';

export function useWidgets(id: string) {
  return useQuery({
    queryKey: ['widgets'],
    queryFn: () => apiFetch<Widget[]>(`/dashboard/${id}/widgets`),
  });
}
