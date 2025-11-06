import { BadgeCheck } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function VerifiedIcon({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <BadgeCheck
            className="text-green-500 w-5 h-5"
            role="img"
            aria-label="Artiste vérifié"
          />
        </TooltipTrigger>
        <TooltipContent>
          <p>Artiste vérifié</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
