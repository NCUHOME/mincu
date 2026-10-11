const assert = require('node:assert/strict')
const { readFileSync } = require('node:fs')
const { createRequire } = require('node:module')
const path = require('node:path')
const test = require('node:test')
const { setTimeout: delay } = require('node:timers/promises')
const vm = require('node:vm')
const { transformFileSync } = require('@babel/core')

const root = path.join(__dirname, '..')

function loadSource(relativePath, mocks = {}) {
  const filename = path.join(root, relativePath)
  const localRequire = createRequire(filename)
  const exports = {}
  const { code } = transformFileSync(filename)
  vm.runInNewContext(
    code,
    {
      exports,
      require: (name) => mocks[name] || localRequire(name),
      setTimeout,
      clearTimeout,
    },
    { filename }
  )
  return exports
}

test('useReady 保留成功回调和失败回调两种调用方式', () => {
  const calls = []
  const effects = []
  const { default: useReady } = loadSource('packages/hooks/src/useReady.ts', {
    react: {
      useEffect: (effect, deps) => {
        effects.push(deps)
        effect()
      },
    },
    'mincu-core': { initial: (...args) => calls.push(args) },
  })
  const resolve = () => {}
  const reject = () => {}
  const deps = ['ready']
  useReady(resolve, deps)
  useReady(resolve, reject, deps)
  assert.deepEqual(calls, [
    [resolve, undefined],
    [resolve, reject],
  ])
  assert.deepEqual(effects, [deps, deps])
})

test('StringMatcher 延迟匹配保留实例 this，连续输入只触发一次', async () => {
  const { StringMatcher } = loadSource(
    'packages/debug/src/mincud/StringMatcher.ts'
  )
  const matches = []
  const matcher = new StringMatcher([/http:\/\/\S+/], {
    cycle: 3,
    debounceDelay: 80,
  })
  matcher.onMatch((match) => matches.push(match[0]))
  matcher.put('Local: ')
  matcher.put('http://localhost:5173')
  assert.deepEqual(matches, [])
  await delay(120)
  assert.deepEqual(matches, ['http://localhost:5173'])
  matcher.put('extra output')
  await delay(120)
  assert.equal(matches.length, 1)
})

for (const fails of [false, true]) {
  test(`部署${fails ? '失败' : '成功'}后恢复 package.json 原文`, () => {
    const filename = path.join(root, 'example/react-vite/deploy-vercel.js')
    const localRequire = createRequire(filename)
    const original =
      '{\n  "dependencies": {"mincu-react": "workspace:2.13.2"},\n  "devDependencies": {"mincu-debug": "workspace:2.13.2"}\n}\n'
    let content = original
    let deployed = false
    const error = new Error('模拟部署失败')
    const run = () =>
      vm.runInNewContext(
        readFileSync(filename, 'utf8'),
        {
          __dirname: path.dirname(filename),
          require: (name) => {
            if (name === 'fs')
              return {
                readFileSync: () => content,
                writeFileSync: (_, value) => {
                  content = value
                },
              }
            if (name === 'child_process')
              return {
                execSync: () => {
                  const pkg = JSON.parse(content)
                  assert.equal(pkg.dependencies['mincu-react'], '2.13.2')
                  assert.equal(pkg.devDependencies['mincu-debug'], '2.13.2')
                  deployed = true
                  if (fails) throw error
                },
              }
            return localRequire(name)
          },
        },
        { filename }
      )
    if (fails) assert.throws(run, (value) => value === error)
    else run()
    assert.equal(deployed, true)
    assert.equal(content, original)
  })
}
