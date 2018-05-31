const Discord = require ('discord.js')
const client = new Discord.Client();
require('dotenv').config();
//const db = require('./db');

let tagRegex = /\[[a-zA-Z0-9\-_\w]*\]/g;

let trackedChannels = [
    '438072673961246730', // #testing_zone
    '438198766928003072', // #recruitment_aether
    '438198858942644224', // #recruitment_primal
    '438200491990712334', // #recruitment_chaos
    '438201059035316224', // #recruitment_elemental
    '438200991175671808', // #recruitment_mana
    '438201779927384064' // #recruitment_gaia
];

let whitelistedUsers =  [
    '438583774544920586', // Bot itself, probably unnecessary but idgaf.
    '115192890929577987', // Sky
    '102254415171313664' // Kiri
];

// tag extraction for database
/*const extractTags = (content) => {
    return(content.match(/\[(.*?)\]/g)
        .map(tag => tag.replace('['), '').replace(']', ''))
        .filter(x => x.length < 15);
}*/

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}.`);
    client.user.setActivity('the recruitment channels.', {type: 'WATCHING'});
});

client.on('message', msg => {
    if(msg.author.bot)
        return;

    if(trackedChannels.indexOf(msg.channel.id) >=0 /*&& !whitelistedUsers.indexOf(msg.author.id)*/)
    {
        if(tagRegex.test(msg.cleanContent) === false)
        {
            msg.delete();
        }
        tagRegex.lastIndex = 0;
    }
});

client.login(process.env.BOT_TOKEN)

        //TODO: FINISH THIS YOU BIG FUCKING IDIOT
        /*
        else
        {
            const payload = [
                msg.id,
                msg.createdTimestamp,
                msg.author.username.join('#').join(msg.author.discriminator),
                msg.author.id,
                msg.channel.name,
                msg.cleanContent
            ];
            db.query('INSERT INTO recruitment_messages (message_id, created_at, author_name, author_id, channel_name, content) VALUES($1, to_timestamp($2), $3, $4, $5, $6)', payload, (err) => {
                console.log(payload);
                if(err) {
                    console.log('ERROR', err);
                }
            })
        } */
