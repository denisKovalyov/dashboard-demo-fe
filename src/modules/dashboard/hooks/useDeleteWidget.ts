import { apiFetch } from '@/api/client';
import { useMutation, useQueryClient, type UseMutationResult } from '@tanstack/react-query';

export function useDeleteWidget(dashboardId?: number): UseMutationResult<void, Error, number> {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: (widgetId: number) =>
      apiFetch(`/widget/${widgetId}`, {
        method: 'DELETE',
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['widgets', dashboardId] });
    },
  });
}
