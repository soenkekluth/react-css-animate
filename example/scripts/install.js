const exec = require('child_process').execSync;
const path = require('path');
const fs = require('fs');
const commandExists = require('command-exists');
const deps = require(path.resolve(__dirname , '../../package.json')).dependencies;
const dependencies = Object.keys(deps).map(key => key+'@'+deps[key]).join(' ');

const shell = (command) => {
  return new Promise((resolve, reject) => {

    var out = '';
    exec(command, { stdio: 'inherit' }, (error, stdout, stderr) => {
      if (error) {
        resolve(error);
        return;
      }
      // console.log(stdout);
      if (stderr) {
        out = stderr;
        // return;
      }

      out += stdout;

      resolve(out);
    });

  });
}

commandExists('yarn', function(err, exists) {

  let cmd = 'npm i --save';
  if(exists && fs.existsSync('./yarn.lock')){
    cmd = 'yarn add';
  }
  cmd += ' ' + dependencies;
  console.info('executing '+cmd);
  shell(cmd);
});
