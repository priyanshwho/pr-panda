"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutIcon,
  GitBranch,
  GithubLogo,
  Gear,
  Robot,
  ChartBar,
} from "@phosphor-icons/react";

import {
  DASHBOARD_NAV_ITEMS,
  type DashboardRoute,
} from "@/features/dashboard/lib/routes";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { AiPanel } from "@/features/ai-assistant/components/ai-panel";

const NAV_ICONS = {
  "layout-dashboard": LayoutIcon,
  "folder-git-2": GitBranch,
  github: GithubLogo,
  settings: Gear,
  robot: Robot,
  "chart-bar": ChartBar,
} as const;

function isNavActive(pathname: string, href: DashboardRoute) {
  if (href === "/dashboard") {
    return pathname === href;
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

type DashboardNavProps = {
  recentConversations?: Array<{
    id: string;
    title: string;
    updatedAt: string;
    preview: string;
  }>;
  showUsageWarning?: boolean;
};

export function DashboardNav({ recentConversations = [], showUsageWarning = false }: DashboardNavProps) {
  const pathname = usePathname();
  const [aiOpen, setAiOpen] = useState(false);

  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>Workspace</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu className="gap-1.5">
            {DASHBOARD_NAV_ITEMS.map((item) => {
              const Icon = NAV_ICONS[item.icon];
              const active = isNavActive(pathname, item.href);
              const isSettings = item.href.includes("settings");

              return (
                <SidebarMenuItem key={item.href} className="relative">
                  {active && (
                    <div className="absolute left-[-8px] top-1.5 bottom-1.5 w-[3px] rounded-r-md bg-amber-500 z-10" />
                  )}
                  <SidebarMenuButton
                    isActive={active}
                    tooltip={item.title}
                    render={
                      <Link href={item.href} className="flex items-center w-full justify-between">
                        <span className="flex items-center gap-2">
                          <Icon />
                          <span>{item.title}</span>
                        </span>
                        {isSettings && showUsageWarning && (
                          <span className="ml-auto inline-flex items-center rounded-md bg-amber-500/20 px-1.5 py-0.5 text-[10px] font-medium text-amber-600 dark:text-amber-400 ring-1 ring-inset ring-amber-500/30">
                            Near Limit
                          </span>
                        )}
                      </Link>
                    }
                  />
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      {/* AI Assistant — opens a slide-in panel, not a page link */}
      <SidebarGroup>
        <SidebarGroupLabel>AI</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="AI Assistant"
                onClick={() => setAiOpen(true)}
                render={
                  <button type="button" className="flex w-full items-center gap-2">
                    <span className="relative flex items-center">
                      <Robot />
                      {/* Pulsing amber dot indicator */}
                      <span className="absolute -right-0.5 -top-0.5 flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
                      </span>
                    </span>
                    <span>AI Assistant</span>
                  </button>
                }
              />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <AiPanel
        isOpen={aiOpen}
        onClose={() => setAiOpen(false)}
        recentConversations={recentConversations}
      />
    </>
  );
}
