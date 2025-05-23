import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import terser from '@rollup/plugin-terser';
import dynamicImportVars from '@rollup/plugin-dynamic-import-vars';

export default {
  input: 'src/plugin.js',
  preserveEntrySignatures: false,
  output: {
    dir: 'dist',
    format: 'es',
    name: 'conversePolaris',
    sourcemap: true
  },
  plugins: [
    resolve({
      browser: true,
      preferBuiltins: false,
      dedupe: ['@converse/skeletor']
    }),
    commonjs({
      include: /node_modules/,
      requireReturnsDefault: 'auto'
    }),
    postcss({
      extract: true,
      minimize: true
    }),
    dynamicImportVars({}),
    terser()
  ]
};
