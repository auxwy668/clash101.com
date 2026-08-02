---
title: "Clash 新手入门完全指南 — 从零开始科学上网"
description: "Clash 新手入门教程，从零开始手把手教你安装配置 Clash Verge Rev，涵盖 Windows/macOS/Linux/Android 全平台下载安装、订阅导入、节点选择、规则分流和常见问题排查，15 分钟让你从完全不懂到熟练使用 Clash 科学上网。"
keywords: "Clash,Clash新手,Clash教程,Clash Verge,科学上网,Clash下载,Clash配置,Clash使用教程,Clash入门"
date: 2026-08-02
lastmod: 2026-08-02
category: "guide"
tags: ["入门", "教程", "新手"]
coverImage: "/images/default-cover.jpg"
draft: false
---

## 什么是 Clash？为什么你需要它？

如果你第一次听到"Clash"这个词，别慌——你不是一个人。Clash 是目前最流行的开源代理客户端之一，它帮你管理网络代理规则，让国内网站直连访问、国外网站走代理通道，两不误。

简单来说，Clash 就是一个"智能网络分流器"。你不需要手动切换代理开关，Clash 会根据你设定的规则自动判断：访问百度、淘宝走直连，访问 Google、YouTube 走代理。这就是所谓的"规则分流"——Clash 最核心的功能。

本文是专门为**零基础新手**准备的 Clash 入门教程。无论你是学生、上班族还是技术小白，只要跟着这篇指南一步步操作，15 分钟内你就能完成 Clash 的安装、配置，开始顺畅地访问全球互联网。

<div class="cpa-download-banner">
  <p style="margin:0 0 10px;font-weight:700;color:#1e293b">📥 还没安装 Clash？点击下方按钮一键下载官方最新版</p>
  <a href="https://filedn.com/lgoIgH8xpCF88hjULwqNU2S/Public%20Folder/clash-verge.zip" style="display:inline-block;background:#6366f1;color:#fff;padding:12px 28px;border-radius:10px;text-decoration:none;font-weight:600" target="_blank" rel="nofollow noopener">立即下载 Clash Verge Rev</a>
</div>

## Clash 核心概念：5 分钟快速理解

在动手之前，我们先花几分钟理解几个关键概念。不用背，理解就行，后面操作时你会反复遇到它们。

### 1. 代理节点（Proxy / Node）

代理节点就是你的"网络中转站"。当你访问 Google 时，数据先发到代理节点，再由节点转发到 Google，然后把结果返回给你。节点通常由机场服务商提供，一个机场可能包含几十甚至上百个节点，分布在不同国家和地区。

### 2. 订阅链接（Subscription）

订阅链接是机场服务商给你的一个 URL，Clash 通过这个链接自动获取和更新节点列表。你不用手动一个一个添加节点，只需要复制订阅链接、粘贴到 Clash 里，所有节点自动导入。这就是 Clash 相比手动配置代理的高效之处。

### 3. 规则分流（Rule-based Routing）

规则分流是 Clash 的灵魂。它的工作原理是：每条网络请求到达 Clash 后，Clash 按照你设定的规则从上到下匹配，匹配到哪条规则就执行对应策略——直连（DIRECT）、代理（PROXY）或拒绝（REJECT）。

举个例子：
- `DOMAIN-SUFFIX,baidu.com,DIRECT` → 所有百度域名直连
- `DOMAIN-SUFFIX,google.com,PROXY` → 所有 Google 域名走代理
- `GEOIP,CN,DIRECT` → 中国 IP 直连
- `MATCH,PROXY` → 以上都不匹配的，全部走代理

### 4. TUN 模式

TUN 模式是 Clash 的一项高级功能。普通模式下 Clash 只能代理浏览器和应用层流量，但 TUN 模式会在系统网络层创建一个虚拟网卡，接管**所有**流量——包括命令行工具、游戏、系统更新等。如果你发现某些软件不走代理，开启 TUN 模式通常能解决。

### 5. Clash 家族：Clash Core vs Clash Verge Rev

Clash 生态中有两个重要的概念需要区分：

- **Clash Core（内核）**：核心代理引擎，负责实际的流量处理，没有图形界面，只能通过配置文件操作。
- **Clash Verge Rev**：基于 Clash 内核的图形化客户端，提供友好的操作界面，让你可以点点鼠标就完成配置。它是目前最主流的 Clash 桌面客户端。

后面提到的"Clash Verge Rev 使用教程"可以帮你深入了解客户端的各项功能。如果你已经安装好了，可以直接跳转到 <a href="https://clash101.com/guide/clash-verge-rev-shiyong/">Clash Verge Rev 订阅导入与节点管理详解</a> 查看具体操作步骤。

![Clash Verge Rev 主界面截图](/images/clash101/clash-verge-main-interface.jpg)

## 第一步：下载与安装 Clash Verge Rev

### Windows 安装

1. 点击本文上方的下载按钮，下载 Clash Verge Rev 安装包（通常为 `.zip` 或 `.exe` 格式）
2. 解压后双击运行安装程序
3. 如果 Windows Defender 弹出警告，点击"更多信息"→"仍要运行"
4. 按照安装向导完成安装，桌面会出现 Clash Verge Rev 图标
5. 双击图标启动，系统托盘（右下角）出现 Clash 图标即安装成功

