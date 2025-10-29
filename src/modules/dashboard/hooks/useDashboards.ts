import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/api/client';

export function useDashboard() {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: () => apiFetch('/dashboard'),
  });
}
