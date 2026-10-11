const assert = require('node:assert/strict')
const path = require('node:path')
const test = require('node:test')
const { transformFileSync } = require('@babel/core')

const root = path.join(__dirname, '..')

for (const source of [
  'packages/core/src/index.ts',
  'packages/network/src/index.ts',
  'packages/hooks/src/useNativeState.ts',
]) {
  test(`${source} 保持 optional chaining 和 nullish coalescing 的降级转换`, () => {
    const { code } = transformFileSync(path.join(root, source), {
      configFile: path.join(root, 'babel.config.js'),
    })
    assert.doesNotMatch(code, /\?\.|\?\?/)
  })
}
