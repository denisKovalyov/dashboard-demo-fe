import { Card, CardContent } from '@/common/ui/card.tsx';
import { Dropdown } from '@/modules/dashboard/components/Dropdown.tsx';

interface TextCardProps {
  text: string;
}

export const TextCard = ({ text }: TextCardProps) => {
  return (
    <Card className="max-h-[346px] p-6 relative">
      <div className="absolute top-2 right-2 opacity-70 group-hover:opacity-100 transition-opacity">
        <Dropdown onEdit={() => alert('edit')} onRemove={() => alert('remove')}></Dropdown>
      </div>

      <CardContent className="h-full overflow-y-auto p-0 flex flex-col items-center justify-center">
        <p className="text-primary text-lg ">{text}</p>
      </CardContent>
    </Card>
  );
};
