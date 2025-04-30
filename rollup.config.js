const { withUndercroftRollupConfig } = require('@undercroft/lib-tools');
const nodePolyfills = require('rollup-plugin-polyfill-node');

module.exports = withUndercroftRollupConfig({
  name: 'Pulse',
  bundle: 'undercroftjs/pulse',
  globals: {
    http: 'http',
    crypto: 'crypto',
    zlib: 'zlib',
  },
  plugins: [nodePolyfills()],
});