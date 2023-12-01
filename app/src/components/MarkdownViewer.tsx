import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import fm from 'front-matter';

interface MarkdownViewerProps {
  url: string;
}

const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ url }) => {
  const [markdownContent, setMarkdownContent] = useState<string>('');
  const [metadata, setMetadata] = useState<any>({});

  useEffect(() => {
    const fetchMarkdownContent = async () => {
      try {
        const response = await fetch(url);
        const content = await response.text();

        const parsedMarkdown = fm(content);

        // Set content and metadata in state
        setMarkdownContent(parsedMarkdown.body);
        setMetadata(parsedMarkdown.attributes);
      } catch (error) {
        console.error('Error fetching Markdown content:', error);
      }
    };

    fetchMarkdownContent();
  }, [url]);

  return (
    <div>
      <h1>{metadata.title}</h1>
      <h2>{metadata.mission}</h2>
      {/* add here all the properties from the metadatas you want */}
      <ReactMarkdown>{markdownContent}</ReactMarkdown>
    </div>
  );
};

export default MarkdownViewer;