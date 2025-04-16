module.exports = {
  extends: ['./index.js'],
  env: {
    node: true,
  },
  rules: {
    'no-process-exit': 'error',
    'node/no-unsupported-features/es-syntax': 'off',
  },
};