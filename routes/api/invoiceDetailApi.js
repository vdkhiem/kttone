// routes/api/invoicedetails.js

const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// Load InvoiceDetail model
const InvoiceDetail = require('../../models/InvoiceDetail');

// @route GET api/invoicedetails/test
// @description tests invoicedetails route
// @access Public
router.get('/test', (req, res) => res.send('Invoice Detail route testing!'));

// @route GET api/invoicedetails
// @description Get all invoicedetails
// @access Public
router.get('/', async (req, res) => {
  try {
    let invoicedetails = await InvoiceDetail.find().populate('product', 'name');
    return res.json(invoicedetails);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server error');
  }
});

// @route GET api/invoicedetails/:id
// @description Get single invoicedetail by id
// @access Public
router.get('/:id', async (req, res) => {
  try {
    let invoicedetails = await InvoiceDetail.findById(req.params.id);
    return res.json(invoicedetails);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server error');
  }
});

// @route GET api/invoicedetails
// @description add/save invoicedetail
// @access Public
router.post(
  '/',
  [
    check('code', 'Code is required')
      .not()
      .isEmpty(),
    check('product', 'Product is required')
      .not()
      .isEmpty(),
    check('quantity', 'Quantity is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const foundInvoiceDetail = await InvoiceDetail.findOne({
        code: req.body.code
      });
      if (foundInvoiceDetail) {
        Object.assign(foundInvoiceDetail, req.body);
        await foundInvoiceDetail.save();
        return res.json(foundInvoiceDetail);
      }

      const invoiceDetail = new InvoiceDetail(req.body);
      await invoiceDetail.save();
      return res.json(invoiceDetail);
    } catch (error) {
      console.log(error.message);
      return res.status(500).send('Server error');
    }
  }
);

// @route PUT api/invoicedetails/:id
// @description Update invoicedetail
// @access Public
router.put('/:id', async (req, res) => {
  try {
    const updatedInvoiceDetail = await InvoiceDetail.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    return res.json(updatedInvoiceDetail);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send('Server error');
  }
});

// @route   DELETE api/invoicedetails/:id
// @desc    Delete a invoicedetail
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const foundInvoiceDetail = await InvoiceDetail.findOne({
      _id: req.params.id
    });
    if (!foundInvoiceDetail) {
      return res.status(404).json({ msg: 'Not found InvoiceDetail' });
    }

    await InvoiceDetail.deleteOne({ _id: req.params.id });
    return res.json({ msg: 'InvoiceDetail is deleted' });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send('Server error');
  }
});

module.exports = router;
