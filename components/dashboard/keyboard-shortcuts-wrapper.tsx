"use client";

import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Kbd } from "@/components/ui/kbd";

export function KeyboardShortcutsWrapper() {
  const { showHelp, setShowHelp } = useKeyboardShortcuts();

  return (
    <Dialog open={showHelp} onOpenChange={setShowHelp}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Keyboard Shortcuts</DialogTitle>
          <DialogDescription>
            Quickly navigate across the PR Panda dashboard with hotkeys.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-2 text-sm text-foreground/80">
          <div className="flex items-center justify-between border-b border-border/40 pb-2">
            <span>Go to Overview</span>
            <div className="flex gap-1 items-center">
              <Kbd>g</Kbd> <span className="text-muted-foreground text-xs">then</span> <Kbd>o</Kbd>
            </div>
          </div>
          <div className="flex items-center justify-between border-b border-border/40 pb-2">
            <span>Go to Repositories</span>
            <div className="flex gap-1 items-center">
              <Kbd>g</Kbd> <span className="text-muted-foreground text-xs">then</span> <Kbd>r</Kbd>
            </div>
          </div>
          <div className="flex items-center justify-between border-b border-border/40 pb-2">
            <span>Go to Pull Requests</span>
            <div className="flex gap-1 items-center">
              <Kbd>g</Kbd> <span className="text-muted-foreground text-xs">then</span> <Kbd>p</Kbd>
            </div>
          </div>
          <div className="flex items-center justify-between border-b border-border/40 pb-2">
            <span>Go to Settings</span>
            <div className="flex gap-1 items-center">
              <Kbd>g</Kbd> <span className="text-muted-foreground text-xs">then</span> <Kbd>s</Kbd>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span>Toggle Help Modal</span>
            <Kbd>?</Kbd>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
