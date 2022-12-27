#!/usr/bin/env node

// Usage: npx create-lens-app <project-name>

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const arg = require('arg');
const chalk = require('chalk');
const inquirer = require('inquirer');

const validTemplates = ["vite-ts", "vite-js"]

const args = arg({
    '--help': Boolean,
    '--template': String,
    '--list': Boolean,
    '-h': '--help',
    '-t': '--template',
    '-l': '--list',
});

if (args['--list']) {
    console.log('\n')
    validTemplates.map(t => console.log(chalk.green(`${t}`)))
    console.log('\n')
    process.exit(0)
}

if (args['--help'] || (!args._[0])) {
    console.log(chalk`
    {bold.cyan create-lens-app} - Create Lens App in one command ⚡

    {bold USAGE}
      {bold $} {cyan create-lens-app} --help
      {bold $} {cyan create-lens-app} {underline my-app}
      {bold $} {cyan create-lens-app} {underline my-app} [--template {underline <template-name>}]
      
    {bold OPTIONS}
      --help,      -h        shows this help message
      --template,  -t        sets the template
      --list,      -l        lists all template
  `);
    process.exit(0);
}

const runCommand = command => {
    try {
        execSync(`${command}`, { stdio: 'inherit' })
    } catch (error) {
        console.log(`Failed to execute ${command}`, error)
        process.exit(1)
    }
}

const currentDir = process.cwd();
const projectName = path.join(currentDir, args._[0]);

inquirer
    .prompt([
        {
            type: 'list',
            name: 'template',
            message: 'Choose a template: ',
            choices: validTemplates,
        },
    ])
    .then(answers => {
        const templateName = args['--template'] || answers.template || 'vite-js';

        if (!validTemplates.includes(templateName)) {
            console.log(`❗❗❗ Template not found: ${templateName}`)
            process.exit(1)
        }

        console.log("\n\n🌿 Creating Lens project")

        const projectDir = path.resolve(currentDir, projectName);
        fs.mkdirSync(projectDir, { recursive: true });

        console.log(`📦 Using template ${templateName}`);
        const templateDir = path.resolve(__dirname, `../templates/${templateName}`);
        fs.cpSync(templateDir, projectDir, { recursive: true, force: true });

        fs.renameSync(
            path.join(projectDir, '_gitignore'),
            path.join(projectDir, '.gitignore')
        );

        const projectPackageJson = require(path.join(projectDir, 'package.json'));

        projectPackageJson.name = projectName;

        fs.writeFileSync(
            path.join(projectDir, 'package.json'),
            JSON.stringify(projectPackageJson, null, 2)
        );

        console.log(`🌀 Installing dependencies for ${projectName}`)
        const installDepsCommand = `cd ${projectName} && npm install`
        runCommand(installDepsCommand)

        console.log(chalk`\n{bold.green OK BLOOMER} 🌿 Your app is ready!`);
        console.log(chalk.gray(`\nCreated Lens project at ${projectDir}`));
    })
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })