import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/common/ui/dialog';
import { Button } from '@/common/ui/button';
import { useEditTextWidget } from '@/modules/dashboard/hooks/useEditTextWidget';

interface EditTextModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dashboardId?: number;
  widgetId: number;
  currentText: string;
}

export const EditTextModal = ({
  open,
  onOpenChange,
  dashboardId,
  widgetId,
  currentText,
}: EditTextModalProps) => {
  const [text, setText] = useState(currentText);
  const [error, setError] = useState<string | null>(null);

  const { mutate, isPending } = useEditTextWidget(widgetId, dashboardId);

  // Reset text when modal opens
  useEffect(() => {
    if (open) {
      setText(currentText);
      setError(null);
    }
  }, [open, currentText]);

  const handleSave = () => {
    if (!text.trim()) {
      setError('Text cannot be empty');
      return;
    }

    mutate(text, {
      onSuccess: () => {
        onOpenChange(false);
      },
      onError: (err: { message?: string }) => {
        setError(err.message || 'Something went wrong');
      },
    });
  };

  const isSaveDisabled = !text.trim() || text === currentText || isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-primary">Edit Text Widget</DialogTitle>
        </DialogHeader>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full border border-border rounded p-2 resize-none h-32 focus:outline-none focus:ring-2 focus:ring-primary"
        />

        {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}

        <DialogFooter className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isSaveDisabled}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
