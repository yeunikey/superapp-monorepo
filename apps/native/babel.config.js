module.exports = function (api) {
  api.cache(true);
  let plugins = [];

  return {
    presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],

    plugins: [
      'react-native-reanimated/plugin',
      ['inline-dotenv', {
        path: './../../.env' // укажи точный путь к файлу
      }],
    ],
  };
};