### macOS 安装

1. 下载 macOS 版本的 `.dmg` 安装包
2. 双击打开，将 Clash Verge Rev 拖入 Applications 文件夹
3. 首次打开时，如果提示"无法验证开发者"，进入**系统设置 → 隐私与安全性**，点击"仍要打开"
4. 启动后在顶部菜单栏可以看到 Clash 图标

### Linux 安装

Linux 用户可以通过命令行安装：
```bash
# Debian/Ubuntu
sudo dpkg -i clash-verge-rev_*.deb

# Arch Linux (AUR)
yay -S clash-verge-rev-bin
```

### Android 安装

1. 下载 APK 文件到手机
2. 进入**设置 → 安全 → 允许安装未知来源应用**
3. 点击 APK 文件完成安装
4. 首次启动时授予 VPN 权限

> ⚠️ **注意**：iOS 用户目前需要使用其他客户端如 Shadowrocket 或 Quantumult X，Clash Verge Rev 暂不支持 iOS。

## 第二步：获取订阅链接（机场选择指南）

安装好 Clash 之后，你还需要一个"机场"——也就是代理服务商。机场会提供给你代理节点和订阅链接。

### 如何选择机场？

选择机场时，建议关注以下几点：

- **节点数量与质量**：是否是直连节点（非中转）、延迟高低
- **可用地区**：美国、日本、新加坡、香港、台湾等常用地区是否覆盖
- **带宽与流量限制**：每月流量是否够用，有无速度限制
- **在线率与稳定性**：节点是否经常掉线
- **是否支持 Clash 订阅**：绝大多数机场都支持，但购买前确认一下
- **价格**：一般月付 10-30 元比较合理，太便宜的可能质量差，太贵的意义不大

### 获取订阅链接的步骤

1. 注册并购买机场服务
2. 登录机场的"用户中心"或"控制面板"
3. 找到"订阅地址"或"Clash 订阅"选项
4. 点击"复制订阅链接"——这个 URL 通常以 `https://` 开头，包含一串加密字符

> 🔒 **安全提示**：订阅链接包含你的账号信息，不要分享给他人。泄露意味着别人也能使用你的流量。

<div class="cpa-download-banner">
  <p style="margin:0 0 10px;font-weight:700;color:#1e293b">📥 还没安装 Clash？点击下方按钮一键下载官方最新版</p>
  <a href="https://filedn.com/lgoIgH8xpCF88hjULwqNU2S/Public%20Folder/clash-verge.zip" style="display:inline-block;background:#6366f1;color:#fff;padding:12px 28px;border-radius:10px;text-decoration:none;font-weight:600" target="_blank" rel="nofollow noopener">立即下载 Clash Verge Rev</a>
</div>

## 第三步：导入订阅与首次连接

现在你有了 Clash 客户端和订阅链接，接下来完成首次连接。

### 导入订阅

1. 右键系统托盘的 Clash 图标 → 选择"打开面板"
2. 点击左侧菜单的"订阅"标签
3. 在输入框中粘贴你的订阅链接
4. 点击"导入"按钮
5. Clash 会自动下载节点列表，等待几秒即可

如果你需要更详细的订阅管理教程，可以参考 <a href="https://clash101.com/guide/clash-verge-rev-shiyong/">Clash Verge Rev 订阅导入与节点管理详解</a>，里面有节点分组、延迟测试和自动切换的完整说明。

### 选择节点与开启代理

1. 切换到"代理"标签页
2. 你会看到按地区分组的节点列表（如 🇺🇸 美国、🇯🇵 日本、🇭🇰 香港）
3. 点击一个节点即可选中——建议先选香港或日本节点，延迟通常较低
4. 回到主界面，点击右上角的大开关或系统托盘 → "开启系统代理"
5. 系统代理开启后，浏览器会自动使用 Clash 的代理设置

### 验证是否成功

打开浏览器访问 `https://www.google.com`，如果能正常打开，恭喜你，Clash 已经配置成功！你也可以访问 `https://ip.sb` 查看当前 IP 地址，确认是否显示为代理节点的 IP。

![Clash 代理节点选择界面](/images/clash101/clash-proxy-nodes-selection.jpg)

## 第四步：系统代理 vs TUN 模式，该选哪个？

Clash 提供两种代理方式，它们的适用场景不同：

### 系统代理模式（推荐新手）

- **原理**：修改系统的代理设置，浏览器和大部分应用会自动使用
- **优点**：设置简单，关闭不影响正常网络
- **缺点**：部分软件不读取系统代理设置（如命令行工具、部分游戏）

### TUN 模式（进阶推荐）

- **原理**：创建虚拟网卡，在网络层接管所有流量
- **优点**：真正全局代理，所有软件都生效
- **缺点**：需要管理员权限，配置稍复杂

**建议**：新手先用系统代理模式，熟悉后再尝试 TUN 模式。如果你需要代理命令行工具或游戏，再开启 TUN 模式。开启方法：在 Clash 面板中点击"TUN 模式"开关即可。

