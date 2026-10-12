const assert = require('node:assert/strict')
const path = require('node:path')
const test = require('node:test')
const vm = require('node:vm')
const { transformFileSync } = require('@babel/core')

function loadModule(name, mocks) {
  const filename = path.join(__dirname, '..', 'packages', name, 'src/index.ts')
  const { code } = transformFileSync(filename)
  const exports = {}
  vm.runInNewContext(
    code,
    {
      exports,
      console: { log() {} },
      require: (id) => {
        assert.ok(Object.hasOwn(mocks, id), `缺少依赖 mock: ${id}`)
        return mocks[id]
      },
    },
    { filename }
  )
  return exports
}

const appData = { user: { token: 'initial-token', colorScheme: 'dark' } }

function makeCore(calls) {
  return {
    appData,
    isApp: true,
    call: (...args) => {
      calls.push(args.slice(0, 3))
      args[3]?.({ data: args[0] === 'Auth' ? { token: 'fresh-token' } : true })
    },
  }
}

test('network 默认实例保留初始 token、拦截器注册及刷新后的授权', async () => {
  const calls = []
  const { default: network, NetWorkModule } = loadModule('network', {
    'mincu-core': makeCore(calls),
    'mincu-data': { appData },
  })
  assert.ok(network instanceof NetWorkModule)
  assert.equal(network.token, 'initial-token')
  const registered = {}
  network.useAxiosInterceptors({
    interceptors: {
      request: {
        use: (handler) => {
          registered.request = handler
        },
      },
      response: {
        use: (success, error) => {
          registered.success = success
          registered.error = error
        },
      },
    },
  })
  const config = { headers: {} }
  assert.equal(registered.request(config), config)
  assert.equal(config.headers.Authorization, 'passport initial-token')
  const response = { data: 'response' }
  assert.equal(registered.success(response), response)
  assert.equal(registered.error, network.handleTokenExpired)
  assert.equal(await network.refreshToken(), 'fresh-token')
  assert.equal(
    registered.request({ headers: {} }).headers.Authorization,
    'passport fresh-token'
  )
  assert.deepEqual(calls, [['Auth', 'refreshToken', null]])
  assert.equal(new NetWorkModule().token, 'initial-token')
})

test('data 默认实例保留 storage 初始化及原生数据 getter', () => {
  class Storage {}
  const { default: data, DataModule } = loadModule('data', {
    'mincu-core': makeCore([]),
    'mincu-lib': { defaultUserData: {} },
    './storage': { MincuStorage: Storage },
  })
  assert.ok(data instanceof DataModule)
  assert.ok(data.storage instanceof Storage)
  assert.equal(data.userInfo, appData.user)
  assert.equal(data.isDark, true)
  assert.notEqual(new DataModule().storage, data.storage)
})

test('event 和 ui 默认实例继续转发原生调用并保留辅助对象', () => {
  const calls = []
  const core = makeCore(calls)
  const { default: event, EventModule } = loadModule('event', {
    'mincu-core': core,
  })
  const toast = {}
  const backPress = {}
  const orientation = {}
  const { default: ui, UIModule } = loadModule('ui', {
    'mincu-core': core,
    './toast': { toast },
    './back-press': { backPress },
    './orientation': { orientation },
  })
  assert.ok(event instanceof EventModule)
  assert.ok(ui instanceof UIModule)
  event.login('name', 'password')
  ui.setBarStyle('dark-content')
  assert.equal(calls[0][0], 'Auth')
  assert.equal(calls[0][1], 'login')
  assert.equal(calls[0][2][0].username, 'name')
  assert.equal(calls[1][0], 'StatusBar')
  assert.equal(calls[1][2][0], 'dark-content')
  assert.equal(ui.toast, toast)
  assert.equal(ui.backPress, backPress)
  assert.equal(ui.orientation, orientation)
})

test('debug 默认实例只初始化一个 Client 并转发调试调用', () => {
  let constructions = 0
  class Client {
    constructor() {
      constructions += 1
    }
    initChii() {
      return 'chii'
    }
    command(command, args) {
      return { command, args }
    }
  }
  const { default: debug } = loadModule('debug', {
    'mincu-lib': { _window: {} },
    'mincu-lib/debug': { LOG_LEVELS: [] },
    './mincud/client': { Client },
  })
  assert.equal(constructions, 1)
  assert.ok(debug.client instanceof Client)
  const args = ['value']
  assert.deepEqual(debug.command('test', args), { command: 'test', args })
  debug.connect()
  assert.equal(constructions, 1)
})
