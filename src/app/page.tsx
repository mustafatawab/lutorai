import { Header } from "@/components/layout/header";
import { SidebarLeft } from "@/components/layout/sidebar-left";
import { SidebarRight } from "@/components/layout/sidebar-right";
import { MainCanvas } from "@/components/layout/main-canvas";

export default function Home() {
  return (
    <div className="flex h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex flex-1 overflow-hidden">
        <SidebarLeft />
        <MainCanvas />
        <SidebarRight />
      </main>
    </div>
  );
}
