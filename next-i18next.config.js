/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: 'pt',
    locales: ['pt', 'en', 'es', 'fr'],
    localeDetection: true,
  },
  // debug: process.env.NODE_ENV === 'development',
  // saveMissing: false,
  // keySeparator: false,
  // nsSeparator: false,
  // pluralSeparator: '_',
  // contextSeparator: '_',
  // defaultNS: 'common',
  // localePath: path.resolve('./public/locales'),
  // reloadOnPrerender: process.env.NODE_ENV === 'development',
  // interpolation: {
  //   escapeValue: false, // not needed for react as it escapes by default
  // },
  // react: {
  //   useSuspense: false,
  // },
};
