import {
  getAllMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "../../../services/menuService";
import Menu from "../../../models/Menu";

jest.mock("../models/Menu");

describe("Menu Service", () => {
  describe("getAllMenuItems", () => {
    it("should return all menu items", async () => {
      const mockMenuItems = [
        {
          _id: "1",
          name: "Item 1",
          description: "Description 1",
          price: 10,
          category: "Category 1",
        },
        {
          _id: "2",
          name: "Item 2",
          description: "Description 2",
          price: 20,
          category: "Category 2",
        },
      ];
      (Menu.find as jest.Mock).mockResolvedValue(mockMenuItems);

      const result = await getAllMenuItems();

      expect(Menu.find).toHaveBeenCalled();
      expect(result).toEqual(mockMenuItems);
    });
  });

  describe("getMenuItemById", () => {
    it("should return a menu item by id", async () => {
      const mockMenuItem = {
        _id: "1",
        name: "Item 1",
        description: "Description 1",
        price: 10,
        category: "Category 1",
      };
      (Menu.findById as jest.Mock).mockResolvedValue(mockMenuItem);

      const result = await getMenuItemById("1");

      expect(Menu.findById).toHaveBeenCalledWith("1");
      expect(result).toEqual(mockMenuItem);
    });

    it("should throw an error if menu item not found", async () => {
      (Menu.findById as jest.Mock).mockResolvedValue(null);

      await expect(getMenuItemById("1")).rejects.toThrow("Menu item not found");
    });
  });

  describe("createMenuItem", () => {
    it("should create a new menu item", async () => {
      const mockMenuItemData = {
        name: "New Item",
        description: "New Description",
        price: 15,
        category: "New Category",
      };
      const mockMenuItem = { _id: "1", ...mockMenuItemData };
      (Menu.prototype.save as jest.Mock).mockResolvedValue(mockMenuItem);

      const result = await createMenuItem(mockMenuItemData);

      expect(Menu.prototype.save).toHaveBeenCalled();
      expect(result).toEqual(mockMenuItem);
    });
  });

  describe("updateMenuItem", () => {
    it("should update a menu item", async () => {
      const mockMenuItemData = {
        name: "Updated Item",
        description: "Updated Description",
        price: 20,
        category: "Updated Category",
      };
      const mockMenuItem = { _id: "1", ...mockMenuItemData };
      (Menu.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockMenuItem);

      const result = await updateMenuItem("1", mockMenuItemData);

      expect(Menu.findByIdAndUpdate).toHaveBeenCalledWith(
        "1",
        mockMenuItemData,
        { new: true }
      );
      expect(result).toEqual(mockMenuItem);
    });

    it("should throw an error if menu item not found", async () => {
      (Menu.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

      await expect(updateMenuItem("1", {})).rejects.toThrow(
        "Menu item not found"
      );
    });
  });

  describe("deleteMenuItem", () => {
    it("should delete a menu item", async () => {
      const mockMenuItem = {
        _id: "1",
        name: "Item 1",
        description: "Description 1",
        price: 10,
        category: "Category 1",
      };
      (Menu.findByIdAndDelete as jest.Mock).mockResolvedValue(mockMenuItem);

      const result = await deleteMenuItem("1");

      expect(Menu.findByIdAndDelete).toHaveBeenCalledWith("1");
      expect(result).toEqual(mockMenuItem);
    });

    it("should throw an error if menu item not found", async () => {
      (Menu.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

      await expect(deleteMenuItem("1")).rejects.toThrow("Menu item not found");
    });
  });
});
