import React from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { SidebarRight } from "@/components/layout/sidebar-right";

interface MobileSidebarRightProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function MobileSidebarRight({ isOpen, setIsOpen }: MobileSidebarRightProps) {
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent side="right" className="w-80 p-0">
        <SidebarRight />
      </SheetContent>
    </Sheet>
  );
}
