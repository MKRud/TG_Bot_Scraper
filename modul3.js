const botgram = require("botgram")
const bot = botgram("1093013533:AAGffWaIiVx4uk1hi2soMV1k4NtxH8Gmn6Q")

const request = require('request');
const cheerio = require('cheerio');

aniObj = {};
aniObjRandom = {};



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
                link
            };  
        })
    }
    // console.log(aniObj);          

});




bot.command("random", function (msg, reply) {

    request('https://yummyanime.club/random', (error, response, html) => {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);
            const nameRandom = $('h1').text();
            const ratingRandom = $('.main-rating').text();
            const linkRandom = response.request.uri.href

            aniObjRandom[0] = {
                nameRandom,
                ratingRandom,
                linkRandom
            };
        }
    })


    for (i in aniObjRandom) {
        reply.text(`${aniObjRandom[i].nameRandom}
Rating - ${aniObjRandom[i].ratingRandom}
${aniObjRandom[i].linkRandom}`)
    }
    console.log(msg.from.name);


})
var n = -10;
var iter = 0;
var i = 0;
bot.command("day_anime", function (msg, reply) {
    // var ani = require('./modul')
    n += 10;

    function* anime(n){
        for (i = iter++; i <= n; i++){
            yield i

        }
    }
    for (let k of anime(n + 9)){
        console.log(k);
        
        reply.text(
    `${aniObj[k].name}: 
Rating - ${aniObj[k].rating} 
${aniObj[k].link}`)
    }
    iter += 9;
    i = iter;

    console.log(msg.from.name);

})
bot.command("next", function (msg, reply) {

    reply.text('/day_anime')

})

// reply.text(
//     `${aniObj[i].name}: 
// Rating - ${aniObj[i].rating} 
// ${aniObj[i].link}`)

// bot.command(function (msg, reply) {
//     reply.text("Invalid command.")
// })
