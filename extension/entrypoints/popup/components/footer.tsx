import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

export default function Footer() {
  return (
    <TooltipProvider>
      <div
        className="neo-box-sm"
        style={{
          backgroundColor: "var(--neo-accent)",
          padding: "12px",
          fontSize: "13px",
          lineHeight: "1.4",
          fontWeight: "600",
          color: "#000",
        }}
      >
        STAY SHIELDED. We crush annoying ads and unsafe trackers for a brutal
        browsing experience.
        <span
          style={{
            marginLeft: "8px",
            verticalAlign: "middle",
            cursor: "help",
          }}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <Info size={18} strokeWidth={3} />
            </TooltipTrigger>
            <TooltipContent
              side="top"
              className="neo-box-sm"
              style={{ backgroundColor: "#fff", fontWeight: "bold" }}
            >
              <span>BLOCKS EVERYTHING • PURE PRIVACY</span>
            </TooltipContent>
          </Tooltip>
        </span>
      </div>
    </TooltipProvider>
  );
}
