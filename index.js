require("dotenv").config();
const { Bot, GrammyError, HttpError, InlineKeyboard } = require("grammy");
const bot = new Bot(process.env.BOT_API_KEY);

bot.api.setMyCommands([
  { command: "start", description: "Start the bot" },
  {
    command: "initialize_repo",
    description: "Initialize Repository",
  },
  {
    command: "synchro_repositories",
    description: "Synchronization of local and remote repositories",
  },
  
]);

bot.command("start", async (ctx) => {
  await ctx.reply(
    "Hello! I'm a bot. I'm going to remind you of the main Git commands!"
  );
});
bot.command("initialize_repo", async (ctx) => {
  const inlineKeyboardInit = new InlineKeyboard().text(
    "Initialize Repository",
    "git init"
  );
  await ctx.reply("Git command to initialize a repository:", {
    reply_markup: inlineKeyboardInit,
  });
});

bot.command("synchro_repositories", async (ctx) => {
  const inlineKeyboardSynchro = new InlineKeyboard()
    .text("Synchronization of local and remote repositories", "git synchro")
    .row()
    .text("Check that the repositories are actually linked", "git remote")
    .row()
    .text('Upload all commits from the local repository to the remote ', 'git push')
    .row()
  await ctx.reply("Git command to synchronize local and remote repositories:", {
    reply_markup: inlineKeyboardSynchro,
  });
});
bot.on("callback_query:data", async (ctx) => {
  const data = ctx.callbackQuery.data;
  await ctx.answerCallbackQuery();
  if (data === "git init") {
    await ctx.reply("Git command to initialize a repository is: git init");
  } else if (data === "git synchro") {
    await ctx.reply(
      "Git command to synchronize local and remote repositories: git remote add origin <url>"
    );
  } else if (data === "git remote") {
    await ctx.reply(
      "Git command to check that the repositories are actually linked: git remote -v"
    );
  } else if(data==='git push'){
    await ctx.reply(
      "Git command to upload all commits from the local repository to the remote (first time): git push origin <master|main> further: git push"
    );
  }
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
