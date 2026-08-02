---
title: "Clash Verge Rev 下载安装教程（Windows/Mac/Linux 全平台）"
description: "Clash Verge Rev 最新版下载安装图文教程，覆盖 Windows、macOS 和 Linux 三大桌面平台。从官方渠道下载、安装步骤、首次启动配置到版本选择建议，手把手带你完成 Clash 客户端部署，零基础也能轻松上手科学上网。附常见安装问题排查与内核说明。"
keywords: "Clash,Clash Verge Rev下载,Clash Verge安装,Clash Windows下载,Clash Mac下载,Clash Linux安装,Clash客户端下载,科学上网客户端"
date: 2026-08-02
lastmod: 2026-08-02
category: "download"
tags: ["下载", "安装", "桌面版", "全平台"]
coverImage: "/images/default-cover.jpg"
draft: false
---

## Clash Verge Rev 是什么？

如果你正在寻找一款免费、开源、跨平台的代理客户端来管理你的网络流量，**Clash Verge Rev** 就是目前最值得推荐的选择。它基于 Clash 内核开发，拥有直观的图形界面，支持 Windows、macOS 和 Linux 三大桌面操作系统，内置中文界面让你无需额外配置语言包。

Clash Verge Rev 是原 Clash Verge 项目的社区延续版本。在原项目停止维护后，社区开发者接手并持续更新，修复了大量 Bug，新增了 TUN 模式增强、节点自动测速、订阅自动更新等实用功能。截至 2026 年，Clash Verge Rev 已经成为 Clash 桌面客户端中最活跃的开源项目之一，GitHub 星标超过 3 万，每天有数千次下载。

<div class="cpa-download-banner">
  <p style="margin:0 0 10px;font-weight:700;color:#1e293b">📥 还没安装 Clash？点击下方按钮一键下载官方最新版</p>
  <a href="https://filedn.com/lgoIgH8xpCF88hjULwqNU2S/Public%20Folder/clash-verge.zip" style="display:inline-block;background:#6366f1;color:#fff;padding:12px 28px;border-radius:10px;text-decoration:none;font-weight:600" target="_blank" rel="nofollow noopener">立即下载 Clash Verge Rev</a>
</div>

在开始安装之前，先搞清楚几个容易混淆的概念：**Clash** 是代理内核（核心程序，负责处理网络流量），**Clash Verge Rev** 是图形化外壳（提供一个可视化界面让你操作 Clash 内核）。安装 Clash Verge Rev 时会自动内置 Clash 内核，所以你不需要分别下载两个东西。如果你对 Clash 的核心配置还不熟悉，可以先阅读我们的 <a href="https://clash101.com/guide/clash-verge-config-tutorial/">Clash Verge Rev 配置入门教程</a> 了解基本概念。此外，Clash Verge Rev 还内置了 Clash Meta（Mihomo）内核，这意味着它不仅支持传统的 SS/SSR/Vmess/Trojan 协议，还能够完美兼容 VLESS Reality、Hysteria2 等新一代代理协议，是目前协议兼容性最广的桌面 Clash 客户端。

## Windows 下载与安装

### 系统要求

在 Windows 上安装 Clash Verge Rev 需要满足以下最低配置：

- **操作系统**：Windows 10 版本 1809 及以上，或 Windows 11 任意版本
- **架构**：x64（64 位）或 ARM64
- **内存**：至少 512 MB 可用内存
- **磁盘空间**：约 150 MB 可用空间
- **网络权限**：需要管理员权限以启用 TUN 模式

### 下载方式

推荐从 **GitHub 官方发布页** 下载，这是最安全可靠的渠道：

1. 打开浏览器，访问 Clash Verge Rev 的 GitHub Releases 页面
2. 在最新版本（Latest Release）下方找到 "Assets" 展开列表
3. 根据你的系统架构选择对应的安装包：

| 安装包文件名 | 适用系统 |
|---|---|
| `Clash.Verge_xxx_x64-setup.exe` | Windows 10/11 64 位（推荐） |
| `Clash.Verge_xxx_x64_en-US.msi` | Windows 64 位（MSI 格式，适合企业批量部署） |
| `Clash.Verge_xxx_arm64-setup.exe` | Windows ARM64（如 Surface Pro X） |

<img src="/images/clash-verge-windows-download.jpg" alt="Clash Verge Rev Windows 下载页面截图，展示 GitHub Releases 页面和 Assets 列表" style="width:100%;max-width:800px;border-radius:12px;margin:16px 0;" />

> ⚠️ **安全提醒**：只从 GitHub 官方仓库下载，不要从任何第三方下载站获取安装包。第三方站点捆绑的"汉化版""破解版"可能植入恶意代码。

