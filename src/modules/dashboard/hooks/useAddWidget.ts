import { apiFetch } from '@/api/client';
import { useMutation, useQueryClient, type UseMutationResult } from '@tanstack/react-query';
import type { Widget, WidgetType } from '@/modules/dashboard/types.ts';

export interface AddWidgetPayload {
  type: WidgetType;
  position: number;
  data?: string;
}

export function useAddWidget(
  dashboardId: number,
): UseMutationResult<Widget, Error, AddWidgetPayload> {
  const queryClient = useQueryClient();

  return useMutation<Widget, Error, AddWidgetPayload>({
    mutationFn: (payload: AddWidgetPayload) =>
      apiFetch<Widget>(`/widget`, {
        method: 'POST',
        body: JSON.stringify({
          dashboardId,
          ...payload,
        }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['widgets', dashboardId] });
    },
  });
}
