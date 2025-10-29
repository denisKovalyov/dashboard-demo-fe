import { Card, CardContent } from '@/common/ui/card.tsx';
import { Dropdown } from '@/modules/dashboard/components/Dropdown.tsx';

interface TextCardProps {
  text: string;
  onEdit: () => void;
  onRemove: () => void;
}

export const TextCard = ({ text, onEdit, onRemove }: TextCardProps) => {
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
