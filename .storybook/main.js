module.exports = {
  stories: ['../stories/**/*.stories.tsx'],
  addons: ['@storybook/addon-knobs', '@storybook/addon-storysource'],
  babel: async options => ({
    ...options,
    plugins: options.plugins.concat('@babel/plugin-proposal-class-properties'),
  }),
};