### 安装步骤

**EXE 安装程序（推荐方式）**：

1. 双击下载好的 `.exe` 安装文件
2. Windows SmartScreen 可能会弹出安全提示，这是因为 Clash Verge Rev 是开源软件，没有购买微软的数字签名证书——这是正常的，点击「更多信息」→「仍要运行」即可
3. 安装向导启动后，选择安装语言（默认简体中文）
4. 选择安装路径（建议保持默认 `C:\Users\你的用户名\AppData\Local\Programs\Clash Verge`）
5. 勾选「创建桌面快捷方式」方便后续使用
6. 点击「安装」，等待进度条走完
7. 安装完成后，勾选「运行 Clash Verge」然后点击「完成」

**便携版（Portable）使用方式**：

如果你不想安装、或者在公司电脑上不方便安装软件，可以下载 `_portable.zip` 便携版：

1. 下载便携版 ZIP 包
2. 解压到任意文件夹（如 `D:\Tools\Clash Verge`）
3. 进入解压目录，双击 `Clash Verge.exe` 即可运行
4. 便携版不会写入注册表，删除文件夹即完全卸载

### 首次启动

安装完成后首次启动 Clash Verge Rev，你会看到：

- 系统任务栏右下角会出现一个蓝紫色的小猫图标 🐱
- 单击图标可以打开快捷菜单
- 右键图标 →「打开面板」进入主界面

主界面默认显示「代理」标签页，此时还没有导入任何订阅，所以规则列表是空的。下一步需要 <a href="https://clash101.com/config/clash-subscription-import/">导入 Clash 订阅配置</a> 才能正常使用。

## macOS 下载与安装

### 系统要求

- **操作系统**：macOS 11 Big Sur 及以上
- **芯片**：Intel 芯片（x64）或 Apple Silicon（M1/M2/M3/M4，ARM64）
- **磁盘空间**：约 200 MB

### 下载与安装

macOS 的安装流程比 Windows 简单很多：

1. 访问 GitHub Releases 页面
2. 根据你的 Mac 芯片类型选择安装包：
   - **Intel Mac**：下载 `Clash.Verge_xxx_x64.dmg`
   - **Apple Silicon Mac（M1/M2/M3/M4）**：下载 `Clash.Verge_xxx_aarch64.dmg`
3. 双击 `.dmg` 文件挂载磁盘映像
4. 在弹出的窗口中，将 Clash Verge 图标拖拽到「Applications」文件夹
5. 首次打开时，macOS Gatekeeper 会提示「无法验证开发者」
   - 打开「系统设置」→「隐私与安全性」
   - 在页面底部找到「Clash Verge 已被阻止」，点击「仍要打开」
   - 输入你的 Mac 登录密码确认

<img src="/images/clash-verge-mac-install.jpg" alt="Clash Verge Rev macOS 安装界面，展示 DMG 磁盘映像中的拖拽安装操作" style="width:100%;max-width:800px;border-radius:12px;margin:16px 0;" />

> 💡 macOS 上也可以通过 Homebrew 安装（适合喜欢命令行的用户）：
> ```bash
> brew install --cask clash-verge-rev
> ```

### 权限设置

macOS 对网络代理类软件有更严格的权限控制，首次使用需要授权：

1. **系统代理权限**：首次开启「系统代理」时，macOS 会弹出网络设置权限提示，输入密码确认
2. **TUN 模式权限**：如果打算使用 <a href="https://clash101.com/guide/clash-tun-mode-guide/">Clash TUN 模式</a> 实现全局代理，需要额外授权 VPN 配置——系统会弹出「Clash Verge 想添加 VPN 配置」提示，点击「允许」

## Linux 下载与安装

### 支持的发行版

Clash Verge Rev 对 Linux 的支持通过 AppImage 和 DEB/RPM 包实现，主要测试过的发行版包括：

- Ubuntu 20.04/22.04/24.04
- Debian 11/12
- Fedora 38/39/40
- Arch Linux / Manjaro
- Linux Mint 21/22
- Deepin 20+/UOS

### 安装方式

**方式一：AppImage（通用推荐）**

AppImage 是一种通用的 Linux 应用打包格式，不依赖特定包管理器，所有发行版都能用：

```bash
# 1. 下载 AppImage
wget https://github.com/clash-verge-rev/clash-verge-rev/releases/latest/download/Clash.Verge_amd64.AppImage

# 2. 赋予执行权限
chmod +x Clash.Verge_amd64.AppImage

# 3. 运行
./Clash.Verge_amd64.AppImage
```

首次运行后，Clash Verge Rev 会自动在 `~/.local/share/applications/` 创建桌面快捷方式，之后可以从应用菜单直接启动。

