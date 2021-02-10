const express = require("express");
require("dotenv").config();

const commands = require('./commands.js');
const tmi = require('tmi.js');

const client = new tmi.Client({
    options: {debug : true},
    connection : {
        secure: true,
        reconnect : true
    },
    identity: {
        username: process.env.YOUR_USERNAME,
        password: process.env.TWITCH_OAUTH_TOKEN
    },
    channels: [ process.env.CHANNEL_NAME ]
});

client.connect();

client.on('message', (channel, tags, message, self) => {


    if(isCommand(message) == true)
    {
        console.log('command1');
        commands.checkCommand(message, channel, tags, client);
    }
    else
    {
        console.log('Wasnt a command');
        return;
    }

    



});

function isCommand(message)
{
    if(message.startsWith('!')) return true;
}