import { AIControls } from "@/components/layout/ai-controls";

export function SidebarRight() {
  return (
    <div className="hidden w-80 flex-col border-l border-border bg-card/50 p-4 lg:flex dark:bg-card/80">
      <AIControls />
    </div>
  );
}
