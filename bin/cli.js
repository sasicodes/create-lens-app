#!/usr/bin/env node

// Usage: npx create-lens-app <project-name>

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const arg = require('arg');
const chalk = require('chalk');

const validTemplates = ["vite-ts", "vite-js"]

const args = arg({
    '--help': Boolean,
    '--template': String,
    '-h': '--help',
    '-t': '--template',
});

if (args['--help'] || (!args._[0])) {
    console.log(chalk`
    {bold.cyan create-lens-app} - Create Lens App in one command ⚡
    {bold USAGE}
      {bold $} {cyan create-lens-app} --help
      {bold $} {cyan create-lens-app} {underline my-app}
      {bold $} {cyan create-lens-app} {underline my-app} [--template {underline template_name}]
    {bold OPTIONS}
      --help,     -h                      shows this help message
      --template,  -t {underline template_name}  sets the template
  `);
    process.exit(0);
}

const runCommand = command => {
    try {
        execSync(`${command}`, { stdio: 'inherit' })
    } catch (error) {
        console.log(`Failed to execute ${command}`, error)
        return false
    }
}
const currentDir = process.cwd();

// The first argument will be the project name.
const projectName = path.join(currentDir, args._[0]);

const templateName = args['--template'] || 'vite-ts';

if (!validTemplates.includes(templateName)) return console.log(`❗❗❗ Template not found: ${templateName}`)

console.log("🌿 Creating Lens project...")
// Create a project directory with the project name.
const projectDir = path.resolve(currentDir, projectName);
fs.mkdirSync(projectDir, { recursive: true });

console.log("📦 Using default template `vite-ts`");
const templateDir = path.resolve(__dirname, `../templates/${templateName}`);
fs.cpSync(templateDir, projectDir, { recursive: true, force: true });

fs.renameSync(
    path.join(projectDir, '_gitignore'),
    path.join(projectDir, '.gitignore')
); 

const projectPackageJson = require(path.join(projectDir, 'package.json'));

// Update the project's package.json with the new project name
projectPackageJson.name = projectName;

fs.writeFileSync(
    path.join(projectDir, 'package.json'),
    JSON.stringify(projectPackageJson, null, 2)
);

// Run `npm install` in the project directory to install
// the dependencies.
console.log(`🌀 Installing dependencies for ${projectName}`)
const installDepsCommand = `cd ${projectName} && npm install`
runCommand(installDepsCommand)

console.log("\nOK BLOOMER 🌿 Your app is ready!");
console.log(`\nCreated lens app at ${projectDir}`);