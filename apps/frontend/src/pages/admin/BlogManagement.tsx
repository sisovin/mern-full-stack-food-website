import React, { useState, useEffect } from 'react';
import { getAllBlogs, deleteBlog, createBlog, updateBlog } from '../../api/blog.api';

const BlogManagement: React.FC = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({ title: '', content: '', author: '' });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await getAllBlogs();
      setBlogs(response);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const handleDelete = async (blogId: string) => {
    try {
      await deleteBlog(blogId);
      fetchBlogs();
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  const handleCreate = async () => {
    try {
      await createBlog(newBlog);
      setNewBlog({ title: '', content: '', author: '' });
      fetchBlogs();
    } catch (error) {
      console.error('Error creating blog:', error);
    }
  };

  const handleUpdate = async (blogId: string, updatedData: any) => {
    try {
      await updateBlog(blogId, updatedData);
      fetchBlogs();
    } catch (error) {
      console.error('Error updating blog:', error);
    }
  };

  return (
    <div className="blog-management">
      <h1>Manage Blogs</h1>
      <div className="blog-form">
        <input
          type="text"
          placeholder="Title"
          value={newBlog.title}
          onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Content"
          value={newBlog.content}
          onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
        />
        <input
          type="text"
          placeholder="Author"
          value={newBlog.author}
          onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })}
        />
        <button onClick={handleCreate}>Add Blog</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Content</th>
            <th>Author</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog._id}>
              <td>{blog._id}</td>
              <td>{blog.title}</td>
              <td>{blog.content}</td>
              <td>{blog.author}</td>
              <td>
                <button onClick={() => handleDelete(blog._id)}>Delete</button>
                <button onClick={() => handleUpdate(blog._id, { title: 'Updated Title' })}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BlogManagement;
