import { resolve } from 'node:path'
import walkSync from 'walk-sync'

const packagePaths = walkSync('packages', { globs: ['*/package.json'], includeBasePath: true })

const isPublishableVersion = (version: string) => /^\d\.\d\.\d$/.test(version)

Promise.all(
  packagePaths.map((packagePath) => import(resolve(packagePath)).then(({ name, version }) => [name, version])),
).then((packageInfos) => {
  const notPublishableVersionPackageInfos = packageInfos.filter(([, version]) => !isPublishableVersion(version))
  if (notPublishableVersionPackageInfos.length) {
    for (const [name, version] of notPublishableVersionPackageInfos) {
      console.error(`${name}@${version} is not a publishable version`)
    }
    process.exit(1)
  }

  for (const [name, version] of packageInfos) {
    console.error(`${name}@${version} is a publishable version`)
  }
})
