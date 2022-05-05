# eslint-config-kanziw

kanziw's eslint rules based on [standard](https://github.com/standard/eslint-config-standard)


## Requried peer dependencies

```zsh
$ yarn add -D @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint eslint-config-standard eslint-plugin-import eslint-plugin-n eslint-plugin-promise
```

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
