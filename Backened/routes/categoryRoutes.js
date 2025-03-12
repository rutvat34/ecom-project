const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

//  Create a new category
router.post("/", categoryController.createCategory);

//  Get all categories (supports pagination & search)
router.get("/", categoryController.getAllCategories);

//  Get a single category by ID
router.get("/:id", categoryController.getCategoryById);

//  Edit category (fetch category details before updating) - Optional
router.get("/:id/edit", categoryController.getCategoryById);

//  Update category
router.put("/:id", categoryController.updateCategory);

//  Delete category
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
