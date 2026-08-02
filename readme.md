# TG Astro 站点模板
# ============================================================
# 每个新站只需要 3 步：
# 1. 复制整个文件夹到新项目目录
# 2. 修改 src/data/siteConfig.ts（域名、标题、配色、features）
# 3. 替换 public/images/ 下的图片（hero 三卡图 + 6 个 feature gif）
# ============================================================

# 配色差异化方案（9个站建议用9种不同的主色调）：
# ┌──────────────────┬──────────┬──────────────────────┐
# │ 主题             │ 主色     │ 示例                 │
# ├──────────────────┼──────────┼──────────────────────┤
# │ Telegram 蓝      │ #2AABEE  │ 下载安装、APK        │
# │ Telegram 紫      │ #8B5CF6  │ 安全隐私            │
# │ 活力橙           │ #F97316  │ 账号问题            │
# │ 清新绿           │ #10B981  │ 功能技巧            │
# │ 深空蓝           │ #3B82F6  │ 消息通知            │
# │ 优雅粉           │ #EC4899  │ 频道群组            │
# │ 暗夜紫           │ #7C3AED  │ 机器人开发          │
# │ 海洋青           │ #06B6D4  │ 代理设置            │
# │ 墨绿             │ #059669  │ 多账号管理          │
# └──────────────────┴──────────┴──────────────────────┘

# 部署流程：
# 1. gh repo create auxwy668/{domain} --private
# 2. git remote add origin https://github.com/auxwy668/{domain}.git
# 3. git push -u origin main
# 4. Cloudflare Pages 连接仓库 → 自动部署
# 5. 添加自定义域名 + SSL
# 6. 提交 IndexNow + Google Search Console + Bing Webmaster

# 注意：
# - CF Pages 默认 clean URLs：不要加 .html 后缀
# - canonical URL 用末尾无斜杠格式
# - 每站必须独立仓库，不要共用
