import { Film, Download, Settings2, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";

interface HeaderProps {
  setLeftSidebarOpen: (isOpen: boolean) => void;
  setRightSidebarOpen: (isOpen: boolean) => void;
}

export function Header({ setLeftSidebarOpen, setRightSidebarOpen }: HeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-background px-6">
      <div className="flex items-center gap-2">
        {/* Left Sidebar Toggle Button for Mobile */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setLeftSidebarOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </Button>

        <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-primary-foreground">
          <Film className="h-5 w-5" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold leading-none">
            Lutoria <span className="text-primary">AI</span>
          </span>
          <span className="text-[10px] text-muted-foreground">
            Turn your photos into films.
          </span>
        </div>
      </div>

      <div className="hidden md:block">
        <p className="text-xs font-medium tracking-widest text-muted-foreground">
          GET CINEMATIC FILM LOOK IN 1 CLICK
        </p>
        </div>

        <div className="flex items-center gap-2">
        <Button variant="secondary" size="sm" className="gap-2">
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">Download Now</span>
        </Button>

        <ThemeToggle />

        {/* Right Sidebar Toggle Button for Mobile */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setRightSidebarOpen(true)}
        >
          <Settings2 className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
