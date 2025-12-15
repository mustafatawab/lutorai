import React from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { SidebarLeft } from "@/components/layout/sidebar-left";

interface MobileSidebarLeftProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function MobileSidebarLeft({ isOpen, setIsOpen }: MobileSidebarLeftProps) {
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent side="left" className="w-80 p-0">
        <SidebarLeft />
      </SheetContent>
    </Sheet>
  );
}
