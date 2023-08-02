const {alias} = require('react-app-rewire-alias')

module.exports = function override(config) {
  alias({
    '@components': 'src/components',
    '@hooks': 'src/hooks',
    '@context': 'src/context',
    '@services': 'src/services',
    '@assets' : 'src/assets',
    '@pages' : 'src/pages',
    '@utils' : 'src/utils'
  })(config)

  return config
}