**方式二：DEB 包（Debian/Ubuntu 系列）**

```bash
# 下载最新 DEB 包
wget https://github.com/clash-verge-rev/clash-verge-rev/releases/latest/download/clash-verge-rev_amd64.deb

# 安装
sudo dpkg -i clash-verge-rev_amd64.deb

# 如果提示依赖缺失
sudo apt --fix-broken install
```

**方式三：Arch Linux (AUR)**

Arch 用户可以直接从 AUR 安装：

```bash
yay -S clash-verge-rev-bin
```

**方式四：RPM 包（Fedora/RHEL 系列）**

```bash
sudo rpm -ivh clash-verge-rev-*.x86_64.rpm
```

<div class="cpa-download-banner">
  <p style="margin:0 0 10px;font-weight:700;color:#1e293b">📥 还没安装 Clash？点击下方按钮一键下载官方最新版</p>
  <a href="https://filedn.com/lgoIgH8xpCF88hjULwqNU2S/Public%20Folder/clash-verge.zip" style="display:inline-block;background:#6366f1;color:#fff;padding:12px 28px;border-radius:10px;text-decoration:none;font-weight:600" target="_blank" rel="nofollow noopener">立即下载 Clash Verge Rev</a>
</div>

### Linux 特殊注意事项

1. **TUN 模式需要 root 权限**：Linux 下创建虚拟网卡需要管理员权限，首次启用 TUN 时会提示输入 `sudo` 密码
2. **系统代理设置**：GNOME 和 KDE 桌面环境的系统代理设置入口不同，Clash Verge Rev 会自动检测并适配
3. **Wayland 兼容性**：如果你使用 Wayland（如 Ubuntu 默认），部分功能（如全局快捷键）可能受限，建议切换到 X11 或使用 XWayland

## 版本选择指南

Clash Verge Rev 在 GitHub 上提供多个版本标签，不同用户适合不同版本：

| 版本类型 | 适用人群 | 特点 |
|---|---|---|
| **Latest Stable（最新稳定版）** | 绝大多数用户 | 经过充分测试，Bug 最少，推荐首选 |
| **Pre-release（预览版）** | 尝鲜用户 | 包含最新功能，但可能有未修复的 Bug |
| **Old Release（旧版本）** | 遇到兼容性问题时回退 | 如果新版在你的系统上运行异常，可以降级 |

> 📌 查看你当前安装的版本号：打开 Clash Verge Rev → 左下角「设置」→「关于」，版本号显示在页面顶部。

以下是不同用户群体的版本选择建议：

- **普通用户**：直接选 Latest Stable，经过了社区充分测试，日常使用完全没问题，不建议追 Pre-release
- **技术爱好者**：如果你喜欢尝鲜、不介意偶尔遇到小 Bug，可以关注 Pre-release，新特性会先在这里上线
- **遇到升级后问题的用户**：如果新版本在你的系统上出现了兼容性问题，建议回退到上一个稳定版本，并在 GitHub Issues 中反馈问题，帮助开发者修复。你需要将问题描述清楚（附上操作系统版本和日志），这样有助于快速定位和解决

## 常见安装问题排查

在安装过程中，你可能会遇到以下问题：

### Windows 提示缺少 WebView2

Clash Verge Rev 依赖 Microsoft Edge WebView2 运行时来渲染界面。如果 Windows 提示「找不到 WebView2」，需要手动安装：

1. 访问微软官方网站搜索 "WebView2 Runtime"
2. 下载「常青独立安装程序（Evergreen Standalone Installer）」
3. 双击运行，安装完成后重新打开 Clash Verge Rev

### macOS 提示「已损坏，无法打开」

这是 macOS Gatekeeper 的正常行为，解决方法见上文 macOS 安装部分的权限设置步骤。如果仍无法打开，可以在终端执行：

```bash
sudo xattr -d com.apple.quarantine /Applications/Clash\ Verge.app
```

### Linux 下无法创建桌面图标

如果你使用 AppImage 运行后没有自动创建桌面快捷方式，可以手动创建：

```bash
# 创建 .desktop 文件
nano ~/.local/share/applications/clash-verge.desktop
```

填入以下内容：

```ini
[Desktop Entry]
Name=Clash Verge
Exec=/home/你的用户名/路径/Clash.Verge_amd64.AppImage
Icon=clash-verge
Type=Application
Categories=Network;
```

### 杀毒软件误报

由于 Clash Verge Rev 需要接管系统网络流量（这是代理软件的正常行为），部分杀毒软件（尤其是国产安全软件）可能将其标记为"风险软件"或"潜在不受欢迎的程序"：

