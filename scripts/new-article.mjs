// scripts/new-article.mjs
// Usage: node scripts/new-article.mjs "文章标题" "分类名" [slug]
import fs from 'node:fs';
import path from 'node:path';

const [,, title, category, customSlug] = process.argv;
if (!title || !category) {
  console.log('Usage: node scripts/new-article.mjs "文章标题" "分类名" [可选slug]');
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
const slug = customSlug || title
  .toLowerCase()
  .replace(/[^\w\u4e00-\u9fff]+/g, '-')
  .replace(/^-|-$/g, '')
  .slice(0, 60);

const frontmatter = `---
title: "${title}"
description: "TODO: 写一段 80 字以上的文章描述，包含核心关键词"
keywords: "Telegram,TODO,关键词1,关键词2"
date: ${today}
lastmod: ${today}
category: "${category}"
tags: ["TODO"]
coverImage: "/images/default-cover.jpg"
draft: false
---

TODO: 文章正文从这里开始。确保内容超过 800 字。
`;

const filePath = path.join(process.cwd(), 'src/content/articles', `${slug}.md`);
if (fs.existsSync(filePath)) {
  console.log('File already exists:', filePath);
  process.exit(1);
}
fs.writeFileSync(filePath, frontmatter, 'utf-8');
console.log('Created:', filePath);
