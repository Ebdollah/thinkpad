'use client'

import React,{useState} from 'react';
import TagsEditor from '@/components/TagsEditor';

const ArchivesPage: React.FC = () => {
    const [content, setContent] = useState('<p>Start typing here...</p>');

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4">Rich Text Editor</h1>
      <TagsEditor 
        content={content} 
        onChange={(newContent) => setContent(newContent)} 
      />
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Output HTML:</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
          {content}
        </pre>
      </div>
    </div>
  );
};

export default ArchivesPage;