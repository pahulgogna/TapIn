import ReactMarkdown from 'react-markdown';

const MarkdownRenderer = ({ markdownText } : {
    markdownText: string
}) => {
  const formattedText = markdownText

  return <ReactMarkdown>{formattedText}</ReactMarkdown>;
};

export default MarkdownRenderer;