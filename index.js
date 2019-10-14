//Global Stuff
const {prefix, token, giphytoken} = require('./config.json');

//Discord Stuff
const Discord = require('discord.js');
const client = new Discord.Client();

//Giphy Stuff
const GphApiClient = require('giphy-js-sdk-core');
giphy = GphApiClient(giphytoken);

client.once('ready', () => {
    console.log('Ready!')
})

client.on('message', message => { 
    // console.log(message.content);
    if(message.content.startsWith(`${prefix}search`)) { //!search
        let searchTerm = message.content.split(' ')[1];
        console.log(searchTerm);
        giphy.search('gifs', {"q": `${searchTerm}`})
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
        }).catch(() => {
            console.log("Error")
        })
        
        

    }
})

client.login(token);


