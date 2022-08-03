# @kanziw/crypto

[![npm version](https://img.shields.io/npm/v/@kanziw/crypto)](https://www.npmjs.com/package/@kanziw/crypto)
[![license](https://img.shields.io/npm/l/@kanziw/crypto)](https://www.npmjs.com/package/@kanziw/crypto)
[![npm downloads](https://img.shields.io/npm/dt/@kanziw/crypto)](https://www.npmjs.com/package/@kanziw/crypto)

## Install

```zsh
$ yarn add @kanziw/crypto
```

## sha256

Hash string with SHA256

```ts
import { sha256 } from '@kanziw/crypto'

// Buffer
const buf = sha256('test')

console.log(buf.toString('hex')) // 9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08
console.log(buf.toString('base64')) // n4bQgYhMfWWaL+qgxVrQFaO/TxsrC4Is0V1sFbDwCgg=
```
