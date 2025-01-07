const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("\nWhich components do you want to install?");
console.log("1. Next.js Components");
console.log("2. React Native Components");

rl.question("\nEnter your choice (1 or 2): ", (choice) => {
  let folder = null;

  if (choice === "1") {
    folder = "nextjs-components";
    console.log("\nInstalling Next.js Components...");
  } else if (choice === "2") {
    folder = "reactnative-components";
    console.log("\nInstalling React Native Components...");
  } else {
    console.error("\nInvalid choice. Exiting...");
    rl.close();
    process.exit(1);
  }

  if (folder) {
    const folderPath = path.resolve(__dirname, folder);
    try {
      execSync("npm install", { cwd: folderPath, stdio: "inherit" });
      
      // Update the entry point in the root package.json
      const rootPackageJsonPath = path.resolve(__dirname, "package.json");
      const rootPackageJson = require(rootPackageJsonPath);
      rootPackageJson.main = `${folder}/src/index.js`;
      fs.writeFileSync(rootPackageJsonPath, JSON.stringify(rootPackageJson, null, 2));

      console.log(`\nDependencies installed for ${folder}.`);
    } catch (error) {
      console.error(`\nError installing dependencies for ${folder}:`, error);
      process.exit(1);
    }
  }

  rl.close();
});
