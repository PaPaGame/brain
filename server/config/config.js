import _ from "lodash";
import development from './development'
import production from './production'

export const env = process.env.NODE_ENV || 'development';
const configs = {
    development: development,
    production: production
}

const defaultConfig = {
    env: env
}

const config = _.merge(defaultConfig, configs[env])

export default config