const { execSync } = require("child_process");
const inquirer = require("inquirer");
const fs = require("fs");

(async () => {
  const { choice } = await inquirer.prompt([
    {
      type: "list",
      name: "choice",
      message: "Which component library do you want to install?",
      choices: ["Next.js", "React Native"],
    },
  ]);

  const config = JSON.parse(fs.readFileSync("package.json"));
  config.config.choice = choice;
  fs.writeFileSync("package.json", JSON.stringify(config, null, 2));

  if (choice === "Next.js") {
    console.log("Installing Next.js components...");
    execSync("cd nextjs-components && npm install", { stdio: "inherit" });
  } else if (choice === "React Native") {
    console.log("Installing React Native components...");
    execSync("cd reactnative-components && npm install", { stdio: "inherit" });
  }
})();
