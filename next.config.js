// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPlugins = require('next-compose-plugins');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withPlausibleProxy } = require('next-plausible');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withSentryConfig } = require('@sentry/nextjs');

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

const nextConfig = withPlugins(
  [
    withPlausibleProxy({
      subdirectory: 'analytics',
    }),
  ],
  {
    swcMinify: true,
    reactStrictMode: true,
    i18n: {
      locales: ['en-CA'],
      defaultLocale: 'en-CA',
    },
  }
);

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
