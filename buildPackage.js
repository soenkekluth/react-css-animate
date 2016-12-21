/* eslint-disable no-console */

import {rollup} from 'rollup'
import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'
import commonjs from 'rollup-plugin-commonjs'
import nodeResolver from 'rollup-plugin-node-resolve'
import babelrc from 'babelrc-rollup';


let pkg = require('./package.json');
let external = Object.keys(pkg.dependencies);
external.push('src/css-animate')
external.push('src/css-animate-group')
external.push('src/animation-utils')

const packages = {
  'css-animate': {
    name: 'CSSAnimate',
    entry: 'css-animate.js'
  },
  'animation-utils': {
    name: 'AnimationUtils',
    entry: 'animation-utils.js'
  },
  'css-animate-group': {
    name: 'CSSAnimateGroup',
    entry: 'css-animate-group.js'
  }
}

// Small helper to error and exit on fail
const errorOnFail = err => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
}

const babelPlugin = babel({
  babelrc: false,
  presets: [ 'es2015-rollup', 'stage-0', 'react']
  // presets: [ 'es2015-rollup', 'stage-0' ]
})

// const babelPlugin = babel(babelrc());

const nodeResolverPlugin = nodeResolver({ jsnext: true, main: true })
const commonJSPlugin = commonjs({
  exclude: ['node_modules/**', 'src/**'] ,
  // exclude: [ 'node_modules/react/**'/*, 'node_modules/react-dom/**' */],
  namedExports: {
      // left-hand side can be an absolute path, a path
      // relative to the current directory, or the name
      // of a module in node_modules
      // 'react': [ 'Component' ],
      // 'react-dom': [ 'ReactDOM' ]
    }
})
const uglifyPlugin = uglify()

const plugins = [ babelPlugin, nodeResolverPlugin, commonJSPlugin ]
// const plugins = [ babelPlugin ]

function rollupConfig(pkg, info, minify) {
  return {
    entry: 'src/' + info.entry,
    // plugins: minify ? plugins.concat(uglifyPlugin) : plugins,
    plugins: plugins,
    external: external
  }
}

function bundleConfig(pkg, info, minify) {
  return {
    // format: 'cjs',
    format: 'es',
    // moduleName: info.name,
    // dest: 'dist/' + pkg + (minify ? '.min' : '') + '.js',
    dest: 'example/src/' + pkg + '.js',
    // sourceMap: !minify
  }
}

function buildPackage(pkg) {
  rollup(rollupConfig(pkg, packages[pkg], process.env.NODE_ENV === 'production'))
    .then(bundle => {
      bundle.write(bundleConfig(pkg, packages[pkg], process.env.NODE_ENV === 'production'))
      console.log('Successfully bundled ' + packages[pkg].name + (process.env.NODE_ENV === 'production' ? ' (minified).' : '.'))
    }).catch(errorOnFail)
}

Object.keys(packages).forEach(pkg => buildPackage(pkg))
