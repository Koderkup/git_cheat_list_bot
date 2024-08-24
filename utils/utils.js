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
    .text("View file status", "git status")
    .resized()
    .row()
    .text("Change the latest commit")
    .text("Rollback commits")
    .row()
    .resized()
    .text("View changes")
    .text("Cloning repository")
    .row()
    .resized()
    .text("Creating branches")
    .text("Branch navigation")
    .row()
    .resized()
    .text("Branch comparison")
    .text("Removing branches")
    .row()
    .resized()
    .text("Merging branches")
    .text("Working with a remote repository")
    .row()
    .resized()
    .oneTime();
}
async function getInitializing() {
  return new InlineKeyboard().text("✅ Initialize Repository", "git init");
}
async function getSynchronizing() {
  return new InlineKeyboard()
    .text("🔄 Synchronization of local  and remote repositories", "git synchro")
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
async function getRollback() {
  return new InlineKeyboard()
    .text("🔙 Revert the files to the latest version", "git restore")
    .row()
    .text("🔙 Delete all uncommitted changes", "git reset");
}

async function getCreateBranches() {
  return new InlineKeyboard()
    .text("🌿 Create a new branch", "git branch create")
    .row()
    .text("🌿 Create a new branch and checkout it", "git checkout");
}

async function getBranchNavigation() {
  return new InlineKeyboard()
    .text("🔙 Show what branches there are", "git branch")
    .row()
    .text("🔙 Branches, both local and remote", "git branch -a")
    .row()
    .text("🔙 Switch branch", "git checkout feature/br");
}

async function getDeleteBranch() {
  return new InlineKeyboard()
    .text("🧹 Delete a branch", "git branch -d")
    .row()
    .text("🧹 Delete a branch that is not merged", "git branch -D");
}

async function getWorkingWithRemote() {
  return new InlineKeyboard()
    .text("🌐 Post a new branch", "git push -u")
    .row()
    .text("🌐 Push additional changes to branch", "git push my-branch")
    .row()
    .text("🌐 Pull changes to the current branch", "git pull");
}
module.exports = {
  getAnswer,
  getMainMenuKeyboard,
  getInitializing,
  getSynchronizing,
  getStage,
  getLog,
  getCommit,
  getRollback,
  getCreateBranches,
  getDeleteBranch,
  getWorkingWithRemote,
  getBranchNavigation,
};
