import { Card, CardContent } from '@/common/ui/card.tsx';
import { Dropdown } from '@/modules/dashboard/components/Dropdown.tsx';
import { ArticleNyTimes } from '@phosphor-icons/react';

interface TextCardProps {
  text: string;
  onEdit: () => void;
  onRemove: () => void;
}

export const TextCard = ({ text, onEdit, onRemove }: TextCardProps) => {
  if (!text) {
    return (
      <Card className="relative min-h-[346px] flex flex-col items-center justify-center">
        <ArticleNyTimes size={140} weight="fill" className="text-primary/40" />
        <p className="text-muted-foreground mt-2">No data found</p>
      </Card>
    );
  }

  return (
    <Card className="h-[346px] p-6 relative">
      <div className="absolute top-2 right-2 opacity-70 group-hover:opacity-100 transition-opacity">
        <Dropdown onEdit={onEdit} onRemove={onRemove}></Dropdown>
      </div>

      <CardContent className="h-full overflow-hidden p-0 flex flex-col items-center justify-center">
        <p className="text-primary text-lg overflow-y-auto">{text}</p>
      </CardContent>
    </Card>
  );
};
