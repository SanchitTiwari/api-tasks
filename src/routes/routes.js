const express = require('express');
const router = express.Router();
const { fetchFlipkartMobileProducts,
    fetchSnapdealTShirtProducts,
    fetchFullFlipkartMobileProducts} = require('../controllers/controllers.js') 

router.get('/fetch/flipkart/mobile', fetchFlipkartMobileProducts);
router.get('/fetch/snapdeal/t-shirt', fetchSnapdealTShirtProducts);
router.get('/fetch/flipkart/mobile/full', fetchFullFlipkartMobileProducts);

module.exports = router;
