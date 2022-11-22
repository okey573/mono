import typescript from 'rollup-plugin-typescript2'
import json from '@rollup/plugin-json'
import { defineConfig } from 'rollup'

export default defineConfig({
  input: './index.ts',
  output: {
    name: 'awesome-fe-utils',
    file: 'dist/index.js',
    format: 'es'
  },
  plugins: [
    json(),
    typescript({
      useTsconfigDeclarationDir: true,
      tsconfigOverride: { compilerOptions: { sourceMap: false } }
    })
  ]
})
