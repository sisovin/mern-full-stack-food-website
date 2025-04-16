import {
  registerUser,
  loginUser,
  refreshToken,
  logoutUser,
} from "../../../services/authService";
import User from "../../../models/User";
import jwt from "jsonwebtoken";
import { hashPassword, verifyPassword } from "../../../utils/argon2";

jest.mock("../models/User");
jest.mock("jsonwebtoken");
jest.mock("../utils/argon2");

describe("Auth Service", () => {
  describe("registerUser", () => {
    it("should register a new user", async () => {
      const mockUser = {
        _id: "123",
        username: "testuser",
        email: "testuser@example.com",
        password: "hashedpassword",
      };
      (User.findOne as jest.Mock).mockResolvedValue(null);
      (hashPassword as jest.Mock).mockResolvedValue("hashedpassword");
      (User.prototype.save as jest.Mock).mockResolvedValue(mockUser);
      (jwt.sign as jest.Mock).mockReturnValue("token");

      const result = await registerUser(
        "testuser",
        "testuser@example.com",
        "password123"
      );

      expect(User.findOne).toHaveBeenCalledWith({
        email: "testuser@example.com",
      });
      expect(hashPassword).toHaveBeenCalledWith("password123");
      expect(User.prototype.save).toHaveBeenCalled();
      expect(jwt.sign).toHaveBeenCalledWith(
        { id: mockUser._id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );
      expect(result).toEqual({ user: mockUser, token: "token" });
    });

    it("should throw an error if user already exists", async () => {
      (User.findOne as jest.Mock).mockResolvedValue({
        email: "testuser@example.com",
      });

      await expect(
        registerUser("testuser", "testuser@example.com", "password123")
      ).rejects.toThrow("User already exists");
    });
  });

  describe("loginUser", () => {
    it("should login an existing user", async () => {
      const mockUser = {
        _id: "123",
        email: "testuser@example.com",
        password: "hashedpassword",
      };
      (User.findOne as jest.Mock).mockResolvedValue(mockUser);
      (verifyPassword as jest.Mock).mockResolvedValue(true);
      (jwt.sign as jest.Mock).mockReturnValue("token");

      const result = await loginUser("testuser@example.com", "password123");

      expect(User.findOne).toHaveBeenCalledWith({
        email: "testuser@example.com",
      });
      expect(verifyPassword).toHaveBeenCalledWith(
        "hashedpassword",
        "password123"
      );
      expect(jwt.sign).toHaveBeenCalledWith(
        { id: mockUser._id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );
      expect(result).toEqual({ user: mockUser, token: "token" });
    });

    it("should throw an error if email or password is invalid", async () => {
      (User.findOne as jest.Mock).mockResolvedValue(null);

      await expect(
        loginUser("testuser@example.com", "password123")
      ).rejects.toThrow("Invalid email or password");
    });

    it("should throw an error if password is invalid", async () => {
      const mockUser = {
        _id: "123",
        email: "testuser@example.com",
        password: "hashedpassword",
      };
      (User.findOne as jest.Mock).mockResolvedValue(mockUser);
      (verifyPassword as jest.Mock).mockResolvedValue(false);

      await expect(
        loginUser("testuser@example.com", "password123")
      ).rejects.toThrow("Invalid email or password");
    });
  });

  describe("refreshToken", () => {
    it("should refresh the token", () => {
      const mockDecoded = { id: "123" };
      (jwt.verify as jest.Mock).mockReturnValue(mockDecoded);
      (jwt.sign as jest.Mock).mockReturnValue("newToken");

      const result = refreshToken("token");

      expect(jwt.verify).toHaveBeenCalledWith("token", process.env.JWT_SECRET);
      expect(jwt.sign).toHaveBeenCalledWith(
        { id: mockDecoded.id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );
      expect(result).toEqual("newToken");
    });

    it("should throw an error if token is invalid", () => {
      (jwt.verify as jest.Mock).mockImplementation(() => {
        throw new Error("Invalid token");
      });

      expect(() => refreshToken("invalidToken")).toThrow("Invalid token");
    });
  });

  describe("logoutUser", () => {
    it("should logout the user", async () => {
      const result = await logoutUser("123");
      expect(result).toBe(true);
    });
  });
});
