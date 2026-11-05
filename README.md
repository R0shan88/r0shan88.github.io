# 汪涛 Tao Wang · 个人主页仓库

**[🌐 进入个人主页](https://frank2wang87.github.io/)**　|　**[⚙️ 编辑 / 删除各部分内容](MANAGE.md)**　|　**[✏️ 直接修改自我介绍](https://github.com/frank2wang87/frank2wang87.github.io/edit/main/content/about.md)**

这是个人主页的源代码和资料仓库。公开网页用于展示，编辑和删除操作统一在本仓库中完成；GitHub 验证账号写入权限。

## 修改自我介绍

1. 点击上面的「直接修改自我介绍」，登录自己的 GitHub 账号。
2. 修改文本。写普通文字即可，空行表示分段。
3. 点击 **Commit changes…**，选择直接提交到 **main**，再点击 **Commit changes**。等待 GitHub Pages 部署成功后刷新网页。

## 管理其他内容

打开 **[内容管理清单](MANAGE.md)**，每个部分、每篇论文、每组专利都有「编辑」和「删除」入口。删除会进入 GitHub 确认页，提交后才生效。

| 内容 | 文件 |
| --- | --- |
| 自我介绍 | [content/about.md](content/about.md) |
| 姓名、英文名、所属机构 | [content/profile.json](content/profile.json) |
| 工作经历 | [content/experience.json](content/experience.json) |
| 教育经历 | [content/education.json](content/education.json) |
| 研究方向 | [content/interests.json](content/interests.json) |
| 联系方式与学术链接 | [content/contact.json](content/contact.json) |
| 页面其他文案 | [content/site.json](content/site.json) |
| 论文资料 | [publications/](publications/) |
| 专利资料 | [patents/](patents/) |
| 学术指标和原始导入档案 | [profile.json](profile.json) |

姓名等 JSON 文件需保留有效格式。工作和教育经历用数组保存，删除某段经历时移除对应对象；也可删除整个资料文件隐藏该部分。

删除论文、专利文件后，网页会跳过已删除的资料，不必再次修改索引。新增条目时需将文件路径加入对应 `index.json`。修改后网页会读取最新资料；要同步预先生成的无脚本正文及管理清单，在仓库目录运行 `node build.mjs` 后提交生成文件。

## 从 GitHub 个人资料页进入

打开 [frank2wang87 的 GitHub 个人资料页](https://github.com/frank2wang87)，进入 **Repositories**，点击 **frank2wang87.github.io**，即可在本页选择「进入个人主页」或「编辑 / 删除各部分内容」。也可以在 GitHub 的 **Edit profile → Website** 中填入 `https://frank2wang87.github.io/`，方便从个人资料页直接访问。

## 数据与核验

论文来源为 Google Scholar。专利核验记录见 [patent-review.html](https://frank2wang87.github.io/patent-review.html) 与 [patent-audit.json](patent-audit.json)。核验报告及提交历史保留历史快照，删除展示资料不等于删除这些历史记录。法律状态据来源数据库快照，最终以各专利局官方登记为准。

此仓库和资料文件为公开内容，请只填写拟公开的信息。
