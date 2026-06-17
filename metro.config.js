const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

const workspaceRoot = __dirname;
const mobileRoot = path.join(workspaceRoot, 'apps/mobile');
const projectRoot = process.cwd() === mobileRoot ? mobileRoot : workspaceRoot;

const config = getDefaultConfig(projectRoot);

if (projectRoot === workspaceRoot) {
  const rootOrigin = path.join(workspaceRoot, 'App.tsx');
  const resolveRequest = config.resolver.resolveRequest;

  config.resolver.resolveRequest = (context, moduleName, platform) => {
    const rootContext = shouldResolveFromRoot(moduleName)
      ? { ...context, originModulePath: rootOrigin }
      : context;

    return resolveRequest
      ? resolveRequest(rootContext, moduleName, platform)
      : context.resolveRequest(rootContext, moduleName, platform);
  };
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
