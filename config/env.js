'use strict';

const fs = require('fs');

const ENV = process.env.IONIC_ENV;
if (!ENV) {
  throw new Error(
    'The NODE_ENV environment variable is required but was not specified.'
  );
}

// https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use
const dotenvFiles = [
  `.env.${ENV}.local`,
  `.env.${ENV}`,
  // Don't include `.env.local` for `test` environment
  // since normally you expect tests to produce the same
  // results for everyone
  ENV !== 'test' && `.env.local`,
  '.env',
].filter(Boolean);

// Load environment variables from .env* files. Suppress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set.
// https://github.com/motdotla/dotenv
dotenvFiles.forEach(dotenvFile => {
  if (fs.existsSync(dotenvFile)) {
    require('dotenv').config({
      path: dotenvFile,
    });
  }
});

// injected into the application via DefinePlugin in Webpack configuration.
const APP = /^APP_/i;

const raw = Object.keys(process.env)
  .filter(key => APP.test(key))
  .reduce(
    (env, key) => {
      env[key] = process.env[key];
      return env;
    }, {}
  );

const stringified = {
  'process.env': Object.keys(raw).reduce((env, key) => {
    env[key] = JSON.stringify(raw[key]);
    return env;
  }, {}),
};

module.exports = stringified;
