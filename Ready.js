//Ejecutar Bot = CMD > CD C:\Users\Jorge\Desktop\HarukaBot > npx nodemon Ready.js
const { Client, messageEmbed, MessageEmbed } = require('discord.js');
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

require('dotenv').config();

const Prefijo = "!";

client.on('ready', () => { //El bot indica que esta activo y listo
    console.log('------------------------------------------------');
    console.log(`Bot is ready as ${client.user.tag}`);
    console.log(`Bot: @${client.user.id} \nStatus: ${client.presence.status}`);
    console.log('Author: HarukaSan115')
    console.log('------------------------------------------------');

    client.user.setStatus('Online');
    client.user.setActivity('vigilar el servidor', { type: 'PLAYING' });
});

client.on('messageCreate', async (message) => {
    //Todos los eventos aqui
    if (!message.author.bot) {
        //Baneo para evitar que el bot se responda a si mismo o a otro bot cuando saluda
        if (message.content.toLowerCase().includes('hello') || message.content.toLowerCase().includes('hola') || message.content.toLowerCase().includes('holas')) {
            //El bot responde a un mensaje de hola sin importar mayusculas o minusculas
            message.reply(`Hola ${message.author}, te saluda el HarukaBot y estoy aqui para lo que necesites`);
            console.log(message.channelId);
        }

        if (message.content.startsWith(Prefijo)) { //Comandos
            const Argumentos = message.content.slice(Prefijo.length).split(/ +/);
            console.log(Argumentos);
            const Comando = Argumentos.shift().toLowerCase();
            console.log(Comando);
            switch (Comando) {
                case 'test':
                    message.channel.send('Beep Boop');
                    break;

                case 'ping':
                    message.channel.send('Beep Boop');
                    break;

                case 'comandos':
                    const MessEmb = new MessageEmbed()
                        .setColor('#ef3caa')
                        .setTitle('Lista de comandos')
                        .setAuthor('Haruka-San', 'https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png', 'https://encycolorpedia.es/')
                        .setDescription('Esta es la lista de comandos que puedes utilizar')
                        .addFields(
                            {
                                name: '!Ping',
                                value: 'Este comando hace que el bot envie un mensaje de respuesta pong',
                                inline: false
                            },
                            {
                                name: '!Test',
                                value: 'Este comando hace que el bot envie un mensaje de respuesta Beep Boop',
                                inline: false
                            })
                        .setTimestamp()
                        .setFooter('Haruka-San', 'https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png');
                    message.reply({ embeds: [MessEmb] });
                    break;

                default:
                    console.log(message.channel.lastMessage.author.id);
                    message.reply('Esto no es un comando, consulta !Comandos');
                    console.log(message.channel.lastMessage.author.id);
                    break;
            }
        }
    }
})
client.login(process.env.DISCTOKEN); //El bot se incia con el token