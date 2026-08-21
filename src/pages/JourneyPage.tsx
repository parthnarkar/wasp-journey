import { useState } from "react";
import { Timeline } from "../components/Timeline";
import { LogDrawer } from "../components/LogDrawer";
import { logEntries, LogEntry } from "../lib/logs";
import "../Main.css"

export function JourneyPage() {
    const [selectedEntry, setSelectedEntry] = useState<LogEntry | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    function openEntry(entry: LogEntry) {
        setSelectedEntry(entry);
        setIsDrawerOpen(true);
    }

    function closeDrawer() {
        setIsDrawerOpen(false);
    }

    return (
        <div className="max-w-[760px] mx-auto px-6 py-[4.5rem] pb-24 bg-paper text-ink font-mono antialiased">
            <header className="mb-14">
                <h1 className="text-[clamp(1.5rem,4vw,2.05rem)] font-bold tracking-[-0.01em] leading-[1.15] mb-[0.9rem]">
                    Parth&rsquo;s Journey with Wasp
                </h1>
                <p className="text-[0.9rem] text-ink-soft leading-[1.6] max-w-[40ch] mb-[0.85rem]">
                    A daily log of what I&rsquo;m learning, building and breaking with Wasp.
                </p>
                <p className="text-[0.72rem] tracking-[0.06em] uppercase text-ink-faint m-0">
                    daily logs / learning / building / open source
                </p>
            </header>

            <main>
                <Timeline
                    entries={logEntries}
                    onSelect={openEntry}
                    selectedSlug={isDrawerOpen ? selectedEntry?.slug : undefined}
                />
            </main>

            <footer className="mt-[4.5rem] text-[0.75rem] text-ink-faint">
                <a
                    href="https://wasp.sh"
                    target="_blank"
                    rel="noreferrer"
                    className="no-underline border-b border-border-strong transition-colors duration-150 ease-[cubic-bezier(0.2,0.7,0.2,1)] hover:text-ink hover:border-ink"
                >
                    built with wasp
                </a>
            </footer>

            <LogDrawer entry={selectedEntry} isOpen={isDrawerOpen} onClose={closeDrawer} />
        </div>
    );
}