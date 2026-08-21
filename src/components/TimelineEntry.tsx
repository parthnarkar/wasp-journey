import { LogEntry, formatEntryDate } from "../lib/logs";

type Props = {
    entry: LogEntry;
    isSelected: boolean;
    onSelect: () => void;
};

export function TimelineEntry({ entry, isSelected, onSelect }: Props) {
    return (
        <div className="relative [&+&]:mt-[0.85rem]">
            <span
                className="absolute -left-[1.68rem] top-[1.35rem] w-[7px] h-[7px] bg-paper border-[1.5px] border-border-strong rotate-45 transition-colors duration-150 ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:bg-ink group-hover:border-ink"
                aria-hidden="true"
            />
            <button
                type="button"
                className="w-full text-left bg-card-bg border border-border rounded-[8px] px-[1.15rem] py-[0.95rem] cursor-pointer transition-all duration-150 ease-[cubic-bezier(0.2,0.7,0.2,1)] hover:border-border-strong hover:translate-x-[3px] group aria-pressed:border-ink aria-pressed:shadow-[0_1px_0_var(--ink)]"
                onClick={onSelect}
                aria-pressed={isSelected}
            >
                <span className="block text-[0.78rem] font-bold tracking-[0.03em] text-ink-soft mb-[0.3rem]">
                    {formatEntryDate(entry.date)}
                </span>
                <span className="block text-[0.92rem] font-medium leading-[1.45]">
                    {entry.title}
                </span>
            </button>
        </div>
    );
}