//const { registrationArr } = require('./giveawayConfig.js');
var giveawayConfig = require('./giveawayConfig.js')

module.exports = {
    runGiveawayCommand : function (message, channel, tags, client)
    {
        console.log('command4');
        console.log(giveawayConfig.registrationArr);
        
       

        //client.on('message', (channel, tags, message, self) => {
        
        //ignore messages without a '!' command
        if(!message.startsWith('!')) return;



        // create first time registration for giveaway
        if(message.toLowerCase() == '!giveaway' && giveawayConfig.registerStart == true)
        {
            var userFound = false;

            //check if user is already registered
            for(var i = 0; i < giveawayConfig.registrationArr.length; i++)
            {
                if(giveawayConfig.registrationArr[i] == tags.username)
                {
                    userFound = true;
                    i = giveawayConfig.registrationArr.length;
                }
            }

            if(userFound == true)
            {
                client.say(channel, `@${tags.username}, You are  already registered!`);
            }

            //register the current user
            if(userFound == false)
            {
                client.say(channel, `@${tags.username}, You are now registered!`);
                giveawayConfig.registrationArr.push(tags.username);
            }
            
        }

        // start giveaway entires submission
        if(message.toLowerCase().startsWith('!giveaway start') && tags.username == process.env.YOUR_USERNAME && giveawayConfig.registerStart == false && giveawayConfig.registrationArr.length == 0)
        {
            var commandParameter = message.toLowerCase().split('start ').pop();
            //console.log(index);
            //!register start Free Twitch Sub
            giveawayConfig.prize = toUpper(commandParameter);
            
            giveawayConfig.registerStart = true;
            client.say(channel, 'The giveaway has now started! Use command !giveaway for a chance to win');
        }

        // get prize info
        if(message.toLowerCase() == '!giveaway prizes' && message.toLowerCase()== '!giveaway prize' && giveawayConfig.registerStart == true && giveawayConfig.prize != null)
        {
            client.say(channel, 'The prize for this giveaway is: ' + prize + '.');
        }

        // end open submissions
        if(message.toLowerCase() == '!giveaway end' && tags.username == process.env.YOUR_USERNAME && giveawayConfig.registerStart == true)
        {
            giveawayConfig.registerStart = false;
            client.say(channel, 'The giveaway has now end! Drawing will begin shortly.');
        }

        // draw contest winner
        if(message.toLowerCase() == '!giveaway draw' && tags.username == process.env.YOUR_USERNAME && giveawayConfig.registerStart == false && giveawayConfig.registrationArr.length > 0)
        {
            var winner = Math.floor((Math.random() * giveawayConfig.registrationArr.length));
            var winnerUsr = giveawayConfig.registrationArr[winner];
            client.say(channel, `The winner of the Giveaway is..., @${winnerUsr}`);

            //reset variables
            giveawayConfig.registrationArr = [];
            giveawayConfig.registerStart = false;
            giveawayConfig.prize = null;
        }

        //draw contest multiple winner
        if(message.toLowerCase().startsWith('!giveaway draw ') && tags.username == process.env.YOUR_USERNAME && giveawayConfig.registerStart == false && giveawayConfig.registrationArr.length > 0)
        {
            /**grab multiple random users from register array
             * a user can only win once per giveaway
            */

            //return a numerical value for number of winners
            //TODO: TYPE CHECKING
            var commandParameter = message.toLowerCase().split('draw ').pop();

            var tempArr = giveawayConfig.registrationArr;
            var winnerUsrArr = [];

            for(var i = 0; i < commandParameter; i++)
            {
                var winnerIndex = Math.floor((Math.random() * tempArr.length));
                var winnerUsr = tempArr[winnerIndex];

                //add winning user to winner User array
                winnerUsrArr.push(winnerUsr);

                //remove that index from the temp array
                tempArr.splice(winnerIndex, 1);
                
            }

            for(var i = 0; i < winnerUsrArr.length; i++)
            {
                client.say(channel, `The winner of the Giveaway is..., @${winnerUsrArr[i]}`);
            }

        }

        function toUpper(str)
        {
            return str
                .toLowerCase()
                .split()
                .map(function(word){
                    return word[0].toUpperCase() + word.substr(1);
                })
            .join(' ');
        }
        


    }
};