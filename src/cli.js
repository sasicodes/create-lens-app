#!/usr/bin/env node

// Usage: npx create-lens-app <project-name>

import { execSync } from 'child_process'
import path from 'node:path'
import fs from 'node:fs'
import arg from 'arg'
import prompts from 'prompts'
import { cyan, gray, green, red } from 'kolorist'
import { fileURLToPath } from 'url';

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
    validTemplates.map(t => console.log(green(`${t}`)))
    console.log('\n')
    process.exit(0)
}

if (args['--help'] || (!args._[0])) {
    console.log(`
    ${cyan('create-lens-app')} - Create Lens App in one command ⚡

    USAGE
       $ ${cyan('create-lens-app')} --help
       $ ${cyan('create-lens-app')} <my-app>
       $ ${cyan('create-lens-app')} <my-app> [--template <template-name>]
      
    OPTIONS
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

const isValidPackageName = (projectName) => {
    return /^(?:@[a-z\d\-*~][a-z\d\-*._~]*\/)?[a-z\d\-~][a-z\d\-._~]*$/.test(
        projectName,
    )
}

const currentDir = process.cwd();
const projectName = path.join(currentDir, args._[0]);

if (!isValidPackageName(args._[0])) {
    console.log(red('Invalid Project name!'))
    process.exit(1)
}

prompts(
    {
        type: 'select',
        name: 'template',
        message: 'Choose a template:',
        choices: validTemplates,
    })
    .then(answers => {
        const templateName = args['--template'] || answers.template || 'vite-js';

        if (!validTemplates.includes(templateName)) {
            console.log(red(`Template not found: ${templateName}`))
            process.exit(1)
        }

        console.log("\n\n🌿 Creating Lens project")

        const projectDir = path.resolve(currentDir, projectName);
        fs.mkdirSync(projectDir, { recursive: true });

        console.log(`📦 Using template ${templateName}`);
        const templateDir = path.resolve(fileURLToPath(import.meta.url), '../', `../templates/${templateName}`);
        fs.cpSync(templateDir, projectDir, { recursive: true, force: true });

        fs.renameSync(
            path.join(projectDir, '_gitignore'),
            path.join(projectDir, '.gitignore')
        );

        const projectPackageJson = JSON.parse(
            fs.readFileSync(path.join(projectDir, `package.json`), 'utf-8'),
        )

        projectPackageJson.name = args._[0];

        fs.writeFileSync(
            path.join(projectDir, 'package.json'),
            JSON.stringify(projectPackageJson, null, 2)
        );

        console.log(`🌀 Installing dependencies for ${projectName}`)
        const installDepsCommand = `cd ${projectName} && npm install`
        runCommand(installDepsCommand)

        console.log(green`\nOK BLOOMER 🌿 Your app is ready!`);
        console.log(gray(`\nCreated Lens project at ${projectDir}`));
    })
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })