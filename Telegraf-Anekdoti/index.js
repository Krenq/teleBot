const { Telegraf } = require('telegraf')
require('dotenv').config();
const text = require('./const');
let api = require('random-jokes-api');



const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => ctx.reply(`Привет, ${ctx.message.from.first_name ? ctx.message.from.first_name : 'любитель анекдотов'}! Вводи слово на английском и получай анекдот.`))

bot.help((ctx) => ctx.reply(text.commands))

bot.on('sticker', (ctx) => ctx.reply('👍'))

bot.on("text", async (ctx) => {

  const messageFromUser = ctx.message.text;

  let i = 0
  let j
  while (j = api.joke(i++)) {
    if (j.toLowerCase().includes(messageFromUser.toLowerCase())) {
      return await ctx.reply(j)
    }
    
  }
  return await ctx.reply(`Sorry not joke with word: ${messageFromUser}`)
      // if (ctx.message.text == "joke") {
      //   let jokes = api.joke()
      //   ctx.reply(jokes)
      // }
})
// bot.hears('hi', (ctx) => ctx.reply('Hey there'))


bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
