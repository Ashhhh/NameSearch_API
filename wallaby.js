require('./test/beforeTests');

module.exports = function wallabyConfig() {
  process.env.NODE_ENV = 'test';

  return {
    files: [
      'src/**/*.js',
      'package.json'
    ],

    tests: [
      'test/**/*.spec.js'
    ],

    testFramework: 'mocha',

    env: {
      type: 'node'
    },
    setup: () => {
    }
  };
};
