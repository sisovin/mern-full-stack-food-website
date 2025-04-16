import {
  getUserById,
  updateUser,
  deleteUser,
} from "../../../services/userService";
import User from "../../../models/User";

jest.mock("../models/User");

describe("User Service", () => {
  describe("getUserById", () => {
    it("should return a user if found", async () => {
      const mockUser = {
        _id: "123",
        username: "testuser",
        email: "testuser@example.com",
      };
      (User.findById as jest.Mock).mockResolvedValue(mockUser);

      const result = await getUserById("123");

      expect(User.findById).toHaveBeenCalledWith("123");
      expect(result).toEqual(mockUser);
    });

    it("should throw an error if user not found", async () => {
      (User.findById as jest.Mock).mockResolvedValue(null);

      await expect(getUserById("123")).rejects.toThrow("User not found");
    });
  });

  describe("updateUser", () => {
    it("should update and return the user if found", async () => {
      const mockUser = {
        _id: "123",
        username: "updateduser",
        email: "updateduser@example.com",
      };
      (User.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockUser);

      const result = await updateUser("123", { username: "updateduser" });

      expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
        "123",
        { username: "updateduser" },
        { new: true }
      );
      expect(result).toEqual(mockUser);
    });

    it("should throw an error if user not found", async () => {
      (User.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

      await expect(
        updateUser("123", { username: "updateduser" })
      ).rejects.toThrow("User not found");
    });
  });

  describe("deleteUser", () => {
    it("should delete and return the user if found", async () => {
      const mockUser = {
        _id: "123",
        username: "testuser",
        email: "testuser@example.com",
      };
      (User.findByIdAndDelete as jest.Mock).mockResolvedValue(mockUser);

      const result = await deleteUser("123");

      expect(User.findByIdAndDelete).toHaveBeenCalledWith("123");
      expect(result).toEqual(mockUser);
    });

    it("should throw an error if user not found", async () => {
      (User.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

      await expect(deleteUser("123")).rejects.toThrow("User not found");
    });
  });
});
