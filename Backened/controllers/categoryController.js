const Category = require("../model/categoryModel");

// Create a new category
exports.createCategory = async (req, res) => {
    try {
        const { name, description, parent_id } = req.body;
        if (!name) return res.status(400).json({ message: "Category name is required" });

        const newCategory = new Category({ name, description, parent_id });
        await newCategory.save();

        res.status(201).json({ message: "Category created successfully", category: newCategory });
    } catch (error) {
        res.status(500).json({ message: "Error creating category", error: error.message });
    }
};

//  Get all categories with pagination & search
exports.getAllCategories = async (req, res) => {
    try {
        let { page, limit, search } = req.query;
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;

        let query = {};
        if (search) {
            query.name = { $regex: search, $options: "i" }; // Case-insensitive search
        }

        const categories = await Category.find(query)
            .skip((page - 1) * limit)
            .limit(limit);

        const total = await Category.countDocuments(query);

        res.status(200).json({
            total,
            page,
            limit,
            categories
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching categories", error: error.message });
    }
};

//  Get category by ID
exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ message: "Category not found" });

        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: "Error fetching category", error: error.message });
    }
};

//  Update category
exports.updateCategory = async (req, res) => {
    try {
        const { name, description, parent_id } = req.body;
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            { name, description, parent_id },
            { new: true, runValidators: true }
        );
        if (!category) return res.status(404).json({ message: "Category not found" });

        res.status(200).json({ message: "Category updated successfully", category });
    } catch (error) {
        res.status(500).json({ message: "Error updating category", error: error.message });
    }
};

//  Delete category
exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) return res.status(404).json({ message: "Category not found" });

        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting category", error: error.message });
    }
};
