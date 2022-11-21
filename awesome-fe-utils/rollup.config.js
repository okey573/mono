import json from '@rollup/plugin-json'

export default {
  input: './index.js',
  output: {
    name: 'awesome-fe-utils',
    file: 'dist/index.js',
    format: 'es'
  },
  plugins: [json()]
}
