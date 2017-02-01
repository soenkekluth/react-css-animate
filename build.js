import { rollup } from 'rollup';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
// import babel from 'rollup-plugin-babel';
// import babelrc from 'babelrc-rollup';
// import { minify } from 'uglify-js';
import fs from 'fs';

const pkg = require('./package.json');
const external = Object.keys(pkg.dependencies);

/*
  create the lib for publishing to npm
*/

rollup({
  entry: pkg.src,
  // external: external,
  plugins: [
    // nodeResolve({
    //   module: true,
    //   jsnext: true,
    //   main: true,
    // }),
    // commonjs({
    //   // exclude: 'node_modules/**',
    // }),
  ],
})
  .then(bundle => bundle.write({
    dest: pkg.module,
    format: 'es',
  })).catch(err => console.log(err.stack));


// rollup({
//   entry: pkg.src,
//   external: external,
//   plugins: [
//     nodeResolve({
//       module: true,
//       jsnext: true,
//       main: true,
//     }),
//     babel(babelrc()),
//     // commonjs({
//     //    exclude: 'node_modules/**',
//     // }),
//   ],
// })
//   .then(bundle => bundle.write({
//     dest: pkg.main,
//     format: 'cjs',
//   })).catch(err => console.log(err.stack));


/*
  create dist for using as script in html
*/

// rollup({
//   entry: pkg.src,
//   plugins: [
//     nodeResolve({
//       module: true,
//       jsnext: true,
//       main: true,
//     }),
//   ],
//   external,
// })
//   .then((bundle) => {
//     bundle.write({
//       moduleName: 'VanillaTilt',
//       format: 'iife',
//       dest: pkg.dist,
//     })
//       .then(() => {
//         const code = minify(pkg.dist, {
//           mangle: { except: ['VanillaTilt'] },
//         }).code;

//         fs.writeFileSync(pkg.dist.replace('.js', '.min.js'), code);
//         return bundle;
//       });
//   }).catch(err => console.log(err.stack));


// rollup({
//   entry: pkg.src,
//   // external: external,
//   plugins: [
//     nodeResolve({
//       module: true,
//       jsnext: true,
//       main: true,
//       // preferBuiltins: false , // Default: true
//     }),
//     babel(babelrc()),
//     commonjs({
//       // include: 'node_modules/**',
//       // namedExports: { 'dom-helpers/util/requestAnimationFrame': ['animationFrame'] }
//     }),


//   ],
// })
// .then((bundle) => {
//   const dest = pkg.dist;
//   bundle.write({
//     // external: external,
//     moduleName: 'TiltJS',
//     format: 'iife',
//     dest,
//   })
//     .then(() => {
//       const code = minify(dest, {
//         mangle: { except: ['TiltJS'] },
//       }).code;

//       fs.writeFileSync(dest.replace('.js', '.min.js'), code);
//       return bundle;
//     });
// })
// .catch(err => console.log(err.stack));
