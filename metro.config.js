const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

const projectRoot = __dirname;
const mobileRoot = path.join(projectRoot, 'apps/mobile');

const config = getDefaultConfig(projectRoot);

config.watchFolders = Array.from(new Set([...(config.watchFolders ?? []), mobileRoot]));

config.resolver.disableHierarchicalLookup = true;
config.resolver.nodeModulesPaths = [path.join(projectRoot, 'node_modules')];
config.resolver.extraNodeModules = {
  ...(config.resolver.extraNodeModules ?? {}),
  '@expo/vector-icons': path.join(projectRoot, 'node_modules/@expo/vector-icons'),
  expo: path.join(projectRoot, 'node_modules/expo'),
  'expo-status-bar': path.join(projectRoot, 'node_modules/expo-status-bar'),
  react: path.join(projectRoot, 'node_modules/react'),
  'react-native': path.join(projectRoot, 'node_modules/react-native'),
};

module.exports = config;
