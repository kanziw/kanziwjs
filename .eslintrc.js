module.exports = {
  root: true,
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'kanziw',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.eslint.json', './packages/*/tsconfig.json'],
  },
}
