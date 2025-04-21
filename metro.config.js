const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

<<<<<<< HEAD
=======
const defaultConfig = getDefaultConfig(__dirname);
const {assetExts, sourceExts} = defaultConfig.resolver;

>>>>>>> 8fdbe0e (sign up page)
/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
<<<<<<< HEAD
const config = {};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
=======
const config = {
  transformer: {
    babelTransformerPath: require.resolve(
      'react-native-svg-transformer/react-native',
    ),
  },
  resolver: {
    assetExts: assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg'],
  },
};

module.exports = mergeConfig(defaultConfig, config);
>>>>>>> 8fdbe0e (sign up page)
