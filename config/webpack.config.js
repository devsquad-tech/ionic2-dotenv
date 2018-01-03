/*
 * The webpack config exports an object that has a valid webpack configuration
 * For each environment name. By default, there are two Ionic environments:
 * "dev" and "prod". As such, the webpack.config.js exports a dictionary object
 * with "keys" for "dev" and "prod", where the value is a valid webpack configuration
 * For details on configuring webpack, see their documentation here
 * https://webpack.js.org/configuration/
 */

const webpackConfig = require('@ionic/app-scripts/config/webpack.config.js');
const webpack = require('webpack');
const envs = require('./env');
const definePlugin = new webpack.DefinePlugin(envs);

for (const env of ['dev', 'prod']) {
  webpackConfig[env].plugins.push(definePlugin);
}

module.exports = {
  dev: webpackConfig.dev,
  prod: webpackConfig.prod
}
