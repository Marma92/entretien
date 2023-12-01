import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

interface MarkdownViewerProps {
  url: string;
}

const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ url }) => {
  const [markdownContent, setMarkdownContent] = useState<string>('');

  useEffect(() => {
    const fetchMarkdownContent = async () => {
      try {
        const response = await fetch(url);
        const content = await response.text();
        setMarkdownContent(content);
      } catch (error) {
        console.error('Error fetching Markdown content:', error);
      }
    };

    fetchMarkdownContent();
  }, [url]);

  return (
    <div>
      <ReactMarkdown>{markdownContent}</ReactMarkdown>
    </div>
  );
};

export default MarkdownViewer;