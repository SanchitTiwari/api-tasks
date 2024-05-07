
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csvWriter = createCsvWriter({
    header: [
        {id: 'name', title: 'NAME'},
        {id: 'price', title: 'PRICE'},
        {id: 'description', title: 'Description'}
        ],
    path: './src/data/mobileFullData.csv'
});

const fetchFullFlipkartMobileProducts = async (req,res) => {
    try {
        const url = 'https://www.flipkart.com/mobiles/pr?sid=tyy,4io';
        const response = await fetch(url);
        const html = await response.text();
        const $ = cheerio.load(html);
        const productURLs = [];
        const products = [];
        $('._75nlfW a').each((index, element) => {
            const productURL = `https://www.flipkart.com${$(element).attr('href')}`;
            productURLs.push(productURL);
        });
        for (const productURL of productURLs) {
            const productResponse = await fetch(productURL);
            const productHTML = await productResponse.text();
            const product$ = cheerio.load(productHTML);

            const productName = product$('span.VU-ZEz').text();
            const productPrice = product$('div.CxhGGd').text();
            const productDescription = product$('div._4gvKMe').text();

            const product = {
                name:productName,
                price:productPrice,
                description:productDescription
            }
            products.push(product);
}
await csvWriter.writeRecords(products);
console.log("CSV Saved"); 
res.status(200).json(products)   

    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

};

module.exports = {fetchFullFlipkartMobileProducts};