/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    // These are all the locales you want to support in your application
    locales: ['pt', 'en', 'es', 'fr'],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: 'pt',
    // This is a list of locale domains and their default locales
    // Used for automatic locale detection
    // domains: [
    //   {
    //     domain: 'example.com',
    //     defaultLocale: 'en',
    //   },
    //   {
    //     domain: 'example.pt',
    //     defaultLocale: 'pt',
    //   },
    //   // Add more domains as needed
    // ],
  },
  // Optional: Add path aliases if needed
  // webpack: (config, { isServer }) => {
  //   // Add path aliases
  //   config.resolve.alias['@'] = path.resolve(__dirname, 'src');
  //   return config;
  // },
};

module.exports = nextConfig;
