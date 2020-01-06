// routes/api/invoices.js

const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// Load Invoice model
const Invoice = require('../../models/Invoice');

// @route GET api/invoices/test
// @description tests invoices route
// @access Public
router.get('/test', (req, res) => res.send('Invoice route testing!'));

// @route GET api/invoices
// @description Get all invoices
// @access Public
router.get('/', async (req, res) => {
  try {
    let invoices = await Invoice.find().populate('customer', 'name');
    return res.json(invoices);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server error');
  }
});

// @route GET api/invoices/:id
// @description Get single invoice by id
// @access Public
router.get('/:id', async (req, res) => {
  try {
    let invoices = await Invoice.findById(req.params.id);
    return res.json(invoices);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server error');
  }
});

// @route GET api/invoices
// @description add/save invoice
// @access Public
router.post(
  '/',
  [
    check('code', 'Code is required')
      .not()
      .isEmpty(),
    check('customer', 'Customer is required')
      .not()
      .isEmpty(),
    check('invoiceDate', 'Invoice Date is required')
      .not()
      .isEmpty(),
    check('dueDate', 'Due Date is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const foundInvoice = await Invoice.findOne({
        code: req.body.code
      });
      if (foundInvoice) {
        Object.assign(foundInvoice, req.body);
        await foundInvoice.save();
        return res.json(foundInvoice);
      }

      const invoice = new Invoice(req.body);
      await invoice.save();
      return res.json(invoice);
    } catch (error) {
      console.log(error.message);
      return res.status(500).send('Server error');
    }
  }
);

// @route PUT api/invoices/:id
// @description Update invoice
// @access Public
router.put('/:id', async (req, res) => {
  try {
    const updatedInvoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    return res.json(updatedInvoice);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send('Server error');
  }
});

// @route   DELETE api/invoices/:id
// @desc    Delete a invoice
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const foundInvoice = await Invoice.findOne({
      _id: req.params.id
    });
    if (!foundInvoice) {
      return res.status(404).json({ msg: 'Not found invoice' });
    }

    await Invoice.deleteOne({ _id: req.params.id });
    return res.json({ msg: 'Invoice is deleted' });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send('Server error');
  }
});

module.exports = router;
