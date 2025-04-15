import Blog from '../models/Blog';

const getAllBlogPosts = async () => {
  const blogPosts = await Blog.find();
  return blogPosts;
};

const getBlogPostById = async (blogPostId: string) => {
  const blogPost = await Blog.findById(blogPostId);
  if (!blogPost) {
    throw new Error('Blog post not found');
  }
  return blogPost;
};

const createBlogPost = async (blogPostData: any) => {
  const newBlogPost = new Blog(blogPostData);
  await newBlogPost.save();
  return newBlogPost;
};

const updateBlogPost = async (blogPostId: string, updateData: any) => {
  const updatedBlogPost = await Blog.findByIdAndUpdate(blogPostId, updateData, { new: true });
  if (!updatedBlogPost) {
    throw new Error('Blog post not found');
  }
  return updatedBlogPost;
};

const deleteBlogPost = async (blogPostId: string) => {
  const deletedBlogPost = await Blog.findByIdAndDelete(blogPostId);
  if (!deletedBlogPost) {
    throw new Error('Blog post not found');
  }
  return deletedBlogPost;
};

export { getAllBlogPosts, getBlogPostById, createBlogPost, updateBlogPost, deleteBlogPost };
