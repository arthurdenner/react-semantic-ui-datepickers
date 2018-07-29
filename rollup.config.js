import copy from 'rollup-plugin-copy';
import postcss from 'rollup-plugin-postcss';

const rollupConfig = require('kcd-scripts/config').getRollupConfig();

module.exports = {
  input: 'src/index.js',
  external: ['react', 'react-dom', 'prop-types', 'semantic-ui-react'],
  output: Object.assign(rollupConfig.output[0], {
    file: 'dist/react-semantic-ui-datepickers.js',
    sourcemap: true,
  }),
  plugins: [
    copy({
      'src/locales': 'dist/locales',
      'src/index.d.ts': 'dist/index.d.ts',
    }),
    postcss({ extract: true, minimize: true }),
  ].concat(rollupConfig.plugins),
};
