"use client";

import {
  ArrowDownToLine,
  Braces,
  FolderKanban,
  Home,
  Layers,
  Mail,
  Moon,
  Sun,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command";
import { useTheme } from "@/components/ThemeProvider";
import { track } from "@/lib/track";

export type PaletteCaseStudy = { slug: string; title: string };

export function CommandPalette({
  caseStudies,
}: {
  caseStudies: PaletteCaseStudy[];
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => {
          if (!prev) track("command_palette_open");
          return !prev;
        });
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const run = useCallback((action: () => void) => {
    setOpen(false);
    // Let the dialog close before the side effect fires — avoids a frame
    // where the palette and the new scroll position both repaint.
    requestAnimationFrame(action);
  }, []);

  function scrollTo(id: string) {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function downloadResume() {
    track("resume_download");
    const a = document.createElement("a");
    a.href = "/resume.pdf";
    a.download = "resume.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <Command>
        <CommandInput placeholder="Jump to a section, project, or action…" />
        <CommandList>
          <CommandEmpty>No matches.</CommandEmpty>

          <CommandGroup heading="Sections">
          <CommandItem
            onSelect={() =>
              run(() => window.scrollTo({ top: 0, behavior: "smooth" }))
            }
          >
            <Home />
            Hero
          </CommandItem>
          <CommandItem onSelect={() => run(() => scrollTo("projects"))}>
            <FolderKanban />
            Projects
          </CommandItem>
          <CommandItem onSelect={() => run(() => scrollTo("stack"))}>
            <Layers />
            Stack
          </CommandItem>
          <CommandItem onSelect={() => run(() => scrollTo("contact"))}>
            <Mail />
            Contact
          </CommandItem>
        </CommandGroup>

        <CommandGroup heading="Case studies">
          {caseStudies.map((cs) => (
            <CommandItem
              key={cs.slug}
              value={`case ${cs.title}`}
              onSelect={() => run(() => router.push(`/work/${cs.slug}`))}
            >
              <Braces />
              {cs.title}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandGroup heading="Actions">
          <CommandItem
            onSelect={() =>
              run(() => {
                toggleTheme();
                track("theme_toggle");
              })
            }
          >
            {theme === "dark" ? <Sun /> : <Moon />}
            Switch to {theme === "dark" ? "light" : "dark"} mode
          </CommandItem>
          <CommandItem onSelect={() => run(downloadResume)}>
            <ArrowDownToLine />
            Download resume
            <CommandShortcut>.pdf</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  );
}
