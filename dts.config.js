const copy = require('rollup-plugin-copy');
const postcss = require('rollup-plugin-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = {
  rollup(config, options) {
    config.plugins.push(
      postcss({
        plugins: [
          autoprefixer(),
          cssnano({
            preset: 'default',
          }),
        ],
        inject: true,
        // only write out CSS for the first bundle (avoids pointless extra files):
        extract: options.writeMeta
          ? 'react-semantic-ui-datepickers.css'
          : false,
      })
    );

    if (options.writeMeta) {
      config.plugins.push(
        copy({
          targets: [{ src: 'src/locales', dest: 'dist' }],
        })
      );
    }

    return config;
  },
};
