export type LogEntry = {
    slug: string;
    date: string; // YYYY-MM-DD, from frontmatter (falls back to filename)
    title: string;
    description: string;
    body: string; // markdown body, frontmatter stripped
};

/**
 * Deliberately tiny frontmatter parser instead of pulling in gray-matter.
 * We only ever need flat string fields (date, title, description), so a
 * real YAML parser would be overkill for this app.
 */
function parseFrontmatter(raw: string): { data: Record<string, string>; body: string } {
    const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
    if (!match) {
        return { data: {}, body: raw.trim() };
    }
    const [, frontmatter, body] = match;
    const data: Record<string, string> = {};
    for (const line of frontmatter.split(/\r?\n/)) {
        const colonIndex = line.indexOf(":");
        if (colonIndex === -1) continue;
        const key = line.slice(0, colonIndex).trim();
        const value = line
            .slice(colonIndex + 1)
            .trim()
            .replace(/^["']|["']$/g, "");
        if (key) data[key] = value;
    }
    return { data, body: body.trim() };
}

// Vite-native: load every markdown file in this folder as raw text at
// build time. No backend, no database — the files are the source of truth.
const modules = import.meta.glob("../content/logs/*.md", {
    query: "?raw",
    import: "default",
    eager: true,
}) as Record<string, string>;

function slugFromPath(path: string): string {
    return path.split("/").pop()!.replace(/\.md$/, "");
}

export const logEntries: LogEntry[] = Object.entries(modules)
    .map(([path, raw]) => {
        const slug = slugFromPath(path);
        const { data, body } = parseFrontmatter(raw);
        return {
            slug,
            date: data.date ?? slug,
            title: data.title ?? "Untitled entry",
            description: data.description ?? "",
            body,
        };
    })
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0)); // newest first

export function formatEntryDate(date: string): string {
    // "2026-08-20" -> "2026.08.20"
    return date.replaceAll("-", ".");
}
