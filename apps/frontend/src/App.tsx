import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import BookingForm from './components/booking/BookingForm';
import BlogCard from './components/blog/BlogCard';
import CommentSection from './components/blog/CommentSection';
import { AuthProvider } from './context/AuthContext';

function App() {
  const [count, setCount] = useState(0);

  const sampleBlogPost = {
    title: 'Sample Blog Post',
    content: 'This is a sample blog post content.',
    author: 'John Doe',
    createdAt: '2023-04-15T12:00:00Z',
  };

  const sampleComments = [
    {
      id: 1,
      user: 'Jane Smith',
      content: 'Great post!',
      createdAt: '2023-04-16T08:30:00Z',
    },
    {
      id: 2,
      user: 'Bob Johnson',
      content: 'Thanks for sharing!',
      createdAt: '2023-04-16T09:45:00Z',
    },
  ];

  const handleAddComment = (content: string) => {
    console.log('New comment added:', content);
  };

  return (
    <AuthProvider>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <BookingForm />
      <BlogCard
        title={sampleBlogPost.title}
        content={sampleBlogPost.content}
        author={sampleBlogPost.author}
        createdAt={sampleBlogPost.createdAt}
      />
      <CommentSection comments={sampleComments} onAddComment={handleAddComment} />
    </AuthProvider>
  );
}

export default App;
