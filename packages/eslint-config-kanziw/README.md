# eslint-config-kanziw

kanziw's eslint rules based on [standard](https://github.com/standard/eslint-config-standard)


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
