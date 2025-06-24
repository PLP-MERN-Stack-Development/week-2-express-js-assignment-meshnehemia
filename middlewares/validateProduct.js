// middleware/validateProduct.js
const ApiError = require('../utils/ApiError');

module.exports = (req, res, next) => {
  const { name, description, price, category, inStock } = req.body;
  if (!name || !description || typeof price !== 'number' || !category || typeof inStock !== 'boolean') {
    return next(new ApiError(400, 'Validation Error: Missing or invalid fields'));
  }
  next();
};
