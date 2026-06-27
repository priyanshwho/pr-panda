import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function useKeyboardShortcuts() {
  const router = useRouter();
  const [showHelp, setShowHelp] = useState(false);
  const [pressedG, setPressedG] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore key events when typing inside inputs, textareas or editables
      const activeEl = document.activeElement;
      if (
        activeEl?.tagName === "INPUT" ||
        activeEl?.tagName === "TEXTAREA" ||
        (activeEl as HTMLElement)?.isContentEditable
      ) {
        return;
      }

      if (pressedG) {
        setPressedG(false);
        if (e.key === "o") {
          e.preventDefault();
          router.push("/dashboard");
        } else if (e.key === "r") {
          e.preventDefault();
          router.push("/dashboard/repos");
        } else if (e.key === "p") {
          e.preventDefault();
          router.push("/dashboard/pull-requests");
        } else if (e.key === "s") {
          e.preventDefault();
          router.push("/dashboard/settings");
        }
      } else {
        if (e.key === "g") {
          setPressedG(true);
          timeout = setTimeout(() => {
            setPressedG(false);
          }, 1000);
        } else if (e.key === "?" || e.key === "/") {
          e.preventDefault();
          setShowHelp((prev) => !prev);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timeout);
    };
  }, [pressedG, router]);

  return { showHelp, setShowHelp };
}
