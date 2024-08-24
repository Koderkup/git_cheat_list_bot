const { InlineKeyboard, Keyboard } = require("grammy");
const questions = require("../questions.json");
const questionsKey = Object.keys(questions);
const getAnswer = (quest) => {
  const question = questionsKey.find((key) => key === quest);
  return questions[question] ? questions[question] : "answer not found";
};

async function getMainMenuKeyboard() {
  return new Keyboard()
    .text("Initialize repository", "initialize_repo")
    .text("Synchronize Repositories", "synchro_repositories")
    .row()
    .resized()
    .text("Prepare for commit", "preparing_for_commit")
    .text("Creating & publishing a commit", "commit")
    .resized()
    .row()
    .text("Commit information", "commit_information")
    .resized()
    .row()
    .text("View file status", "git status")
    .text("Change the latest commit")
    .resized()
    .oneTime();
}
async function getInitializing() {
  return new InlineKeyboard().text("✅ Initialize Repository", "git init");
}
async function getSynchronizing() {
  return new InlineKeyboard()
    .text(
      "🔄 Synchronization of local  and remote repositories",
      "git synchro"
    )
    .row()
    .text("🔄 Check that the repositories are actually linked", "git remote")
    .row()
    .text(
      "🔄 Upload all commits from the local repository to the remote ",
      "git push"
    )
    .row();
}

async function getStage() {
  return new InlineKeyboard().text("⚙️ Prepare for commit", "git add");
}

async function getLog() {
  return new InlineKeyboard()
    .text("📝 Commit information", "git log")
    .text("📝 Brief information", "git log --oneline");
}

async function getCommit() {
  return new InlineKeyboard()
    .text("🔧 Make a commit", "git commit")
    .text("🔧 Add changes to remote", "git push");
}

module.exports = {
  getAnswer,
  getMainMenuKeyboard,
  getInitializing,
  getSynchronizing,
  getStage,
  getLog,
  getCommit
};

