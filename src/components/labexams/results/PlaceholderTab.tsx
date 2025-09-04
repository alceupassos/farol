
import { HelpCircle } from 'lucide-react';

interface PlaceholderTabProps {
  title: string;
  description: string;
}

const PlaceholderTab = ({ title, description }: PlaceholderTabProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-64 border rounded-lg bg-muted/30">
      <HelpCircle className="h-10 w-10 text-muted-foreground mb-4" />
      <p className="text-muted-foreground text-center max-w-sm">
        {description}
      </p>
    </div>
  );
};

export default PlaceholderTab;
