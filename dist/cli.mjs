import g from"child_process";import d from"fs";import $ from"path";import h from"arg";import y from"chalk";import f from"inquirer";function j(e){throw new Error('Could not dynamically require "'+e+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var q={};const{execSync:v}=g,l=d,t=$,S=h,s=y,x=f,a=["vite-ts","vite-js"],r=S({"--help":Boolean,"--template":String,"--list":Boolean,"-h":"--help","-t":"--template","-l":"--list"});r["--list"]&&(console.log(`
`),a.map(e=>console.log(s.green(`${e}`))),console.log(`
`),process.exit(0)),(r["--help"]||!r._[0])&&(console.log(s`
    {bold.cyan create-lens-app} - Create Lens App in one command ⚡

    {bold USAGE}
      {bold $} {cyan create-lens-app} --help
      {bold $} {cyan create-lens-app} {underline my-app}
      {bold $} {cyan create-lens-app} {underline my-app} [--template {underline <template-name>}]
      
    {bold OPTIONS}
      --help,      -h        shows this help message
      --template,  -t        sets the template
      --list,      -l        lists all template
  `),process.exit(0));const b=e=>{try{v(`${e}`,{stdio:"inherit"})}catch(n){console.log(`Failed to execute ${e}`,n),process.exit(1)}},p=process.cwd(),i=t.join(p,r._[0]);x.prompt([{type:"list",name:"template",message:"Choose a template: ",choices:a}]).then(e=>{const n=r["--template"]||e.template||"vite-js";a.includes(n)||(console.log(`\u2757\u2757\u2757 Template not found: ${n}`),process.exit(1)),console.log(`

\u{1F33F} Creating Lens project`);const o=t.resolve(p,i);l.mkdirSync(o,{recursive:!0}),console.log(`\u{1F4E6} Using template ${n}`);const m=t.resolve(__dirname,`../templates/${n}`);l.cpSync(m,o,{recursive:!0,force:!0}),l.renameSync(t.join(o,"_gitignore"),t.join(o,".gitignore"));const c=j(t.join(o,"package.json"));c.name=i,l.writeFileSync(t.join(o,"package.json"),JSON.stringify(c,null,2)),console.log(`\u{1F300} Installing dependencies for ${i}`);const u=`cd ${i} && npm install`;b(u),console.log(s`\n{bold.green OK BLOOMER} 🌿 Your app is ready!`),console.log(s.gray(`
Created Lens project at ${o}`))}).catch(e=>{console.log(e),process.exit(1)});export{q as default};
