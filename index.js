const TelegramApi = require('node-telegram-bot-api');

const { gameOptions, againOptions } = require('./options');

const token = '2002697389:AAFNu-V7F6JYSGyvt_OscJfgRtZRnDRoDxo';

const bot = new TelegramApi(token, { polling: true });

const chats = {};

// const gameOptions = {
// 	reply_markup: JSON.stringify({
// 		inline_keyboard: [
// 			[
// 				{ text: '1', callback_data: '1' },
// 				{ text: '2', callback_data: '2' },
// 				{ text: '3', callback_data: '3' },
// 			],
// 			[
// 				{ text: '4', callback_data: '4' },
// 				{ text: '5', callback_data: '5' },
// 				{ text: '6', callback_data: '6' },
// 			],
// 			[
// 				{ text: '7', callback_data: '7' },
// 				{ text: '8', callback_data: '8' },
// 				{ text: '9', callback_data: '9' },
// 			],
// 			[{ text: '0', callback_data: '0' }],
// 		],
// 	}),
// };

// const againOptions = {
// 	reply_markup: JSON.stringify({
// 		inline_keyboard: [[{ text: 'Yangi uyin', callback_data: '/again' }]],
// 	}),
// };

const startgame = async chatId => {
	await bot.sendMessage(
		chatId,
		`hozir 0 dan 10 gacha bulgan sonni o'ylaman shuni topishingiz kerak!`
	);
	const randomnumber = Math.floor(Math.random() * 10);
	chats[chatId] = randomnumber;
	await bot.sendMessage(chatId, `toping!`, gameOptions);
};

const startbot = () => {
	bot.setMyCommands([
		{ command: '/start', description: 'telegram' },
		{ command: '/info', description: 'Foydalanuvchining ismi' },
		{ command: '/game', description: 'Raqamni toping' },
	]);

	bot.on('message', async msg => {
		const text = msg.text;
		const chatId = msg.chat.id;
		if (text === '/start') {
			// await bot.sendSticker(chatId, `https://t.me/c/1522406542/622`);
			return bot.sendMessage(
				chatId,
				`Telegram botga hush kelibsiz ${msg.from.first_name}`
			);
		}
		if (text === '/info') {
			return bot.sendMessage(
				chatId,
				`Sizning ismingiz ${msg.from.first_name} `
			);
		}

		if (text === '/game') {
			return startgame(chatId);
		}
		return bot.sendMessage(
			chatId,
			`Sizni tushinmadim iltomos boshqattan tu'gri yozing`
		);
	});
	bot.on('callback_query', async msg => {
		const data = msg.data;
		console.log(data);
		const chatId = msg.message.chat.id;
		if (data === '/again') {
			return startgame(chatId);
		}
		if (data === chats[chatId]) {
			return bot.sendMessage(
				chatId,
				`Tabriklayman men uylagan ${chats[chatId]} raqamini topdingiz `,
				againOptions
			);
		} else {
			return bot.sendMessage(
				chatId,
				` men uylagan ${chats[chatId]} raqamini topa olmadingiz`,
				againOptions
			);
		}
	});
	// bot.sendMessage(chatId, `siz ${date} raqamini bosdingiz`);
};
startbot();
