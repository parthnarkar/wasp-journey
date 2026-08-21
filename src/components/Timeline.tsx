import { useMemo } from "react";
import { LogEntry } from "../lib/logs";
import { TimelineEntry } from "./TimelineEntry";

type Props = {
    entries: LogEntry[];
    onSelect: (entry: LogEntry) => void;
    selectedSlug?: string;
};

export function Timeline({ entries, onSelect, selectedSlug }: Props) {
    const groupedByYear = useMemo(() => {
        const groups: [string, LogEntry[]][] = [];
        for (const entry of entries) {
            const year = entry.date.slice(0, 4);
            const lastGroup = groups[groups.length - 1];
            if (lastGroup && lastGroup[0] === year) {
                lastGroup[1].push(entry);
            } else {
                groups.push([year, [entry]]);
            }
        }
        return groups;
    }, [entries]);

    if (entries.length === 0) {
        return (
            <div className="pt-12 border-t border-border">
                <p className="m-0 text-[0.85rem] font-bold tracking-[0.08em] text-ink-soft">
                    NO LOGS YET.
                </p>
                <p className="m-0 text-[0.85rem] text-ink-faint">
                    The journey starts here.
                </p>
            </div>
        );
    }

    return (
        <div className="timeline">
            {groupedByYear.map(([year, yearEntries]) => (
                <div key={year} className="[&+&]:mt-11">
                    <div className="text-[0.78rem] font-bold tracking-[0.12em] text-ink-faint mb-[1.1rem]">
                        {year}
                    </div>
                    <div className="relative pl-[1.6rem] border-l border-border">
                        {yearEntries.map((entry) => (
                            <TimelineEntry
                                key={entry.slug}
                                entry={entry}
                                isSelected={entry.slug === selectedSlug}
                                onSelect={() => onSelect(entry)}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}