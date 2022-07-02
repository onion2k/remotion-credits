const { build } = require('esbuild');
const { dependencies, peerDependencies } = require('./package.json');
const { Generator } = require('npm-dts');

build({
  bundle: true,
  entryPoints: ['src/index.tsx'],
  external: Object.keys(dependencies).concat(Object.keys(peerDependencies)),
  format: 'esm',
  minify: true,
  outfile: 'dist/index.js',
  sourcemap: true,
  target: ['esnext'],
  watch: true
})
  .then(() => {
    console.log('ESM Build complete');
  })
  .catch(() => process.exit(1));

new Generator({
  entry: 'src/index.tsx',
  output: 'dist/index.d.ts'
}).generate();
