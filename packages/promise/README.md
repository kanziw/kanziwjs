# @kanziw/promise

[![npm version](https://img.shields.io/npm/v/@kanziw/promise)](https://www.npmjs.com/package/@kanziw/promise)
[![license](https://img.shields.io/npm/l/@kanziw/promise)](https://www.npmjs.com/package/@kanziw/promise)
[![npm downloads](https://img.shields.io/npm/dt/@kanziw/promise)](https://www.npmjs.com/package/@kanziw/promise)


## defer

Handle promise resolve/reject manually.

```ts
import { defer } from '@kanziw/promise'

async function rollbackableInsert() {
  const commitOrRollback = defer<void>()
  const insertedId = defer<string>()

  const txPromise = db.withTransaction(async conn => {
    const { insertId } = await conn.execute(qb.insertInto('table').values({}))
      .then(insertedId.resolve)
      .catch(err => {
        insertedId.reject(err)
        throw err
      });

    await commitOrRollback.promise
  })

  const commit = async () => {
    commitOrRollback.resolve()
    return txPromise
  };

  return {
    insertId: await insertedId.promise,
    commit,
    rollback: deferWaitTransaction.reject,
  }
}

const { insertId, commit, rollback } = await rollbackableInsert()

try {
  // some business logic
  await commit()
} catch (err) {
  await rollback()
  throw err
}
```
