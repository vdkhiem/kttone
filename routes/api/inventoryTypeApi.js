// routes/api/inventorytypes.js

const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// Load InventoryType model
const InventoryType = require('../../models/InventoryType');

// @route GET api/inventorytypes/test
// @description tests inventorytypes route
// @access Public
router.get('/test', (req, res) => res.send('InventoryType route testing!'));

// @route GET api/inventorytypes
// @description Get all inventorytypes
// @access Public
router.get('/', async (req, res) => {
  try {
    let inventoryTypes = await InventoryType.find();
    return res.json(inventoryTypes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server error');
  }
});

// @route GET api/inventorytypes/:id
// @description Get single inventorytype by id
// @access Public
router.get('/:id', async (req, res) => {
  try {
    let inventoryTypes = await InventoryType.findById(req.params.id);
    return res.json(inventoryTypes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server error');
  }
});

// @route GET api/inventorytypes
// @description add/save inventorytype
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

      const foundInventoryType = await InventoryType.findOne({
        code: req.body.code
      });
      if (foundInventoryType) {
        Object.assign(foundInventoryType, req.body);
        await foundInventoryType.save();
        return res.json(foundInventoryType);
      }

      const inventoryType = new InventoryType(req.body);
      await inventoryType.save();
      return res.json(inventoryType);
    } catch (error) {
      console.log(error.message);
      return res.status(500).send('Server error');
    }
  }
);

// @route PUT api/inventorytypes/:id
// @description Update inventorytype
// @access Public
router.put('/:id', async (req, res) => {
  try {
    const updatedInventoryType = await InventoryType.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    return res.json(updatedInventoryType);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send('Server error');
  }
});

// @route   DELETE api/inventoryTypes/code/:code
// @desc    Delete a inventoryType
// @access  Private
router.delete(
  '/code/:code',
  [check('code', 'Code is required').exists()],
  async (req, res) => {
    try {
      const foundInventoryType = await InventoryType.findOne({
        code: req.params.code
      });
      if (!foundInventoryType) {
        return res.status(404).json({ msg: 'Not found inventory type' });
      }

      await InventoryType.deleteOne({ code: req.params.code });
      return res.json({ msg: 'InventoryType is deleted' });
    } catch (error) {
      console.log(error.message);
      return res.status(500).send('Server error');
    }
  }
);

module.exports = router;
