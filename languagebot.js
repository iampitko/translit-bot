require('dotenv').config()
const { Telegraf } = require('telegraf')
const translit = require('ua-en-translit');
const convert = require('translit-english-ukrainian')



const bot = new Telegraf(process.env.BOT_TOKEN)



bot.start((ctx) => ctx.reply(
    `
Привіт, ${ctx.message.from.first_name}!
Цей бот транслітерує з української на англійську та навпаки.
Введіть текст, написаний українськими або англійськими буквами.
Під низом з'явиться результат транслітерації.
Додаткову інформацію можна отримати командою /help.
`
))



bot.help((ctx) => ctx.reply(
    `
    Сервіс автоматичної транслітерації відповідає офіційним вимогам Кабінету Міністрів України. Використовуючи його, ви можете протранслітерувати як список посилань для наукової статті, так і ваше прізвище, ім’я та по батькові для паспортної документації. Транслітерування виконується згідно з Постановою Кабінету Міністрів України від 27 січня 2010 р. № 55 «Про впорядкування транслітерації українського алфавіту латиницею».
    `
))



bot.on('text', async (ctx) => 
{



    let uaName = (ctx.message.text);
    
    
    
    try{

        const enName = await translit.async(uaName);
        const enName1 = convert(uaName)

        const format = `
Текст для транслітерації: ${ctx.message.text}

Транслітерований текст🇬🇧: ${enName}

Транслітерований текст🇺🇦: ${enName1}
        `

        ctx.reply (format);
    } catch {
        ctx.reply('Збій');
    }
})



bot.on('sticker', (ctx) => ctx.reply('Введіть текст для транслітерації'))



bot.launch()



process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))