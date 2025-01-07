const { execSync } = require("child_process");
const path = require("path");

// Get the component type from the environment variable
const componentType = process.env.COMPONENT_TYPE || "nextjs-components"; // Default to nextjs-components

if (!["nextjs-components", "reactnative-components"].includes(componentType)) {
  console.error(
    "\nInvalid COMPONENT_TYPE. Please set COMPONENT_TYPE to either 'nextjs-components' or 'reactnative-components'."
  );
  process.exit(1);
}

console.log(`\nInstalling ${componentType} dependencies...`);

const folderPath = path.resolve(__dirname, componentType);

try {
  execSync("npm install", { cwd: folderPath, stdio: "inherit" });

  // Update the entry point in the root package.json
  const rootPackageJsonPath = path.resolve(__dirname, "package.json");
  const rootPackageJson = require(rootPackageJsonPath);
  rootPackageJson.main = `${componentType}/components/index.js`;
  require("fs").writeFileSync(
    rootPackageJsonPath,
    JSON.stringify(rootPackageJson, null, 2)
  );

  console.log(`\nDependencies installed for ${componentType}.`);
} catch (error) {
  console.error(`\nError installing dependencies for ${componentType}:`, error);
  process.exit(1);
}