## 第五步：进阶技巧 — 提升你的 Clash 体验

熟悉基本操作后，以下技巧会让你用得更顺手：

### 延迟自动测速

在"代理"标签页，右键任意节点 → 选择"延迟测试"，Clash 会遍历所有节点测试延迟。你也可以开启"自动选择最低延迟节点"，让 Clash 帮你自动切换到最快的线路。

### 规则组管理

Clash 默认规则已经覆盖了大部分常见场景，但你也可以自定义：

- 访问面板的"规则"标签
- 添加自定义规则，比如强制某个域名走特定节点
- 规则语法参考官方文档

### 开机自启

在设置中开启"开机启动"和"静默启动"，Clash 会随系统自动启动并在后台运行，开机就能直接上网。

### 更新订阅

机场节点会定期更新，你需要同步更新：
- 进入"订阅"标签
- 点击订阅右侧的"更新"按钮
- 或者设置自动更新间隔（建议每 6-12 小时更新一次）

## 常见问题与故障排查

<details>
<summary><strong>Q1：导入订阅后看不到任何节点？</strong></summary>

**可能原因与解决**：
- 订阅链接过期：去机场后台重新获取最新订阅链接
- 网络不通：确认在不开启代理的情况下能正常访问互联网
- 机场服务故障：联系机场客服确认服务状态
- Clash 版本过旧：更新到最新版 Clash Verge Rev 再试
</details>

<details>
<summary><strong>Q2：开启代理后国内网站变慢或打不开？</strong></summary>

这说明规则分流可能配置有误。检查方法是：
1. 打开 Clash 面板 → 点击"日志"标签
2. 访问一个国内网站，观察日志中该域名匹配到的规则
3. 确认国内域名是否被匹配为 `DIRECT`（直连），而不是 `PROXY`（代理）
4. 如果国内域名走到了代理，检查规则配置或重置为默认规则

另外，确保你没有把"全局模式"打开——全局模式会让所有流量（包括国内）都走代理。请确认当前模式为"规则模式"。
</details>

<details>
<summary><strong>Q3：为什么我的 Clash 显示"未连接"？</strong></summary>

按以下顺序排查：
1. 确认系统代理已开启（系统托盘图标变色）
2. 检查选中的节点是否有延迟测试结果（超时红色表示不可用，换一个节点）
3. 查看日志标签页，是否有红色错误信息
4. 尝试切换为其他节点或更新订阅
5. 检查防火墙或杀毒软件是否拦截了 Clash
</details>

<details>
<summary><strong>Q4：Clash 开机后不自动启动？</strong></summary>

Windows 用户：
- 进入 Clash 设置 → 开启"开机启动"
- 如果仍然无效，手动将 Clash 快捷方式放入 `shell:startup` 启动文件夹

macOS 用户：
- 系统设置 → 通用 → 登录项 → 添加 Clash Verge Rev
</details>

<details>
<summary><strong>Q5：TUN 模式开启后无法上网？</strong></summary>

TUN 模式需要管理员/root 权限：
- **Windows**：右键 Clash 图标 → 以管理员身份运行
- **macOS**：首次开启 TUN 时系统会弹出权限请求，点击"允许"
- **Linux**：需要使用 `sudo` 运行 Clash

如果权限正常但仍无法上网，尝试：
1. 关闭 TUN 模式，恢复正常上网后重新开启
2. 检查防火墙设置是否阻止了 TUN 虚拟网卡
3. 重启电脑后再试
</details>

<details>
<summary><strong>Q6：手机上 Clash 如何配置？</strong></summary>

Android 用户：
1. 下载 Clash Meta for Android（或 Clash Verge Rev 安卓版）
2. 安装后打开，点击"配置" → 右上角"+" → "从 URL 导入"
3. 粘贴订阅链接，点击下载
4. 返回主界面，点击开关启动 VPN
5. 首次启动需授予 VPN 连接权限

<strong>小技巧</strong>：Android 版 Clash 可以设置分应用代理，在"分流"设置中可以选择哪些应用走代理、哪些直连。比如只让浏览器和 YouTube 走代理，微信和支付宝直连。
</details>

## 总结

从完全不懂到成功配置 Clash，你现在已经掌握了科学上网的基础技能。回顾一下关键步骤：

1. **下载安装** Clash Verge Rev
2. **获取订阅链接**（选择一个靠谱的机场）
3. **导入订阅**并选择一个低延迟节点
4. **开启系统代理**，验证连接成功
5. 根据需要决定是否使用 **TUN 模式**

Clash 的上手门槛其实很低，真正花时间的不是操作本身，而是理解背后的原理。一旦理解了"节点→订阅→规则分流"这条主线，你就会发现 Clash 其实非常简单好用。

如果你在使用过程中遇到任何问题，欢迎继续阅读本站的其他教程，包括 <a href="https://clash101.com/guide/clash-verge-rev-shiyong/">Clash Verge Rev 订阅导入与节点管理详解</a> 和 <a href="https://clash101.com/articles/?category=config">Clash 配置进阶教程</a>，我们会持续更新更多实用的 Clash 使用技巧。
