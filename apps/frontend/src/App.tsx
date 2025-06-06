import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import BookingForm from './components/booking/BookingForm';
import BlogCard from './components/blog/BlogCard';
import CommentSection from './components/blog/CommentSection';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { UIProvider } from './context/UIContext';
import useAuth from './hooks/useAuth';
import Home from './pages/Home/Home';
import BookTable from './pages/BookTable/BookTable';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BlogPage from './pages/Blog/BlogPage';
import BlogDetailPage from './pages/Blog/BlogDetailPage';

function App() {
  const [count, setCount] = useState(0);
  const { user, setUser } = useAuth();

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
    <UIProvider>
      <AuthProvider>
        <CartProvider>
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/book-table" component={BookTable} />
              <Route path="/blogs" component={BlogPage} />
              <Route path="/blogs/:id" component={BlogDetailPage} />
            </Switch>
          </Router>
        </CartProvider>
      </AuthProvider>
    </UIProvider>
  );
}

export default App;
