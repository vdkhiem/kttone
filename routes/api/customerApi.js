// routes/api/customers.js

const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// Load Customer model
const Customer = require('../../models/Customer');

// @route GET api/customers/test
// @description tests customers route
// @access Public
router.get('/test', (req, res) => res.send('Customer route testing!'));

// @route GET api/customers
// @description Get all customers
// @access Public
router.get('/', async (req, res) => {
  try {
    let customers = await Customer.find();
    return res.json(customers);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server error');
  }
});

// @route GET api/customers/:id
// @description Get single customer by id
// @access Public
router.get('/:id', async (req, res) => {
  try {
    let customers = await Customer.findById(req.params.id);
    return res.json(customers);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server error');
  }
});

// @route GET api/customers
// @description add/save customer
// @access Public
router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Email is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const foundCustomer = await Customer.findOne({
        name: req.body.name
      });
      if (foundCustomer) {
        Object.assign(foundCustomer, req.body);
        await foundCustomer.save();
        return res.json(foundCustomer);
      }

      const customer = new Customer(req.body);
      await customer.save();
      return res.json(customer);
    } catch (error) {
      console.log(error.message);
      return res.status(500).send('Server error');
    }
  }
);

// @route PUT api/customers/:id
// @description Update customer
// @access Public
router.put('/:id', async (req, res) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    return res.json(updatedCustomer);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send('Server error');
  }
});

// @route   DELETE api/customers/code/:code
// @desc    Delete a customer
// @access  Private
router.delete(
  '/code/:code',
  [check('code', 'Code is required').exists()],
  async (req, res) => {
    try {
      const foundCustomer = await Customer.findOne({
        code: req.params.code
      });
      if (!foundCustomer) {
        return res.status(404).json({ msg: 'Not found inventory type' });
      }

      await Customer.deleteOne({ code: req.params.code });
      return res.json({ msg: 'Customer is deleted' });
    } catch (error) {
      console.log(error.message);
      return res.status(500).send('Server error');
    }
  }
);

module.exports = router;
