const express = require('express');
const router = express.Router();
const updateRawDT=require('../controllers/post');
const parseValue =require('../controllers/parse');
const getRealD =require('../controllers/getRealDT');

router.get('/', getRealD.getRealDT);
router.put('/update/:vl', updateRawDT.updateRawDT);
router.put('/clean', updateRawDT.clearRawDT);
router.put('/parse', parseValue.parseValue);
module.exports = router;