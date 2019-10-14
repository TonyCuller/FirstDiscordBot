//Global Stuff
const {prefix, token, giphytoken} = require('./config.json');
//File Structure 
const fs = require('fs');

//Discord Stuff
const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();

//Get Commands
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Ready!')
})

client.login(token);

client.on('message', message => { 
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();
    if(!client.commands.has(command)) return;
    try {
        client.commands.get(command).execute(message, args[0]);
    }
    catch(error){
        console.error(error);        
    }
})