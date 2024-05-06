const fetch = require('node-fetch');
const cheerio = require('cheerio');

const fetchFlipkartMobileProducts = async () => {
    try {
        const url = 'https://www.flipkart.com/mobiles/smartphones~type/pr?page=11&sid=tyy%2C4io';
        const response = await fetch(url);
        const html = await response.text();
        const $ = cheerio.load(html);
        const products = [];
        
        // Data Extracted from HTML recieved from fetch url, using CSS selectors from the Cheerio library
//Nx9bqj _4b5DiR
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
    console.log(products);
        } catch (error) {
        console.error(error);
    }
};



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
        console.log(products);
    } catch (error) {
        console.error(error);
    }
};

// const productURL = `https://www.flipkart.com${$(element).closest('._75nlfW').find('a').attr('href')}`;



const fetchFullFlipkartMobileProducts = async () => {
    try {
        const url = 'https://www.flipkart.com/mobiles/pr?sid=tyy,4io';
        const response = await fetch(url);
        const html = await response.text();
        const $ = cheerio.load(html);
        const productURLs = [];

        $('._75nlfW a').each((index, element) => {
            const productURL = `https://www.flipkart.com${$(element).attr('href')}`;
            productURLs.push(productURL);
        });
        for (const productURL of productURLs) {
            const productResponse = await fetch(productURL);
            const productHTML = await productResponse.text();
            const product$ = cheerio.load(productHTML);

            // Extract product name, price, and description from product page
            const productName = product$('span.VU-ZEz').text();
            const productPrice = product$('div.CxhGGd').text();
            const productDescription = product$('div._4gvKMe').text();
            
            // Output product details
            console.log("Product Name:", productName);
            console.log("Product Price:", productPrice);
            console.log("Product Description:", productDescription);
            console.log("--------------------------------------");
        }
    } catch (error) {
        console.error(error);
    }

};

module.exports = {
    fetchFlipkartMobileProducts,
    fetchSnapdealTShirtProducts,
    fetchFullFlipkartMobileProducts
};
