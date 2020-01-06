// routes/api/products.js

const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// Load Product model
const Product = require('../../models/Product');

// @route GET api/products/test
// @description tests products route
// @access Public
router.get('/test', (req, res) => res.send('Product route testing!'));

// @route GET api/products
// @description Get all products
// @access Public
router.get('/', async (req, res) => {
  try {
    let products = await Product.find();
    return res.json(products);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server error');
  }
});

// @route GET api/products/:id
// @description Get single product by id
// @access Public
router.get('/:id', async (req, res) => {
  try {
    let products = await Product.findById(req.params.id);
    return res.json(products);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server error');
  }
});

// @route GET api/products
// @description add/save product
// @access Public
router.post(
  '/',
  [
    check('code', 'Code is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const foundProduct = await Product.findOne({
        code: req.body.code
      });
      if (foundProduct) {
        Object.assign(foundProduct, req.body);
        await foundProduct.save();
        return res.json(foundProduct);
      }

      const product = new Product(req.body);
      await product.save();
      return res.json(product);
    } catch (error) {
      console.log(error.message);
      return res.status(500).send('Server error');
    }
  }
);

// @route PUT api/products/:id
// @description Update product
// @access Public
router.put('/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    return res.json(updatedProduct);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send('Server error');
  }
});

// @route   DELETE api/products/code/:code
// @desc    Delete a product
// @access  Private
router.delete(
  '/code/:code',
  [check('code', 'Code is required').exists()],
  async (req, res) => {
    try {
      const foundProduct = await Product.findOne({
        code: req.params.code
      });
      if (!foundProduct) {
        return res.status(404).json({ msg: 'Not found inventory type' });
      }

      await Product.deleteOne({ code: req.params.code });
      return res.json({ msg: 'Product is deleted' });
    } catch (error) {
      console.log(error.message);
      return res.status(500).send('Server error');
    }
  }
);

module.exports = router;
