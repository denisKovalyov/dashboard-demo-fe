import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/common/ui/dropdown-menu.tsx';
import { Button } from '@/common/ui/button.tsx';
import { Edit2, MoreVertical, Trash2 } from 'lucide-react';

interface DropdownProps {
  onRemove: () => void;
  onEdit?: () => void;
}

export const Dropdown = ({ onEdit, onRemove }: DropdownProps) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button
        variant="ghost"
        size="icon"
        className="
                h-8 w-8 rounded-full
                text-muted-foreground
                hover:text-primary
                hover:bg-primary/10
                focus-visible:ring-1 focus-visible:ring-primary/40
              "
      >
        <MoreVertical className="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="w-36 mt-1 bg-secondary-foreground">
      {onEdit && (
        <DropdownMenuItem onClick={onEdit}>
          <Edit2 className="h-4 w-4 mr-2 text-secondary" /> Edit
        </DropdownMenuItem>
      )}
      <DropdownMenuItem onClick={onRemove}>
        <Trash2 className="h-4 w-4 mr-2 text-red-400" /> Remove
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);
