import React from 'react';

interface BlogCardProps {
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ title, content, author, createdAt }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{content}</p>
        <p className="text-gray-600 text-sm">By {author}</p>
        <p className="text-gray-600 text-sm">{new Date(createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default BlogCard;
