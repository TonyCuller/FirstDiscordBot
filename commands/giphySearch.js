//Global Stuff
const {giphytoken} = require('../config.json');

//Giphy Stuff
const GphApiClient = require('giphy-js-sdk-core');
giphy = GphApiClient(giphytoken);

module.exports = { 
    name: 'gif', 
    execute(message, args) {
        giphy.search('gifs', {"q": `${args}`})
        .then((response) => {
            var total = response.data.length;            
            var index = Math.floor((Math.random() * total));           
            var final = response.data[index];
            
            //send Gif
            message.channel.send(
                {
                    files: [final.images.fixed_height.url]
                }
            )
        }).catch((error) => {
            console.error(error);
        })
    }
}