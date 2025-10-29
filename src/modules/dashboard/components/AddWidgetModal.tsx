import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/common/ui/dialog';
import { Button } from '@/common/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/common/ui/select';
import { useAddWidget } from '../hooks/useAddWidget';
import { Textarea } from '@/common/ui/textarea.tsx';

type WidgetType = 'lineChart' | 'barChart' | 'text';

interface AddWidgetModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dashboardId: number;
  position: number;
}

export const AddWidgetModal = ({
  open,
  onOpenChange,
  dashboardId,
  position,
}: AddWidgetModalProps) => {
  const [widgetType, setWidgetType] = useState<WidgetType>('lineChart');
  const [textValue, setTextValue] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  const { mutate, isPending } = useAddWidget(dashboardId);

  const handleSubmit = () => {
    setFormError(null);

    if (widgetType === 'text' && !textValue.trim()) {
      setFormError('Text is required for Text widget');
      return;
    }

    mutate(
      { type: widgetType, position, data: widgetType === 'text' ? textValue : undefined },
      {
        onError: (err: { message?: string }) => setFormError(err.message || 'Something went wrong'),
        onSuccess: () => {
          setTextValue('');
          setWidgetType('lineChart');
          onOpenChange(false);
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-primary">Add New Widget</DialogTitle>
        </DialogHeader>

        <div className="space-y-2 mt-2">
          <Select
            value={widgetType}
            onValueChange={(v) => {
              setWidgetType(v as WidgetType);
              setFormError(null);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select widget type" />
            </SelectTrigger>
            <SelectContent className="bg-secondary-foreground">
              <SelectItem value="lineChart">Line Chart</SelectItem>
              <SelectItem value="barChart">Bar Chart</SelectItem>
              <SelectItem value="text">Text</SelectItem>
            </SelectContent>
          </Select>

          {widgetType === 'text' && (
            <Textarea
              placeholder="Enter text"
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
              required
            />
          )}

          {formError && <p className="text-red-500 text-sm">{formError}</p>}
        </div>

        <DialogFooter className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isPending}>
            {isPending ? 'Adding...' : 'Add'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
