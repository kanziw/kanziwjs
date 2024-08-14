const fs = require('node:fs')
const path = require('node:path')
const { build } = require('esbuild')

const rootDir = path.join(__dirname, '..')
const srcDir = path.join(rootDir, 'src')
const distDir = path.join(rootDir, '')

try {
  fs.rmSync(path.join(distDir, '*.d.ts'), { recursive: true })
  fs.rmSync(path.join(distDir, '*.*js'), { recursive: true })
} catch {}

const src = (name) => path.join(srcDir, name)
const modules = fs.readdirSync(srcDir).filter((name) => name !== '__tests__')

/**
 * @param {string} content
 */
function rewriteCjsEntries(content) {
  return content.replace(/(require\("(?<id>.*)\.js"\))/g, (_match, _group1, id) => {
    return `require("${id}.cjs")`
  })
}
;(async () => {
  const entryPoints = modules.map(src)
  await build({
    entryPoints,
    outdir: distDir,
    outExtension: { '.js': '.js' },
    format: 'esm',
    treeShaking: true,
    write: true,
  })
  const { outputFiles: cjsOutputFiles = [] } = await build({
    entryPoints,
    outdir: distDir,
    outExtension: { '.js': '.cjs' },
    format: 'cjs',
    treeShaking: true,
    write: false,
  })
  for (const file of cjsOutputFiles) {
    fs.writeFileSync(file.path, rewriteCjsEntries(file.text), 'utf8')
  }
})()
