import { apiFetch } from '@/api/client';
import { useMutation, useQueryClient, type UseMutationResult } from '@tanstack/react-query';

export function useEditTextWidget(
  widgetId: number,
  dashboardId?: number,
): UseMutationResult<void, Error, string> {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: (text: string) =>
      apiFetch(`/widget/${widgetId}`, {
        method: 'PATCH',
        body: JSON.stringify({ data: text }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['widgets', dashboardId] });
    },
  });
}
