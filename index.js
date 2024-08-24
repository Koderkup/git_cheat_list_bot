require("dotenv").config();
const { Bot, GrammyError, HttpError } = require("grammy");
const {
  getAnswer,
  getMainMenuKeyboard,
  getInitializing,
  getSynchronizing,
  getStage,
  getLog,
  getCommit
} = require("./utils/utils");
const bot = new Bot(process.env.BOT_API_KEY);

bot.command("start", async (ctx) => {
  await ctx.reply(
    "Hello! I'm a bot. I'm going to remind you of the main Git commands!"
  );
});
bot.command("menu", async (ctx) => {
  const menuKeyboard = await getMainMenuKeyboard();
  await ctx.reply("Main Menu", { reply_markup: menuKeyboard });
});

bot.on("message", async (ctx) => {
  const data = ctx.message.text;
  if (ctx.message.text) {
    switch (data) {
      case "Initialize Repository":
        const inlineKeyboardInit = await getInitializing();
        await ctx.reply("Initializing repository...", {
          reply_markup: inlineKeyboardInit,
        });
        break;
      case "Synchronize Repositories":
        const inlineKeyboardSynchro = await getSynchronizing();
        await ctx.reply("Synchronizing repositories...", {
          reply_markup: inlineKeyboardSynchro,
        });
        break;
      case "Prepare for Commit":
        const inlineKeyboardStage = await getStage();
        await ctx.reply("Preparing for commit...", {
          reply_markup: inlineKeyboardStage,
        });
        break;
      case "Commit information":
        const inlineKeyboardLog = await getLog();
        await ctx.reply("Log:", { reply_markup: inlineKeyboardLog });
        break;
      case "View file status":
        await ctx.reply(getAnswer("git status"));
        break;
      case "Change the latest commit":
        await ctx.reply(getAnswer("git commit --amend"));
        break;
        case "Creating & publishing a commit":
          const inlineKeyboardCommit = await getCommit();
          await ctx.reply("Committing...", { reply_markup: inlineKeyboardCommit });
          break;
      default:
        break;
    }
  }
});

bot.on("callback_query:data", async (ctx) => {
  const data = ctx.callbackQuery.data;
  await ctx.answerCallbackQuery();
  await ctx.reply(getAnswer(data));
});
bot.catch((err) => {
  const ctx = err.ctx;
  console.error(`Error while handling ${ctx.update.update_id}:`);
  const e = err.error;
  if (e instanceof GrammyError) {
    console.error("Error in request:", e.description);
  } else if (e instanceof HttpError) {
    console.error("Could not contact Telegram:", e);
  } else {
    console.error("Unknown error:", e);
  }
});
bot.start();
