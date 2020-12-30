import ReactMarkdown from "react-markdown";
import CodeBlock from "./CodeBlock";

export default function Markdown({ markdownData }) { 
	return (
		<ReactMarkdown
			source={markdownData}
			renderers={{
				code: CodeBlock,
			}}
		/>
	);
}
