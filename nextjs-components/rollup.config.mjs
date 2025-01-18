import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

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
    }
  ],
  plugins: [resolve(), commonjs(), typescript()],
  external: ['react', 'react-dom'], // Mark peer dependencies as external
};
