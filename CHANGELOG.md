# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## 未发布

### API 清理

- 删除 `NetWorkModule.fetch` 的废弃声明和空实现 `getStoredToken()`；请求功能请使用自行创建的 Axios 实例，并通过 `networkModule.useAxiosInterceptors()` 注册拦截器。
- 删除 `DebugModule`、`DataModule`、`EventModule`、`NetWorkModule` 和 `UIModule` 的 `static Instance()`，默认导出直接实例化，仍保持模块级共享实例。
- 兼容性影响：移除的公开成员不再出现在类型声明中；需要创建独立实例时，改用 `new DataModule()`、`new EventModule()`、`new NetWorkModule()` 或 `new UIModule()`。`mincu` 扁平 API 的其余拼接行为保持原样。

## [2.13.2](https://github.com/ncuhome/mincu/compare/v2.13.1...v2.13.2) (2023-04-23)

**Note:** Version bump only for package mincu-monorepo

## [2.13.1](https://github.com/ncuhome/mincu/compare/v2.13.0...v2.13.1) (2023-04-23)

**Note:** Version bump only for package mincu-monorepo

# [2.13.0](https://github.com/ncuhome/mincu/compare/v2.12.0...v2.13.0) (2023-04-22)

### Features

* react-demo-shared copyToken ([e288e3e](https://github.com/ncuhome/mincu/commit/e288e3e0c81c98db5f35d3c04bfa0d9f22ba340d))

# [2.12.0](https://github.com/ncuhome/mincu/compare/v2.11.0...v2.12.0) (2022-09-07)

### Bug Fixes

* example/react-vite -> deploy:vercel[#2](https://github.com/ncuhome/mincu/issues/2) ([75f9f22](https://github.com/ncuhome/mincu/commit/75f9f223861c7f472d53de6046b7e2524f90242f))

### Features

* demo benchmark modal ([27b34b6](https://github.com/ncuhome/mincu/commit/27b34b6905429c79c4931c6317bc7cf81ac4c843))

# [2.11.0](https://github.com/ncuhome/mincu/compare/v2.10.3...v2.11.0) (2022-08-25)

### Bug Fixes

* example/react-vite -> deploy:vercel ([7cd584d](https://github.com/ncuhome/mincu/commit/7cd584d27abb40b47390a9a231c428d87e682c37))
* react-demo-shared button broken class ([9f355ee](https://github.com/ncuhome/mincu/commit/9f355eedbdd0371fdc62e66b81d1e98976869e87))

### Features

* react-demo-shared bench case ([185a43a](https://github.com/ncuhome/mincu/commit/185a43a2f85bbb03b3d66811456534a741504213))
* react-demo-shared bench iterations ([141b2e4](https://github.com/ncuhome/mincu/commit/141b2e47142f8161ed0280bd771927517c6542d8))

## [2.10.3](https://github.com/ncuhome/mincu/compare/v2.10.2...v2.10.3) (2022-08-24)

### Bug Fixes

* mincu-network -> handleTokenExpired expired check ([8375038](https://github.com/ncuhome/mincu/commit/8375038797ef4515e3d7fd8b7f2431bb05703da7))

## [2.10.2](https://github.com/ncuhome/mincu/compare/v2.10.1...v2.10.2) (2022-08-23)

### Bug Fixes

* workspace deps pin version ([d89ccac](https://github.com/ncuhome/mincu/commit/d89ccacb4085ac5d020219b202343da433743942))

## [2.10.1](https://github.com/ncuhome/mincu/compare/v2.10.0...v2.10.1) (2022-08-19)

**Note:** Version bump only for package mincu-monorepo

# [2.10.0](https://github.com/ncuhome/mincu/compare/v2.9.1...v2.10.0) (2022-08-19)

### Features

* demos/react-demo-shared use twind ([01d67d3](https://github.com/ncuhome/mincu/commit/01d67d379f29584bf7e8ff6813dfb1bc3289d499))
* example/react-vite deploy-vercel ([b6b684f](https://github.com/ncuhome/mincu/commit/b6b684fae2fdfaec21be1fca0c72ebcf11117c96))

## [2.9.1](https://github.com/ncuhome/mincu/compare/v2.9.0...v2.9.1) (2022-08-19)

**Note:** Version bump only for package mincu-monorepo

# [2.9.0](https://github.com/ncuhome/mincu/compare/v2.8.3...v2.9.0) (2022-08-19)

### Features

* mincu-{core, event} -> orientation API ([5e5467a](https://github.com/ncuhome/mincu/commit/5e5467a7199276c99460f11e5e428afd49354862))
* mincu-core -> makeProxyFromNativeFunc ([78eacfc](https://github.com/ncuhome/mincu/commit/78eacfc6998fb2dda213531e1b8daea9b836f2ec))
* mincu-react-demo-shared ([0093880](https://github.com/ncuhome/mincu/commit/0093880fc1fd44e141b9011784bbea3497a59365))

## [2.8.3](https://github.com/ncuhome/mincu/compare/v2.8.2...v2.8.3) (2022-08-13)

### Bug Fixes

* mincu-core call failed signature ([9f9463b](https://github.com/ncuhome/mincu/commit/9f9463be83f615e37f20f52652cdad953e14dcf0))

## [2.8.2](https://github.com/ncuhome/mincu/compare/v2.8.1...v2.8.2) (2022-08-12)

### Features

* mincu-core fill interface ([c29a122](https://github.com/ncuhome/mincu/commit/c29a122d2980332e959b4bd9960a3bd09b56f72c))

## [2.8.1](https://github.com/ncuhome/mincu/compare/v2.8.0...v2.8.1) (2022-08-11)

### Bug Fixes

* lerna npmClient to pnpm ([c3caeb1](https://github.com/ncuhome/mincu/commit/c3caeb18f7b32414cc9241decb0124aad2186172))
* test:example ([19a0e6e](https://github.com/ncuhome/mincu/commit/19a0e6e837ed2a52574e032b14b5fd56d158eccf))

### Features

* add example/vue-vite, remove vue-spa ([0659af4](https://github.com/ncuhome/mincu/commit/0659af48f5435a00f409383d790a72a400ab6fa6))
* mincu-vanilla export Mincu interface ([5b4d4df](https://github.com/ncuhome/mincu/commit/5b4d4dfb4a3c1ba3b08290b465b05cb742fd0b1e))
* upgrade deps ([015efd2](https://github.com/ncuhome/mincu/commit/015efd26a5cd4baf99d89f533c26b1df87d7b33a))

# [2.8.0](https://github.com/ncuhome/mincu/compare/v2.7.0...v2.8.0) (2022-08-08)

### Bug Fixes

* **core:** typings ([f807452](https://github.com/ncuhome/mincu/commit/f807452e9aa62dd785a82d6275e7afe510b998b6))
* **mincu-vanilla:** mincu variables ([736f454](https://github.com/ncuhome/mincu/commit/736f454ba717a5b6d831b18f637dbd02bcdce60d))

### Features

* mincu-debug bin -> add v8-compile-cache ([f65ebd1](https://github.com/ncuhome/mincu/commit/f65ebd11e0001405f18a05b056d9a530f167a5fd))

## [2.7.2](https://github.com/ncuhome/mincu/compare/v2.7.1...v2.7.2) (2022-08-08)

**Note:** Version bump only for package mincu-monorepo

## 2.7.0

- **refactor** `mincu-vanilla` exports `mincu` that include all variables from `mincuCore`, `networkModule`, `uiModule`, `dataModule`, `eventModule`

  ```ts
  interface Mincu
    extends MincuCoreBase,
      DataModule,
      EventModule,
      NetWorkModule,
      UIModule {}

  export const mincu = Object.assign(
    {},
    eventModule,
    dataModule,
    uiModule,
    networkModule,
    mincuCore
  ) as Mincu
  ```

  ```js
  import { mincu } from 'mincu-vanilla'
  // or
  import { mincu } from 'mincu-react'
  ```

- **feat** `mincu-debug` integrated with [mincu-chii](https://github.com/ncuhome/chii) (forked from [chii](https://github.com/liriliri/chii))
  With `connect()`

  ```js
  import debug from 'mincu-debug';
  debug.connect();
  ```

- **feat** `mincu-data` add native storage support

  ```js
  import data from 'mincu-data'
  data.storage.setItem('test', 'mincu v2.7')

  const got = await data.storage.getItem('test')
  console.log(got)
  // mincu v2.7
  ```

  ```ts
  export declare class MincuStorage {
    getItem(key: string): Promise<any>;
    setItem(key: string, value: any): Promise<void>;
    removeItem(key: string): Promise<void>;
    remove(key: string): Promise<void>;
    reset(): Promise<void>;
  }
  ```

- **deprecated** `mincu-network` remove axios as dependency for smaller bundle size, deprecated `networkModule.fetch(...)` instead of `useAxiosInterceptors(...)`

  ```js
  class NetworkModule {
    /**
     * @deprecated
     * networkModule.useAxiosInterceptors is for your need
     */
    fetch: any

    axiosInterceptors = () => ({
      request: (config: AxiosRequestConfig) => {
        if (this.token) {
          config.headers.Authorization = this.getAuthorization(this.token)
        }
        return config
      },
      response: (response: AxiosResponse) => response,
      error: this.handleTokenExpired,
    })

    /**
     * @exmaple
     * const fetcher = axios.create()
     * networkModule.useAxiosInterceptors(fetcher)
     */
    useAxiosInterceptors(axiosInstance: AxiosInstance) {
      const interceptors = this.axiosInterceptors()
      axiosInstance.interceptors.request.use(interceptors.request)
      axiosInstance.interceptors.response.use(
        interceptors.response,
        interceptors.error
      )
    }
  }
  ```

## 2.6.1

- **fix** should build before release

## 2.6.0

- **feat** 新增 `<Ready />` 组件，用法与 `<ReadySSR />` 一致。以及他们的 fallback 参数增加了默认值：

  ```tsx
  export const Fallback = () => (
    <div
      style={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 18
      }}
    >
      <span>请在南大家园中打开😊</span>
    </div>
  )
  ```

## 2.5.0

- **chores** 升级依赖，添加 example/* 至 workspace
  
## 2.4.1

- **fix** mincu-hooks useReady `Error: reject is not a function`

## 2.4.0

- **feat** mincu-react 添加 `ReadySSR` 组件，封装了在 nextjs SSR 环境下使用 useAppReady 判断的逻辑，避免 `Unhandled Runtime Error: Hydration failed……`(参考 [https://github.com/vercel/next.js/discussions/35773]) 用法类似 react 的 Suspense，如：
  
  ```tsx
  <ReadySSR fallback={<div>Loading...</div>}>
    <Component {...pageProps} />
  </ReadySSR>
  ```

## 2.0.0

- **breaking** 迁移至 monorepo，原来的 `mincu` 包替换为 `mincu-react`, `mincu-vanilla` 等多个独立包
- **feat** mincu-debug 包，提供调试功能

## 1.0.5

- **fix** 修复 isReady 错误初始值的问题
- **feat** 增加 StatusBar 函数（5.3）

## 1.0.4

- **fix** 修复加载数据失败的问题

## 1.0.3

- **feat** 添加 login 方法

- **feat** 添加 useAppReady、useSafeArea 钩子

- **fix** 添加默认 userData

## 1.0.2

- **fix** 修复端外蜜汁报错

## 1.0.1

- **feat** 提供 api 文档

- **fix** 优化类型定义

- **fix** 修复 `hooks` 失效的问题

## 1.0.0

- **feat** initial
