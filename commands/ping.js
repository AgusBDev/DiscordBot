import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
            .setName('ping')
            .setDescription('Esto es para boludear y spamear a todos')

export async function execute(interaction){
    console.log(interaction)
    await interaction.reply('Comanme las dos bolas todos')
} 