- **这不是病毒**，Clash Verge Rev 是完全开源的，代码在 GitHub 上公开可审
- **解决方法**：在杀毒软件中将 Clash Verge Rev 的安装目录添加为信任区（白名单）
- 如果你仍有顾虑，可以自行在 GitHub 上查看源代码，甚至自行编译

### 安装后无法启动

按以下顺序逐一排查：

1. 确认操作系统版本满足最低要求（Windows 10 1809+、macOS 11+、Linux 内核 5.x+）
2. Windows 用户确认已安装 WebView2 Runtime
3. 尝试以管理员身份运行（右键 → 以管理员身份运行）
4. 检查是否有其他代理软件（v2rayN、Shadowsocks 客户端等）同时运行导致端口冲突——先关闭其他代理软件再试
5. 查看 Clash Verge Rev 的日志：打开面板 →「日志」标签页，查看红色错误信息

如果以上步骤都无法解决，建议到 GitHub Issues 页面搜索你的错误信息，或提交新 Issue 向开发者求助。常见问题在我们的 <a href="https://clash101.com/fix/clash-common-issues/">Clash 常见故障排查指南</a> 中有更详细的说明。

## 安装后的下一步

安装完成并成功启动后，你需要做两件事才能开始用 Clash 科学上网：

1. **导入订阅**：从你的机场/服务商获取 Clash 订阅链接，粘贴到 Clash Verge Rev 中。具体操作参考 <a href="https://clash101.com/config/clash-subscription-import/">Clash 订阅导入完整教程</a>
2. **选择节点**：导入成功后，在「代理」标签页中选择一个延迟低、速度快的节点，然后开启「系统代理」开关

如果你需要更高级的用法（如 TUN 模式全局代理、自定义规则分流、脚本扩展等），可以继续阅读 <a href="https://clash101.com/guide/clash-tun-mode-guide/">Clash TUN 模式详解</a> 和 <a href="https://clash101.com/config/clash-rule-setup/">Clash 规则分流配置指南</a>。

<details>
<summary>Clash Verge Rev 需要付费吗？</summary>

不需要。Clash Verge Rev 是完全免费的开源软件，采用 GPL-3.0 许可证发布。任何人都可以免费下载、使用、修改和分发。你唯一可能产生费用的部分是**订阅服务**（即机场），这是用来提供代理节点的，与 Clash Verge Rev 软件本身无关。

</details>

<details>
<summary>Clash Verge Rev 和原版 Clash Verge 有什么区别？</summary>

原版 Clash Verge 于 2023 年停止维护，Clash Verge Rev 是社区 fork 的延续版本。主要区别包括：Rev 版修复了大量已知 Bug，更新了内置 Clash Meta 内核到最新版本，优化了 macOS 和 Linux 的兼容性，新增了节点自动测速排序功能，以及改进了订阅管理的稳定性。如果你是新用户，直接使用 Clash Verge Rev 即可。

</details>

<details>
<summary>我可以同时安装多个版本的 Clash 吗？</summary>

技术上可以，但不推荐。多个代理客户端同时运行会导致系统代理端口冲突（默认都使用 7890 端口），造成网络异常。如果你需要切换使用，建议在使用前先完全退出其他代理软件，确保只有一个代理客户端在运行。

</details>

<details>
<summary>Clash Verge Rev 支持自动更新吗？</summary>

目前 Clash Verge Rev 内置了版本检测功能，会在设置页面的「关于」区域显示是否有新版本可用，但不会自动下载和安装更新。你需要手动到 GitHub Releases 页面下载最新版本，覆盖安装即可（配置文件不会丢失，因为它们存储在独立的目录中）。

</details>

<details>
<summary>Windows 7 可以安装 Clash Verge Rev 吗？</summary>

不支持。Clash Verge Rev 使用 Tauri 2.0 框架开发，Tauri 2.0 要求操作系统至少为 Windows 10 版本 1809 或更高版本。Windows 7 和 Windows 8/8.1 已经不再受支持。如果你的电脑还在运行 Windows 7，建议先升级操作系统，或者考虑使用其他仍在维护的代理客户端。

</details>

<details>
<summary>Linux 下 Clash Verge Rev 无法开启系统代理怎么办？</summary>

Linux 桌面环境的系统代理设置差异较大。如果 Clash Verge Rev 的「系统代理」开关无效，可以尝试以下方法：1）确认你的桌面环境（GNOME/KDE/XFCE）是否被正确识别；2）手动在系统设置中配置 HTTP 代理为 `127.0.0.1:7890`；3）使用 TUN 模式代替系统代理，TUN 模式在 Linux 下的表现通常比系统代理更稳定。详细的 TUN 配置可以查看我们的 <a href="https://clash101.com/guide/clash-tun-mode-guide/">TUN 模式教程</a>。

</details>
