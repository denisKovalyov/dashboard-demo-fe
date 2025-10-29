import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/common/ui/dialog';
import { Button } from '@/common/ui/button';
import { useDeleteWidget } from '../hooks/useDeleteWidget.ts';

interface DeleteWidgetModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dashboardId?: number;
  widgetId: number;
}

export const DeleteWidgetModal = ({
  open,
  onOpenChange,
  dashboardId,
  widgetId,
}: DeleteWidgetModalProps) => {
  const { mutate, isPending, error } = useDeleteWidget(dashboardId);

  const handleDelete = () => {
    mutate(widgetId, {
      onSuccess: () => onOpenChange(false),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-primary">Delete Widget</DialogTitle>
        </DialogHeader>

        <p className="text-gray-700">
          Are you sure you want to delete this widget? This action cannot be undone.
        </p>

        {error && <p className="text-red-500">{error.message}</p>}

        <DialogFooter className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isPending}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
