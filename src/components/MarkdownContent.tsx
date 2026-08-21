import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = {
    content: string;
};

export function MarkdownContent({ content }: Props) {
    return (
        <div className="text-[0.9rem] leading-[1.75] text-ink [&>*:first-child]:mt-0">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>
    );
}