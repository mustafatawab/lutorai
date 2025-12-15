"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { SidebarLeft } from "@/components/layout/sidebar-left";
import { SidebarRight } from "@/components/layout/sidebar-right";
import { MainCanvas } from "@/components/layout/main-canvas";
import { MobileSidebarLeft } from "@/components/layout/mobile-sidebar-left";
import { MobileSidebarRight } from "@/components/layout/mobile-sidebar-right";

export default function Home() {
  const [isLeftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setRightSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen flex-col bg-background text-foreground">
      <Header
        setLeftSidebarOpen={setLeftSidebarOpen}
        setRightSidebarOpen={setRightSidebarOpen}
      />
      <main className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebars */}
        <div className="hidden md:flex flex-none">
          <SidebarLeft />
        </div>
        {/* Mobile Sidebars (hidden on desktop) */}
        <MobileSidebarLeft
          isOpen={isLeftSidebarOpen}
          setIsOpen={setLeftSidebarOpen}
        />

        <MainCanvas />

        {/* Desktop Sidebars */}
        <div className="hidden md:flex flex-none">
          <SidebarRight />
        </div>
        {/* Mobile Sidebars (hidden on desktop) */}
        <MobileSidebarRight
          isOpen={isRightSidebarOpen}
          setIsOpen={setRightSidebarOpen}
        />
      </main>
    </div>
  );
}

