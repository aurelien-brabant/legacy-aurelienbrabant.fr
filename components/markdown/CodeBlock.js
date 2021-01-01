import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import styles from "../../styles/markdown/codeblock.module.css";

export default function CodeBlock({ language, value }) {
	return (
		<SyntaxHighlighter
			language={language} 
			showLineNumbers
			showInlineLineNumbers
			style={atomDark}
			codeTagProps={{
				className: styles.codeblock
			}}
		>
			{value}
		</SyntaxHighlighter>
	);
}
