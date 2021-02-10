const giveaway = require('./giveaway/giveaway.js');

module.exports = {
checkCommand: function (message, channel, tags, client)
    {
        console.log('command3');
        if(message.startsWith('!giveaway'))
        {
            console.log('command2');
            giveaway.runGiveawayCommand(message, channel, tags, client);
        }

        if(message.startsWith('!commands'))
        {
            runCommandsList();
        }
    }
};