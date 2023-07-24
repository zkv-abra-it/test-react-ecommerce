const {alias} = require('react-app-rewire-alias')

module.exports = function override(config) {
  alias({
    '@components': 'src/components',
    '@hooks': 'src/hooks',
    '@context': 'src/context',
    '@assets' : 'src/assets'
  })(config)

  return config
}