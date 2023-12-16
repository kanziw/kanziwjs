# eslint-config-kanziw `DEPRECATED`

kanziw's eslint rules based on [standard](https://github.com/standard/eslint-config-standard)

[![npm version](https://img.shields.io/npm/v/eslint-config-kanziw)](https://www.npmjs.com/package/eslint-config-kanziw)
[![license](https://img.shields.io/npm/l/eslint-config-kanziw)](https://www.npmjs.com/package/eslint-config-kanziw)
[![npm downloads](https://img.shields.io/npm/dt/eslint-config-kanziw)](https://www.npmjs.com/package/eslint-config-kanziw)


## `.eslintrc.js` Example

```js
module.exports = {
  root: true,
  extends: [
    'kanziw',
  ],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.eslint.json', './packages/*/tsconfig.json'],
  },
}
```
