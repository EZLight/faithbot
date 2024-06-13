const axios = require('axios')
const { SlashCommandBuilder } = require("discord.js");

module.exports = { 
    data: new SlashCommandBuilder()
    .setName('verse')
    .setDescription('Get a Bible verse')
    .addStringOption(option =>
        option.setName('reference')
            .setDescription('The Bible verse reference')
            .setRequired(true)),
            async execute(interaction) {
                const reference = interaction.options.getString('reference');
                console.log(`Received reference: ${reference}`);
        
                try {
                    const response = await axios.get(`https://bible-api.com/${reference}`)
        
                    const verse = response.data;
                    console.log(`Fetched verse: ${verse.reference}: ${verse.text}`);
        
                    await interaction.reply(`${verse.reference}: ${verse.text}`);
                } catch (error) {
                    console.error('Error fetching verse:', error);
                    await interaction.reply('An error occurred while fetching the verse.');
                }
            }
        };
