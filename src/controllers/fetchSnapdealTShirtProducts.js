const fetch = require('node-fetch');
const cheerio = require('cheerio');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csvWriter = createCsvWriter({
    header: [
        { id: 'name', title: 'NAME' },
        { id: 'price', title: 'PRICE' },
        { id: 'discount', title: 'DISCOUNT' },
        { id: 'rating', title: 'RATING' },
        { id: 'reviews', title: 'REVIEWS' },
        { id: 'features', title: 'FEATURES' }
    ],
    path: './src/data/tshirtData.csv'
});

const fetchSnapdealTShirtProducts = async (req, res) => {
    try {
        const url = 'https://www.snapdeal.com/products/mens-tshirts-polos?sort=plrty';
        const response = await fetch(url);
        const html = await response.text();
        const $ = cheerio.load(html);

        const productUrls = [];
        $('.product-tuple-listing').each((index, element) => {
            const productUrl = $(element).find('.dp-widget-link').attr('href');
            productUrls.push(productUrl);
        });

        const products = await Promise.all(productUrls.map(async (productUrl) => {
                const productResponse = await fetch(productUrl);
                const productHtml = await productResponse.text();
                const product$ = cheerio.load(productHtml);
                const productTitle = product$('.pdp-e-i-head').text().trim();
                const productPrice = product$('.payBlkBig').text().trim();
                const productDiscount = product$('.pdpDiscount').text().trim();
                const productRating = product$('.avrg-rating').text().replace('(','').replace(')','');
                const productReviews = product$('.total-rating.showRatingTooltip').text().trim();
                const productFeatures = [];
                product$('.spec-body.p-keyfeatures .dtls-list .dtls-li .h-content').each((index, element) => {
                    const feature = $(element).text().trim();
                    productFeatures.push(feature);
                });

                return {
                    name: productTitle,
                    price: productPrice,
                    discount: productDiscount,
                    rating: productRating,
                    reviews: productReviews,
                    features: productFeatures.join(', ')
                };

        }));

        const validProducts = products.filter(product => product !== null);
        console.log(validProducts);
        await csvWriter.writeRecords(validProducts);
        console.log("CSV Saved");
        res.status(200).json(validProducts);
    } 
    catch (error) {
        console.error('Error fetching Snapdeal t-shirt products:', error);
        res.status(500).send('Server Error');
    }
};

module.exports = { fetchSnapdealTShirtProducts };
