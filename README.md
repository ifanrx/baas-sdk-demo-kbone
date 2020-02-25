# book-shelf

## 如何运行

1. 在知晓云上创建应用（应用的 `client_id` 下一步会用到），并关联微信小程序（小程序的 `appid` 后面会用到）。

2. 安装依赖

`npm install`

3. 使用 src/schema-bookshelf.json 在知晓云上创建名为 bookshelf 的数据表。

4. 修改配置

  a. scripts/miniprogram.config.js 文件的 projectConfig.appid 字段填入第一步获取到的微信小程序 appid。

  b. src/config.js 的 clientId 变量中填入第一步获取到的 `client_id`。

5. 运行

  小程序端：`npm run mp`

  web 端：`npm run web`
