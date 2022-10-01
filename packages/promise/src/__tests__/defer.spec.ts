import { setTimeout as delay } from 'timers/promises'

import { defer } from '../defer'

describe('defer', () => {
  it('success w/ resolve', async() => {
    const { deferWait, checkDeferWaitStatus } = deferTester()

    const beforeResolveResult = await checkDeferWaitStatus()
    expect(beforeResolveResult).toEqual('pending')

    deferWait.resolve()
    const afterResolveResult = await checkDeferWaitStatus()
    expect(afterResolveResult).toEqual('resolved')
  })

  it('success w/ reject', async() => {
    const { deferWait, checkDeferWaitStatus } = deferTester()

    const beforeRejectResult = await checkDeferWaitStatus()
    expect(beforeRejectResult).toEqual('pending')

    deferWait.reject()
    const afterRejectResult = await checkDeferWaitStatus()
    expect(afterRejectResult).toEqual('rejected')
  })
})

function deferTester() {
  const deferWait = defer()
  const checkDeferWaitStatus = async() => (
    Promise.race([
      delay(10).then(() => 'pending'),
      deferWait.promise
        .then(() => 'resolved')
        .catch(() => 'rejected'),
    ])
  )

  return {
    deferWait,
    checkDeferWaitStatus,
  }
}
