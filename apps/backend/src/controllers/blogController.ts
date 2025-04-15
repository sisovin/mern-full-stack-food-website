import { getAllBlogPosts, getBlogPostById, createBlogPost, updateBlogPost, deleteBlogPost } from '../services/blogService';

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await getAllBlogPosts();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBlogById = async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await getBlogPostById(blogId);
    res.status(200).json(blog);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createBlog = async (req, res) => {
  try {
    const blogData = req.body;
    const newBlog = await createBlogPost(blogData);
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const updateData = req.body;
    const updatedBlog = await updateBlogPost(blogId, updateData);
    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    await deleteBlogPost(blogId);
    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export { getAllBlogs, getBlogById, createBlog, updateBlog, deleteBlog };
