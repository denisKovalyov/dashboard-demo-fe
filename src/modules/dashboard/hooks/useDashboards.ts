import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/api/client';
import type { Dashboard } from '@/modules/dashboard/types.ts';

export function useDashboard() {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: () => apiFetch<Dashboard[]>('/dashboard'),
  });
}
