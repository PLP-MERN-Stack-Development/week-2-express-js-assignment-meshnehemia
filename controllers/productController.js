

// controllers/productController.js
const productModel = require('../models/product');
const ApiError = require('../utils/ApiError');

exports.getProducts = (req, res) => {
  let data = productModel.getAll();
  if (req.query.category) {
    data = data.filter(p => p.category === req.query.category);
  }
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || data.length;
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginated = data.slice(start, end);
  res.json(paginated);
};
exports.getProduct = (req, res, next) => {
  const product = productModel.getById(req.params.id);
  if (!product) return next(new ApiError(404, 'Product not found'));
  res.json(product);
};

exports.createProduct = (req, res) => {
  const product = productModel.create(req.body);
  res.status(201).json(product);
};

exports.updateProduct = (req, res, next) => {
  const updated = productModel.update(req.params.id, req.body);
  if (!updated) return next(new ApiError(404, 'Product not found'));
  res.json(updated);
};

exports.deleteProduct = (req, res, next) => {
  const deleted = productModel.remove(req.params.id);
  if (!deleted) return next(new ApiError(404, 'Product not found'));
  res.json(deleted);
};

exports.searchProducts = (req, res) => {
  const term = req.query.name?.toLowerCase();
  const results = productModel.getAll().filter(p => p.name.toLowerCase().includes(term));
  res.json(results);
};

exports.getStats = (req, res) => {
  res.json(productModel.stats());
};
