import { History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";

const PRESETS = [
  {
    id: "dune",
    title: "Dune (Arrakis)",
    description: "Desert heat. Golden highlights, muted cyan...",
    color: "bg-orange-900/20 dark:bg-orange-500/10",
  },
  {
    id: "tenet",
    title: "Tenet",
    description: "Blockbuster Teal & Orange. Deep clean blacks,...",
    color: "bg-blue-900/20 dark:bg-blue-500/10",
  },
  {
    id: "joker",
    title: "Joker",
    description: "Psychological thriller. Unsettling greens, industri...",
    color: "bg-green-900/20 dark:bg-green-500/10",
  },
  {
    id: "batman",
    title: "The Batman",
    description: "Noir Gothic. Deep blacks, muted colors, red-ton...",
    color: "bg-red-900/20 dark:bg-red-500/10",
  },
  {
    id: "golden",
    title: "Golden Hour",
    description: "Magic Hour. Rich oranges, soft shadows, bloom...",
    color: "bg-yellow-900/20 dark:bg-yellow-500/10",
  },
];

export function SidebarLeft() {
  return (
    <div className="flex w-80 flex-col border-r border-border bg-card/50 dark:bg-card/80">


      <div className="flex items-center justify-between px-4 pb-2 pt-4">
        <h3 className="text-xs font-bold tracking-wider text-muted-foreground">
          LOOKS LIBRARY
        </h3>
        <Button variant="ghost" size="icon" className="h-6 w-6">
          <History className="h-3 w-3" />
        </Button>
      </div>

      <ScrollArea className="flex-1 px-4 pb-4">
        <div className="flex flex-col gap-2">
          {PRESETS.map((preset) => (
            <Card
              key={preset.id}
              className={`cursor-pointer border-border/50 bg-background/50 p-3 transition-colors hover:bg-accent dark:bg-background/80 ${preset.color}`}
            >
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium">{preset.title}</span>
                <span className="line-clamp-2 text-xs text-muted-foreground">
                  {preset.description}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
