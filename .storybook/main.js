module.exports = {
  stories: [
<<<<<<< Updated upstream
    "@/components/**/stories.mdx",
    "@/components/**/stories.@(js|jsx|ts|tsx)",
=======
    "../src/components/**/stories.mdx",
    "../src/components/**/stories.@(js|jsx|ts|tsx)",
>>>>>>> Stashed changes
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "storybook-addon-next-router",
  ],
  framework: "@storybook/react",
  refs: {
    "@chakra-ui/react": {
      disable: true,
    },
  },
  staticDirs: ["../public"],
  webpackFinal: async (config) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          "@emotion/core": "@emotion/react",
          "emotion-theming": "@emotion/react",
        },
      },
    };
  },
};
