import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import babel from '@rollup/plugin-babel';

export default {
  input: 'src/index.ts', // Path to the entry file
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
    },
    {
      file: 'dist/index.cjs.js', // optional CommonJS output
      format: 'cjs',
      sourcemap: true,
    },
  ],
  plugins: [
    resolve(),
    commonjs(),
    typescript(),
    replace({
      preventAssignment: true,
      delimiters: ['', ''],
      include: ['node_modules/@radix-ui/**'], // Apply only to specific modules
      values: {
        '"use client";': '', // Replace "use client"
      },
    }),
    babel({
      babelHelpers: 'bundled',
      include: ['node_modules/@radix-ui/**'], // Transpile these files
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
  ],
  onwarn(warning, warn) {
    // Ignore specific warnings
    if (
      warning.code === 'MODULE_LEVEL_DIRECTIVE' &&
      warning.message.includes('"use client"')
    ) {
      return; // Suppress the warning
    }
    warn(warning); // Log other warnings
  },
  external: ['react', 'react-dom', 'next'], // Mark peer dependencies as external
};
