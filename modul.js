const request = require('request');
const cheerio = require('cheerio');

aniObj = {};


request('https://yummyanime.club/top', (error, response, html) => {

    if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);

        $('.anime-column-info').each((i, el) => {

            const name = $(el).find('a').text();
            const link = 'https://yummyanime.club' + $(el).find('a').attr('href');            
            const rating = $(el).find('.main-rating').text();

            aniObj[i] = {
                name,
                rating,
                link}; 
        })
    }
    console.log(aniObj);
    
});
