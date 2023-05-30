// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ar'],
  },
  ...(typeof window === undefined ? (
    { localePath: path.resolve('./public/locales') }
  ) : (
    {}
  )),
}