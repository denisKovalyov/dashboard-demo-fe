import { Card } from '@/common/ui/card.tsx';
import { Button } from '@/common/ui/button';
import { Plus } from 'lucide-react';

interface EmptyCardProps {
  onClick: () => void;
}

export const EmptyCard = ({ onClick }: EmptyCardProps) => {
  return (
    <Card className="min-h-[346px] p-6 flex items-center justify-center">
      <Button onClick={onClick} variant="default" size="icon" className="rounded-full h-12 w-12">
        <Plus className="stroke-[3] !w-7 !h-7" />
      </Button>
    </Card>
  );
};
