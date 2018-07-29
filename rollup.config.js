import postcss from 'rollup-plugin-postcss';

const rollupConfig = require('kcd-scripts/config').getRollupConfig();

module.exports = {
  input: 'src/index.js',
  external: ['react', 'react-dom', 'prop-types', 'semantic-ui-react'],
  output: Object.assign(rollupConfig.output[0], {
    name: 'ReactSemanticUiDatepickers',
    file: 'dist/react-semantic-ui-datepickers.js',
    format: 'cjs',
    exports: 'default',
    globals: {
      react: 'React',
      'react-dom': 'ReactDOM',
      'prop-types': 'PropTypes',
      'semantic-ui-react': 'semanticUiReact',
    },
  }),
  plugins: [postcss({ extract: true, minimize: true })].concat(
    rollupConfig.plugins
  ),
};
