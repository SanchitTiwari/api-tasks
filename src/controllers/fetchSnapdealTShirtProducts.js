const fetch = require('node-fetch');
const cheerio = require('cheerio');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csvWriter = createCsvWriter({
    header: [
        {id: 'name', title: 'NAME'},
        {id: 'price', title: 'PRICE'},
    ],
    path: './src/data/tshirtData.csv'
});
const fetchSnapdealTShirtProducts = async () => {
    try {
        const url = 'https://www.snapdeal.com/products/mens-tshirts-polos?sort=plrty';
        const response = await fetch(url);
        const html = await response.text();
        const $ = cheerio.load(html);
        const products = [];
        const productTupleDescriptions = $('.product-tuple-description');
        productTupleDescriptions.each((index, element) => {
            const name = $(element).find('.product-title').text().trim();
            const price = $(element).find('.product-price').text().trim();
            products.push({ name, price });
        });
        console.log(products)
        await csvWriter.writeRecords(products);
        console.log("CSV Saved");    


    } catch (error) {
        console.error(error);
    }
};

module.exports = {fetchSnapdealTShirtProducts};