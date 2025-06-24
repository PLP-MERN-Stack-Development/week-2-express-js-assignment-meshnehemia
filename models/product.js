// models/product.js
const { v4: uuidv4 } = require('uuid');


// Sample in-memory products database
let products = [
    {
      id: '1',
      name: 'Laptop',
      description: 'High-performance laptop with 16GB RAM',
      price: 1200,
      category: 'electronics',
      inStock: true
    },
    {
      id: '2',
      name: 'Smartphone',
      description: 'Latest model with 128GB storage',
      price: 800,
      category: 'electronics',
      inStock: true
    },
    {
      id: '3',
      name: 'Coffee Maker',
      description: 'Programmable coffee maker with timer',
      price: 50,
      category: 'kitchen',
      inStock: false
    }
  ];
  
  module.exports = {
    getAll: () => products,
    getById: id => products.find(p => p.id === id),
    create: data => {
      const newProduct = { id: uuidv4(), ...data };
      products.push(newProduct);
      return newProduct;
    },
    update: (id, data) => {
      const index = products.findIndex(p => p.id === id);
      if (index === -1) return null;
      products[index] = { ...products[index], ...data };
      return products[index];
    },
    remove: id => {
      const index = products.findIndex(p => p.id === id);
      if (index === -1) return null;
      return products.splice(index, 1)[0];
    },
    stats: () => {
      const result = {};
      products.forEach(p => {
        result[p.category] = (result[p.category] || 0) + 1;
      });
      return result;
    }
  };