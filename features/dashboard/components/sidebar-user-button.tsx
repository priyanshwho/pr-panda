"use client";

import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Sun, Moon, SignOut } from "@phosphor-icons/react";
import { SidebarMenu, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { UserMenu, UserMenuUser } from "@/features/auth/components/user-menu";
import { authClient } from "@/lib/auth-client";
import { SIGN_IN_PATH } from "@/features/auth/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type SidebarUserButtonProps = {
  user: UserMenuUser;
  plan?: string;
};

export function SidebarUserButton({ user, plan }: SidebarUserButtonProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const { state } = useSidebar();
  const router = useRouter();
  const isDark = resolvedTheme === "dark";
  const isCollapsed = state === "collapsed";

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => router.push(SIGN_IN_PATH),
      },
    });
  };

  /* ── Collapsed: just avatar ── */
  if (isCollapsed) {
    return (
      <SidebarMenu>
        <SidebarMenuItem className="flex items-center justify-center">
          <UserMenu
            user={user}
            plan={plan}
            variant="compact"
            className="flex h-8 w-8 items-center justify-center rounded-full overflow-hidden"
          />
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  /* ── Expanded: [profile] [theme] [logout] ── */
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex items-center gap-1 w-full px-1 py-0.5">

          {/* Profile section — avatar + name opens dropdown */}
          <div className="flex-1 min-w-0">
            <UserMenu
              user={user}
              plan={plan}
              variant="profile"
              className="w-full [&_button]:h-9 [&_button]:w-full [&_button]:justify-start [&_button]:gap-2 [&_button]:px-2"
            />
          </div>

          {/* Theme toggle */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={() => setTheme(isDark ? "light" : "dark")}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors"
              >
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
            </TooltipTrigger>
            <TooltipContent side="top">
              {isDark ? "Switch to light mode" : "Switch to dark mode"}
            </TooltipContent>
          </Tooltip>

          {/* Logout */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={handleSignOut}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
              >
                <SignOut className="h-4 w-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="top">Log out</TooltipContent>
          </Tooltip>

        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
