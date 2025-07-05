import { src, dest, series, parallel } from 'gulp';
import fs from 'fs';
import zip from 'gulp-zip';
import log from 'fancy-log';
import { exec } from 'child_process';
import { build } from 'esbuild';
import pj from '../package.json' with { type: "json" };


const paths = {
    prod_build: '../release',
    src: '../dist/**/*',
    dest: '/app',
};

function clean(cb) {
    log('Removing the old files in the directory');

    fs.rm(paths.prod_build, { force: true, recursive: true }, (err) => {
        if(!err){
            cb();
        }else {
            log(err);
        }
    });
}

function getZipName(cb) {
  log('Getting timestamp');

  const now = new Date();
  const time = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}`;
  const outFile = `${pj.name}-${time}.zip`;

  paths.zipped_file_name = outFile;
  
  cb();
    
}

function createFolder() {

    const dir = paths.prod_build;
    log(`Creating the folder if not exist  ${dir}`)
    if(!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
      log('?  folder created:', dir);
    }
  
    return Promise.resolve('the value is ignored');
  }

  function buildCodeTask(cb) {
    log('building code into the directory')
    return exec('cd .. && vite build', function (err, stdout, stderr) {
      log(stdout);
      log(stderr);
      cb(err);
    })
  }

  function buildServer() {
    log('building express server code into the directory')
    return build({
        entryPoints: ['server.ts'],  // Your TypeScript entry point
        bundle: true,                    // Bundle all dependencies
        platform: 'node',                // Target Node.js
        target: ['node16'],              // Target Node.js version
        outfile: `${paths.prod_build}/server.cjs`,  // Output file
        minify: true,                    // Minify the output
        sourcemap: false,                // Optional: Disable source maps
      }).catch((err) => log(err));
  }

  function copyCodeTask() {
    log('copying code into the directory')
    return src(`${paths.src}`, {encoding: false})
          .pipe(dest(`${paths.prod_build}${paths.dest}`));
  }
  
  function copyNodeJSCodeTask() {
    log('building and copying server code into the directory')
    return src(['package.json'])
          .pipe(dest(`${paths.prod_build}`))
  }

  async function zippingTask() {
    log('zipping the code ')
    return src(`${paths.prod_build}/**`, {encoding: false})
        .pipe(zip(`${paths.zipped_file_name}`))
        .pipe(dest(`${paths.prod_build}`))
  }
  


export default series(clean,getZipName,createFolder,parallel(buildServer, buildCodeTask), parallel(copyCodeTask, copyNodeJSCodeTask), zippingTask);
