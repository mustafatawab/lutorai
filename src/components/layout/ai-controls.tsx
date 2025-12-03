import { Wand2, Link, ScanLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

export function AIControls() {
  return (
    <div className="flex flex-col gap-4">
      <div className="mb-2 flex items-center gap-2">
        <Wand2 className="h-4 w-4 text-muted-foreground" />
        <h3 className="text-xs font-bold tracking-wider text-muted-foreground">
          AI COLORIST
        </h3>
      </div>

      <Button
        variant="outline"
        className="mb-4 w-full gap-2 border-red-900/50 bg-red-950/20 text-red-200 hover:bg-red-950/40 hover:text-red-100"
      >
        <Link className="h-3 w-3" />
        Connect Cloud API
      </Button>

      <div className="flex flex-col gap-4">
        <Card className="border-border/50 bg-background/50 p-4">
          <p className="mb-3 text-xs text-muted-foreground">
            Describe a specific mood or lighting condition. The AI will generate
            a parameter set for the GPU engine.
          </p>
          <Textarea
            placeholder="e.g., 'Dreamy 1980s Kodak film look, warm halation, nostalgic afternoon sun...'"
            className="min-h-[120px] resize-none border-border/50 bg-black/20 text-sm"
          />
        </Card>

        <Button className="w-full gap-2 bg-indigo-600 hover:bg-indigo-700">
          <Wand2 className="h-4 w-4" />
          Generate Custom Look
        </Button>

        <Button variant="secondary" className="w-full gap-2">
          <ScanLine className="h-4 w-4" />
          Analyze Source
        </Button>
      </div>
    </div>
  );
}
