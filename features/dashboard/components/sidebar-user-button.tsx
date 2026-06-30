"use client";

import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Sun, Moon, SignOut } from "@phosphor-icons/react";
import { SidebarMenu, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { UserMenu, UserMenuUser } from "@/features/auth/components/user-menu";
import { authClient } from "@/lib/auth-client";
import { SIGN_IN_PATH } from "@/features/auth/utils";

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
        <div className="flex items-center gap-1.5 w-full px-1.5 py-1">

          {/* Profile section — avatar + name opens dropdown */}
          <div className="flex-grow min-w-0">
            <UserMenu
              user={user}
              plan={plan}
              variant="profile"
              className="w-full flex items-center justify-start gap-2 h-9 px-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-lg transition-colors border border-transparent"
            />
          </div>

          {/* Theme toggle */}
          <button
            type="button"
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors cursor-pointer border border-transparent"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {/* Logout */}
          <button
            type="button"
            title="Log out"
            onClick={handleSignOut}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors cursor-pointer border border-transparent"
          >
            <SignOut className="h-4 w-4" />
          </button>

        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
