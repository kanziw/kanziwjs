import { resolve } from 'path'
import walkSync from 'walk-sync'

const packagePaths = walkSync('packages', { globs: ['*/package.json'], includeBasePath: true })

const isPublishableVersion = (version: string) => /^\d\.\d\.\d$/.test(version)

Promise.all(
  packagePaths.map((packagePath) => import(resolve(packagePath)).then(({ name, version }) => [name, version])),
).then((packageInfos) => {
  if (packageInfos.some(([, version]) => !isPublishableVersion(version))) {
    packageInfos
      .filter(([, version]) => !isPublishableVersion(version))
      .forEach(([name, version]) => {
        console.error(`${name}@${version} is not a publishable version`)
      })
    process.exit(1)
  }

  packageInfos.forEach(([name, version]) => {
    console.error(`${name}@${version} is a publishable version`)
  })
})
