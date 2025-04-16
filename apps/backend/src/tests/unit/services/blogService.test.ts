import {
  getAllBlogPosts,
  getBlogPostById,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
} from "../../../services/blogService";
import Blog from "../../../models/Blog";

jest.mock("../models/Blog");

describe("Blog Service", () => {
  describe("getAllBlogPosts", () => {
    it("should return all blog posts", async () => {
      const mockBlogPosts = [
        { _id: "1", title: "Blog 1", content: "Content 1", author: "Author 1" },
        { _id: "2", title: "Blog 2", content: "Content 2", author: "Author 2" },
      ];
      (Blog.find as jest.Mock).mockResolvedValue(mockBlogPosts);

      const result = await getAllBlogPosts();

      expect(Blog.find).toHaveBeenCalled();
      expect(result).toEqual(mockBlogPosts);
    });
  });

  describe("getBlogPostById", () => {
    it("should return a blog post by ID", async () => {
      const mockBlogPost = {
        _id: "1",
        title: "Blog 1",
        content: "Content 1",
        author: "Author 1",
      };
      (Blog.findById as jest.Mock).mockResolvedValue(mockBlogPost);

      const result = await getBlogPostById("1");

      expect(Blog.findById).toHaveBeenCalledWith("1");
      expect(result).toEqual(mockBlogPost);
    });

    it("should throw an error if blog post not found", async () => {
      (Blog.findById as jest.Mock).mockResolvedValue(null);

      await expect(getBlogPostById("1")).rejects.toThrow("Blog post not found");
    });
  });

  describe("createBlogPost", () => {
    it("should create a new blog post", async () => {
      const mockBlogPostData = {
        title: "Blog 1",
        content: "Content 1",
        author: "Author 1",
      };
      const mockBlogPost = { _id: "1", ...mockBlogPostData };
      (Blog.prototype.save as jest.Mock).mockResolvedValue(mockBlogPost);

      const result = await createBlogPost(mockBlogPostData);

      expect(Blog.prototype.save).toHaveBeenCalled();
      expect(result).toEqual(mockBlogPost);
    });
  });

  describe("updateBlogPost", () => {
    it("should update a blog post", async () => {
      const mockBlogPostData = {
        title: "Updated Blog 1",
        content: "Updated Content 1",
      };
      const mockBlogPost = { _id: "1", ...mockBlogPostData };
      (Blog.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockBlogPost);

      const result = await updateBlogPost("1", mockBlogPostData);

      expect(Blog.findByIdAndUpdate).toHaveBeenCalledWith(
        "1",
        mockBlogPostData,
        { new: true }
      );
      expect(result).toEqual(mockBlogPost);
    });

    it("should throw an error if blog post not found", async () => {
      (Blog.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

      await expect(updateBlogPost("1", {})).rejects.toThrow(
        "Blog post not found"
      );
    });
  });

  describe("deleteBlogPost", () => {
    it("should delete a blog post", async () => {
      const mockBlogPost = {
        _id: "1",
        title: "Blog 1",
        content: "Content 1",
        author: "Author 1",
      };
      (Blog.findByIdAndDelete as jest.Mock).mockResolvedValue(mockBlogPost);

      const result = await deleteBlogPost("1");

      expect(Blog.findByIdAndDelete).toHaveBeenCalledWith("1");
      expect(result).toEqual(mockBlogPost);
    });

    it("should throw an error if blog post not found", async () => {
      (Blog.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

      await expect(deleteBlogPost("1")).rejects.toThrow("Blog post not found");
    });
  });
});
