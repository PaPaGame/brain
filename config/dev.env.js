'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ENV_CONFIG: '"DEV"',
  API_PATH: '"//192.168.199.136:9050/api"',
  PUBLIC_PATH: '"//192.168.199.136:9050/dist"'
})
