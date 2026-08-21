import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { LogEntry, formatEntryDate } from "../lib/logs";
import { MarkdownContent } from "./MarkdownContent";

type Props = {
    entry: LogEntry | null;
    isOpen: boolean;
    onClose: () => void;
};

export function LogDrawer({ entry, isOpen, onClose }: Props) {
    const closeButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (!isOpen) return;

        const previouslyFocused = document.activeElement as HTMLElement | null;
        closeButtonRef.current?.focus();
        document.body.style.overflow = "hidden";

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") onClose();
        }
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
            previouslyFocused?.focus();
        };
    }, [isOpen, onClose]);

    return createPortal(
        <div className={`fixed inset-0 z-50 pointer-events-none ${isOpen ? "pointer-events-auto" : ""}`}>
            <div
                className={`absolute inset-0 bg-[rgba(23,23,21,0.28)] transition-opacity duration-250 ease-[cubic-bezier(0.2,0.7,0.2,1)] ${isOpen ? "opacity-100" : "opacity-0"}`}
                onClick={onClose}
                aria-hidden="true"
            />
            <div
                className={`
          absolute bg-paper border-l border-border flex flex-col shadow-[-8px_0_24px_rgba(0,0,0,0.06)]
          top-0 right-0 bottom-0 w-[min(480px,92vw)] 
          transition-transform duration-280 ease-[cubic-bezier(0.2,0.7,0.2,1)]
          ${isOpen ? "translate-x-0" : "translate-x-full"}
          
          md:top-auto md:left-0 md:right-0 md:bottom-0 md:w-full md:h-[86vh] 
          md:border-l-0 md:border-t md:border-border md:rounded-t-[18px] 
          md:shadow-[0_-8px_24px_rgba(0,0,0,0.08)]
          md:${isOpen ? "translate-y-0" : "translate-y-full"}
        `}
                role="dialog"
                aria-modal="true"
                aria-hidden={!isOpen}
                aria-label={entry ? entry.title : "Daily log"}
            >
                {/* Mobile drag handle */}
                <div className="md:block hidden absolute top-[0.6rem] left-1/2 -translate-x-1/2 w-[34px] h-1 rounded-[2px] bg-border-strong" />

                {entry && (
                    <>
                        <div className="flex items-start justify-between gap-4 px-6 pt-6 pb-[1.1rem] border-b border-border flex-shrink-0 md:pt-[1.9rem]">
                            <div>
                                <span className="block text-[0.75rem] font-bold tracking-[0.04em] text-ink-faint mb-[0.35rem]">
                                    {formatEntryDate(entry.date)}
                                </span>
                                <h2 className="m-0 text-[1.05rem] font-bold leading-[1.35]">
                                    {entry.title}
                                </h2>
                            </div>
                            <button
                                ref={closeButtonRef}
                                type="button"
                                className="flex-shrink-0 w-[30px] h-[30px] flex items-center justify-center bg-transparent border border-border rounded-[4px] cursor-pointer transition-colors duration-150 ease-[cubic-bezier(0.2,0.7,0.2,1)] hover:border-ink hover:bg-card-bg"
                                onClick={onClose}
                                aria-label="Close daily log"
                                tabIndex={isOpen ? 0 : -1}
                            >
                                <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                                    <path
                                        d="M1 1L13 13M13 1L1 13"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto px-6 py-6 [-webkit-overflow-scrolling:touch]">
                            <MarkdownContent content={entry.body} />
                        </div>
                    </>
                )}
            </div>
        </div>,
        document.body
    );
}