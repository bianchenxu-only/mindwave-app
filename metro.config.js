const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

const workspaceRoot = __dirname;
const mobileRoot = path.join(workspaceRoot, 'apps/mobile');
const projectRoot = process.cwd() === mobileRoot ? mobileRoot : workspaceRoot;
const mobileAliasPrefix = '@/';

const config = getDefaultConfig(projectRoot);
const resolveRequest = config.resolver.resolveRequest;

const rootOrigin = path.join(workspaceRoot, 'App.tsx');

config.resolver.resolveRequest = (context, moduleName, platform) => {
  const resolvedModuleName = resolveMobileAlias(moduleName);
  const rootContext =
    projectRoot === workspaceRoot && shouldResolveFromRoot(resolvedModuleName)
      ? { ...context, originModulePath: rootOrigin }
      : context;

  return resolveRequest
    ? resolveRequest(rootContext, resolvedModuleName, platform)
    : context.resolveRequest(rootContext, resolvedModuleName, platform);
};

function resolveMobileAlias(moduleName) {
  return moduleName.startsWith(mobileAliasPrefix)
    ? path.join(mobileRoot, moduleName.slice(mobileAliasPrefix.length))
    : moduleName;
}

function shouldResolveFromRoot(moduleName) {
  return (
    moduleName === '@expo/vector-icons' ||
    moduleName.startsWith('@expo/vector-icons/') ||
    moduleName === 'expo' ||
    moduleName.startsWith('expo/') ||
    moduleName === 'expo-font' ||
    moduleName.startsWith('expo-font/') ||
    moduleName === 'expo-status-bar' ||
    moduleName.startsWith('expo-status-bar/') ||
    moduleName === 'react' ||
    moduleName.startsWith('react/') ||
    moduleName === 'react-native' ||
    moduleName.startsWith('react-native/')
  );
}

module.exports = config;
