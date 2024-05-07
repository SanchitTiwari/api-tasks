const fetch = require('node-fetch');
const cheerio = require('cheerio');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csvWriter = createCsvWriter({
    header: [
        {id: 'name', title: 'NAME'},
        {id: 'price', title: 'PRICE'},
        {id: 'rating', title: 'RATING'},
        {id: 'specs', title: 'SPECS'},
    ],
    path: './src/data/mobileData.csv'
});

const fetchFlipkartMobileProducts = async () => {
    try {
        const url = 'https://www.flipkart.com/mobiles/smartphones~type/pr?page=11&sid=tyy%2C4io';
        const response = await fetch(url);
        const html = await response.text();
        const $ = cheerio.load(html);
        const products = [];
        
        // Data Extracted from HTML recieved from fetch url, using CSS selectors from the Cheerio library
    $('.KzDlHZ').each((index, element) => {
            const productName = $(element).text().trim();
            const productPrice = $(element).closest('._75nlfW').find('.Nx9bqj').first().text().trim();
            const productRating = $(element).siblings('div._5OesEi').find('.XQDdHH').text().trim();
            const productSpecs = [];
            $(element).siblings('div._6NESgJ').find('ul.G4BRas li').each((i, specElement) => {
                productSpecs.push($(specElement).text().trim());
            });
            
            // creating product object to store product infromation to store data from the HTML
            const product = {
                name: productName,
                price: productPrice,
                rating: productRating,
                specs: productSpecs
            };
        
            products.push(product);
        });

    console.log(products)
    await csvWriter.writeRecords(products);
    console.log("CSV Saved");    

        } catch (error) {
        console.error(error);
    }
};

module.exports = {fetchFlipkartMobileProducts};