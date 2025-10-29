import { Card } from '@/common/ui/card.tsx';
import { PresentationChart } from '@phosphor-icons/react';

export const LoadingCard = () => {
  return (
    <Card className="relative min-h-[346px] flex flex-col items-center justify-center">
      <PresentationChart size={140} weight="fill" className="text-primary/40 animate-pulse-color" />
      <p className="text-muted-foreground mt-2">Loading data...</p>
    </Card>
  );
};
