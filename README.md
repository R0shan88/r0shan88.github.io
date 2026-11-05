# 汪涛 Tao Wang · 公开个人学术主页

主页：https://frank2wang87.github.io/

## 专利资料与编辑

- 主页每组专利的「编辑此专利」按钮会打开 `patents/family-数字.json` 对应的 GitHub 编辑页面。需登录有此仓库写入权限的账号才能保存；普通访客没有修改权限。
- 修改 `title`、`authors`、`inventors`、`applicants` 等字段时保持合法 JSON；`members` 保存每个地区/版本的公开号、发明人、状态、来源与日期。
- `status` 可为 `active`（含来源标为 Active 的授权）、`pending`（来源标为 Pending 的申请）、`excluded`（不在默认列表中展示）。修改法律状态时同时更新来源和核验日期。
- 页面打开后读取每组独立 JSON，编辑并提交后等待 GitHub Pages 发布，新数据即可显示。首次页面正文也预先包含了全部成果，方便无脚本访问和搜索引擎读取。
- 要同步预渲染正文，在本目录运行 `node build.mjs` 并提交生成的 `index.html`。不安装任何第三方依赖。
- 新增专利：新增对应 JSON，再将文件路径加入 `patents/index.json`。

## 核验与去重

`patent-review.html` / `patent-audit.json` 保存 2026-11-05 的逐项核验快照与移出原因。153 条用户清单及原 Scholar 18 条专利合并为 73 组，其中 71 组列入默认列表。合并依据为申请号、来源同族 ID、国家同族链接及明确分案说明，不仅凭标题或姓名。

法律状态据 Google Patents / Patsnap 数据库记录，可能滞后；以各专利局官方登记为准。WO 的 Ceased 不代表各国同族授权同时失效。姓名核对不能独立证明同名人的身份。核验报告为一次性快照，编辑资料不会自动重新查询法律状态。

`profile.json` 保存论文及原始 Scholar 档案；`records.js` 是静态生成和网页交互共用的展示逻辑；`app.js` 提供搜索、分类、状态和年份筛选。工作与教育经历待补充。

`robots.txt`、`sitemap.xml` 和 canonical 已配置；允许抓取不保证被搜索引擎收录。
