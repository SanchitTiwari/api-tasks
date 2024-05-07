const express = require('express');
const router = express.Router();
const { fetchFlipkartMobileProducts} = require('../controllers/fetchFlipkartMobileProducts');
const {fetchSnapdealTShirtProducts} = require('../controllers/fetchSnapdealTShirtProducts'); 
const { fetchFullFlipkartMobileProducts} = require('../controllers/fetchFullFlipkartMobileProducts')

router.get('/fetch/flipkart/mobile', fetchFlipkartMobileProducts);
router.get('/fetch/snapdeal/t-shirt', fetchSnapdealTShirtProducts);
router.get('/fetch/flipkart/mobile/full', fetchFullFlipkartMobileProducts);

module.exports = router;
