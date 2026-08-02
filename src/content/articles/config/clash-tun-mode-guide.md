---
title: "Clash TUN 模式配置详解 — 实现真正的全局代理"
description: "Clash Verge Rev TUN 模式从原理到实战的完整配置指南。深入详解 TUN 虚拟网卡工作机制、与系统代理的核心区别、各平台开启方法、DNS 配置最佳实践以及常见问题的排查思路，帮助你将 Clash 全面升级为真正的全局代理工具。"
keywords: "Clash,TUN模式,全局代理,虚拟网卡,Clash Verge Rev,DNS配置,代理客户端,科学上网,TUN stack,Clash配置进阶"
date: 2026-08-02
lastmod: 2026-08-02
category: "config"
tags: ["配置", "进阶", "TUN"]
coverImage: "/images/default-cover.jpg"
draft: false
---

## 什么是 TUN 模式？先理解它的底层原理

很多 Clash 用户从系统代理模式入门时，都会遇到一个令人困惑的问题：为什么有些应用明明已经开了代理，网络请求却依然直连？比如命令行工具 `git clone`、终端里的 `curl`、Windows Update、Steam 游戏下载、甚至某些应用的内置更新器——它们通通绕过了系统代理。这不是 Bug，而是系统代理的工作原理决定的。

系统代理的本质是修改操作系统的代理设置（Windows 的"Internet 选项"、macOS 的网络偏好设置），相当于在系统层面告诉遵守规则的应用程序："上网请走这个地址"。问题在于，并不是所有程序都遵守这套规则。很多底层网络请求直接调用系统网络栈，完全无视代理设置。于是你开再好的代理节点，这些流量依然直连，该慢还是慢，该被屏蔽还是被屏蔽。

TUN 模式正是为解决这个痛点而生的。TUN（Tunnel）是操作系统提供的一种虚拟网络设备。你可以把它理解成一个"假的网卡"——Clash 创建一张虚拟网卡，然后通过修改系统路由表，将所有网络流量导向这张虚拟网卡。从这张网卡经过的每一个数据包，都会被 Clash 截获、解析、按规则决定是直连还是走代理。

这种"虚拟网卡接管一切"的方式，让 TUN 模式做到了真正意义上的全局代理：不再依赖应用是否支持代理设置，不再区分 TCP 还是 UDP，不再漏掉任何一个数据包。无论什么程序发出网络请求，操作系统都会把它送到 Clash 的虚拟网卡，Clash 再根据你的规则配置决定如何处理。这就是为什么被称为"真正全局代理"——因为它从网络层切入，比应用层的系统代理高了一个维度。

<div class="cpa-download-banner">
  <p style="margin:0 0 10px;font-weight:700;color:#1e293b">📥 还没安装 Clash？点击下方按钮一键下载官方最新版</p>
  <a href="https://filedn.com/lgoIgH8xpCF88hjULwqNU2S/Public%20Folder/clash-verge.zip" style="display:inline-block;background:#6366f1;color:#fff;padding:12px 28px;border-radius:10px;text-decoration:none;font-weight:600" target="_blank" rel="nofollow noopener">立即下载 Clash Verge Rev</a>
</div>

![TUN 模式工作原理示意图](/images/tun-mode-workflow.jpg)
*图：TUN 模式通过虚拟网卡接管所有网络流量*

## TUN 模式 vs 系统代理：一张表看懂差异

很多用户分不清这两种模式的区别，这里用一张对比表帮你快速理解：

| 对比维度 | 系统代理模式 | TUN 模式 |
|---------|------------|---------|
| 工作原理 | 修改系统代理设置，依赖应用遵守 | 创建虚拟网卡 + 修改路由表，从网络层接管 |
| 覆盖范围 | 仅覆盖遵守系统代理的应用 | 覆盖所有应用的网络流量 |
| TCP 代理 | ✅ 支持 | ✅ 支持 |
| UDP 代理 | ❌ 大部分不支持 | ✅ 完全支持 |
| 命令行工具（git/curl/npm） | ❌ 不走代理 | ✅ 自动代理 |
| 游戏加速 | ❌ 无效 | ✅ 有效 |
| 虚拟机流量 | ❌ 无法代理 | ✅ 可代理 |
| 性能开销 | 极低 | 略高（需处理所有数据包） |
| 配置复杂度 | 简单（一键开启） | 中等（需配合路由规则和 DNS） |
| 兼容性 | 部分应用不兼容 | 基本所有网络程序兼容 |

看到这张表，你应该理解为什么进阶用户几乎都会切换为 TUN 模式了。它的核心优势就三个字：全覆盖。当然，TUN 模式也有代价——它需要处理系统上的每一条网络流量，包括一些你不希望被代理的本地连接。所以配置 TUN 模式的精髓不在于"开启"这个动作本身，而在于后续的路由规则和 DNS 配置是否正确。

如果对规则分流还不熟悉，建议先阅读我们的 [Clash 规则分流完全指南](/config/clash-rule-routing-guide/)，理解规则系统后再回来看 TUN 配置会有更深的理解。

<div class="cpa-download-banner">
  <p style="margin:0 0 10px;font-weight:700;color:#1e293b">📥 还没安装 Clash？点击下方按钮一键下载官方最新版</p>
  <a href="https://filedn.com/lgoIgH8xpCF88hjULwqNU2S/Public%20Folder/clash-verge.zip" style="display:inline-block;background:#6366f1;color:#fff;padding:12px 28px;border-radius:10px;text-decoration:none;font-weight:600" target="_blank" rel="nofollow noopener">立即下载 Clash Verge Rev</a>
</div>

## Clash Verge Rev 中开启 TUN 模式的三种方式

### 方式一：图形界面一键开启（推荐新手）

Clash Verge Rev 把 TUN 模式的开关做成了 GUI 里最显眼的功能按钮：

1. 打开 Clash Verge Rev 主界面，找到左侧导航栏或者顶部的「设置」图标
2. 在设置面板中定位到「TUN 模式」区域
3. 打开「TUN 模式」开关，程序会自动完成以下操作：
   - 安装 TUN 虚拟网卡驱动（首次需要管理员权限）
   - 配置系统路由表，将匹配流量导向虚拟网卡
   - 启动内置的 DNS 服务器作为上游解析
4. 观察主界面状态指示灯，TUN 图标变绿即表示启动成功

这种方式适合绝大多数用户——不需要手动编辑配置文件，Clash 会自动生成合理的默认 TUN 配置。

### 方式二：配置文件中手动开启（推荐进阶用户）

如果你需要更深度的定制化，可以直接编辑 Clash 的配置文件。在配置文件的顶层添加或修改 `tun` 字段：

```yaml
tun:
  enable: true
  stack: system           # 可选 system / gvisor / mixed
  dns-hijack:
    - any:53              # DNS 劫持，确保 DNS 请求也走代理
    - tcp://any:53
  auto-route: true        # 自动配置路由表
  auto-detect-interface: true  # 自动检测出口网卡
  device: utun            # macOS 下的设备名（Windows 下可省略）
```

关键参数说明：

- **`stack`**：TUN 协议栈类型。`system` 使用操作系统原生 TUN 栈，性能最好但需要管理员权限；`gvisor` 是用户态实现，无需管理员权限但在高带宽场景下可能有性能瓶颈；`mixed` 是混合模式（TCP 用 system，UDP 用 gvisor）。一般情况下用 `system`，如果遇到权限问题再切 `gvisor`。
- **`dns-hijack`**：DNS 劫持规则。TUN 接管了所有流量，自然也包括 DNS 请求。如果不劫持 DNS，部分应用可能使用硬编码的 DNS 服务器（如 8.8.8.8），导致 DNS 泄漏。配置 `any:53` 可以劫持所有 IPv4 的 53 端口请求，确保 DNS 也走代理规则。
- **`auto-route`**：自动配置路由表。如果设为 `false`，你需要手动添加路由规则将流量导入 TUN 设备。一般保持 `true` 即可。
- **`auto-detect-interface`**：开启后 Clash 会自动检测系统的物理出口网卡（Wi-Fi / 以太网），避免多个网卡时的路由冲突。

### 方式三：混合模式（TUN + 系统代理并存）

有些场景下你可能希望某些流量走 TUN、某些走系统代理。Clash 支持两者同时开启，通过 `tun` 的路由排除规则来精细控制：

```yaml
tun:
  enable: true
  stack: system
  dns-hijack:
    - any:53
  auto-route: true
  auto-detect-interface: true
  # 以下路由排除本地/局域网地址，避免代理内部流量
  route-exclude-address:
    - 10.0.0.0/8
    - 172.16.0.0/12
    - 192.168.0.0/16
    - fc00::/7
    - fe80::/10
    - ::1/128
```

同时保持系统代理开关打开。这种模式下，TUN 处理底层流量，系统代理处理应用层请求，两者互补。不过大多数情况下，TUN 模式单独开启已经足够覆盖所有场景。

![Clash TUN 模式 GUI 设置界面](/images/clash-tun-settings.jpg)
*图：Clash Verge Rev 的 TUN 模式设置界面*

## TUN 模式的 DNS 配置：最容易踩的坑

讲 TUN 模式，就不能不讲 DNS。DNS 配置是 TUN 模式使用中最容易出问题的环节——配不好要么解析慢，要么 DNS 泄漏，要么某些域名直接解析失败。

### 为什么要专门配置 DNS？

系统代理模式下，DNS 请求大多由浏览器或应用自行发出，走的是各自的 DNS 设置。TUN 模式接管后，所有 DNS 请求（UDP 53 端口）都会被导入 Clash 的虚拟网卡，由 Clash 统一处理。这意味着你的 DNS 配置直接影响所有应用的域名解析行为。如果配错了，轻则解析慢三五秒，重则部分网站打不开。

### 推荐的 DNS 配置方案

```yaml
dns:
  enable: true
  listen: 0.0.0.0:53
  enhanced-mode: fake-ip    # 或者 redir-host
  fake-ip-range: 198.18.0.1/16
  fake-ip-filter:
    - '*.lan'
    - '*.localdomain'
    - '*.example'
    - '*.invalid'
    - 'localhost.ptlogin2.qq.com'
    # 排除需要真实 IP 的特殊域名
  nameserver:
    - https://doh.pub/dns-query      # 国内 DNS（DoH）
    - https://dns.alidns.com/dns-query
  fallback:
    - https://cloudflare-dns.com/dns-query  # 国外 DNS（DoH）
    - https://dns.google/dns-query
  fallback-filter:
    geoip: true
    geoip-code: CN
    ipcidr:
      - 240.0.0.0/4
    domain:
      - '+.google.com'
      - '+.facebook.com'
      - '+.twitter.com'
      - '+.youtube.com'
```

### 两种 DNS 模式对比：Fake-IP vs Redir-Host

| 特性 | Fake-IP | Redir-Host |
|-----|---------|------------|
| 原理 | Clash 返回一个虚拟 IP，后续连接时再根据域名查规则 | Clash 先真实解析域名，得到真实 IP 再查规则 |
| 响应速度 | 极快（立即返回虚拟 IP） | 较慢（需等待真实 DNS 解析） |
| 命中规则 | 基于域名（最准确） | 基于 IP（可能误判 CDN） |
| CDN 兼容性 | 部分 CDN 可能返回非最优节点 | 更准确 |
| 推荐场景 | 日常使用、看视频、浏览网页 | 对延迟敏感的游戏、VoIP |

Clash Verge Rev 默认使用 Fake-IP 模式。这个模式的核心思路是：Clash 不立即去解析域名的真实 IP，而是返回一个 198.18.x.x 段的"假 IP"。当应用向这个假 IP 发起连接时，Clash 根据原始域名匹配规则（是走代理还是直连），然后才去真实解析并建立连接。这样做的好处是代理规则以域名而非 IP 为准，匹配更精准，尤其是在一个 IP 对应多个 CDN 站点的情况下不会误判。

## TUN 模式的高级路由配置

### 为什么需要手动配置路由排除？

TUN 模式最让人头疼的问题之一是"代理了不该代理的流量"。如果你在公司内网或校园网环境中使用 TUN 模式，VPN 连接、内网打印机、文件服务器、局域网共享等流量也会被导入 Clash。这些本应直连的流量如果走了代理，不仅无法正常工作，还可能触发内网安全策略。

解决方案就是 `route-exclude-address`——告诉 Clash："这些 IP 段不要碰，让它们走物理网卡直连。"

### 完整的路由排除配置

```yaml
tun:
  enable: true
  stack: system
  dns-hijack:
    - any:53
  auto-route: true
  auto-detect-interface: true
  route-exclude-address:
    # 局域网私有地址段
    - 10.0.0.0/8
    - 172.16.0.0/12
    - 192.168.0.0/16
    # 本地回环
    - 127.0.0.0/8
    - ::1/128
    # 链路本地地址
    - 169.254.0.0/16
    - fe80::/10
    # 组播地址
    - 224.0.0.0/4
    - ff00::/8
    # 公司/学校 VPN 网段（按需添加）
    - 100.64.0.0/10
```

### 高级用户场景：仅代理特定应用的流量

TUN 模式也可以反向操作——不代理全部流量，而是通过进程名匹配"仅代理特定应用"。这在高安全性需求的场景中很有用：

```yaml
tun:
  enable: true
  stack: system
  dns-hijack:
    - any:53
  auto-route: true
  # 仅代理匹配的进程
  include-interface:
    - "10.0.0.0/8"
```

配合系统防火墙规则，可以实现比系统代理更精细的流量控制。

## 各平台 TUN 模式差异与注意事项

### Windows

Windows 是 TUN 模式支持最好的平台。Clash Verge Rev 使用 Wintun 驱动（WireGuard 项目的虚拟网卡驱动），稳定性出色。首次开启需要管理员权限，后续自启动时如果 Clash 以管理员身份运行则可自动开启。

- **优点**：驱动成熟、性能好、GUI 配置方便
- **常见问题**：安装驱动时需要允许 Windows 安全弹出；部分杀毒软件可能拦截虚拟网卡驱动，需要加入白名单
- **特别提示**：Windows 的 Hyper-V 虚拟交换机和 WSL2 的虚拟网卡可能与 TUN 路由规则冲突。如果你运行 Hyper-V 虚拟机或 WSL2，建议在 `route-exclude-address` 中添加 Hyper-V 默认网段 `172.17.0.0/16` 到 `172.31.0.0/16`。

### macOS

macOS 使用 utun 接口（Unix Tunnel），原生支持无需额外驱动。但 macOS 的网络框架对 TUN 的兼容性不如 Windows：

- **优点**：免驱动、内置支持、稳定性好
- **常见问题**：系统升级后 TUN 设备可能未自动创建，需重新开关；某些安全/隐私软件（如 Little Snitch）可能与 TUN 产生冲突
- **配置提示**：macOS 下建议明确指定 `device: utun`，且把 `stack` 设为 `system`

### Linux

Linux 下的 TUN 支持最灵活但配置也最复杂：

- **优点**：完全的底层控制、可配合 iptables/nftables 实现高级路由
- **常见问题**：需要 root 权限或 `CAP_NET_ADMIN` capability；不同发行版的网络管理器（NetworkManager/systemd-networkd）可能覆盖 Clash 设置的路由表
- **配置提示**：建议使用 `stack: system`；如果使用 NetworkManager，需要在连接配置中排除 TUN 接口，防止 NM 接管它的路由

### Android

Clash Meta for Android 支持 TUN 模式，通过 Android 的 VPN 服务 API 实现：

- **优点**：无需 root 即可使用，覆盖所有应用
- **限制**：Android VPN API 不支持 IPv6 代理（部分 ROM 除外）；与真正的 VPN 应用互斥
- **特别提示**：Android 开启 TUN 后系统状态栏会常驻 VPN 图标，这是系统设计使然，不是故障

## TUN 模式常见问题与排查思路

### 问题一：开启了 TUN 但某些应用依然无法代理

**排查步骤：**

1. 确认 TUN 模式状态指示灯为绿色
2. 检查 `route-exclude-address` 中是否排除了目标地址段
3. 确认 DNS 劫持已启用（`dns-hijack` 配置）
4. 用 `curl -v https://www.google.com` 测试（终端命令不受系统代理影响，应为 TUN 接管）
5. 检查 Clash 日志面板，看是否有该域名的连接记录

### 问题二：开启 TUN 后局域网设备无法访问本机

这是因为 `auto-route` 自动将局域网路由也指向了 TUN 设备，导致本机的局域网服务对外不可见。

**解决方法**：在 `route-exclude-address` 中添加 `192.168.0.0/16` 等局域网网段，或者将 `auto-route` 设为 `false` 后手动配置路由。

### 问题三：开启 TUN 后某些国内网站变慢

这通常是因为 DNS 走了国外的 `fallback` DNS，解析到了海外 CDN 节点。检查 `nameserver` 和 `fallback` 的配置，确保国内域名优先走国内 DNS 解析。也可以参考我们的 [Clash 规则分流完全指南](/config/clash-rule-routing-guide/) 中关于域名规则的配置方式。

### 问题四：TUN 模式导致电脑发热或风扇狂转

TUN 模式需要处理所有网络数据包，CPU 占用确实会高于系统代理模式。如果感觉明显发热，可以尝试：
- 将 `stack` 从 `gvisor` 改为 `system`（用系统原生栈降低 CPU 开销）
- 添加 `route-exclude-address` 排除大量不重要的本地流量
- 减少不必要的规则数量，优先使用域名规则而非 IP 规则

### 问题五：macOS 升级后 TUN 失效

这是一个已知问题。macOS 大版本更新后 utun 设备可能被系统重新分配编号，Clash 的旧配置无法匹配。

**解决方法**：重启 Clash、在 macOS 网络偏好中删除旧的 Clash 相关网络服务、然后用 Clash Verge Rev 重新开启 TUN 即可。

关于更多 Clash 使用中的故障排查，建议阅读我们的 [Clash 基础故障排查指南](/guide/clash-basic-troubleshooting/)。

![TUN 模式 DNS 配置流程](/images/clash-tun-dns-config.jpg)
*图：TUN 模式下 DNS 请求的完整处理流程*

## 总结

TUN 模式是 Clash 从"代理工具"升级为"网络层管理工具"的分水岭。一旦配置好了 TUN + DNS + 规则分流，你就拥有了一个媲美企业级 VPN 的全局代理方案，而且完全免费。

核心要点回顾：
- TUN 在系统网络层（而非应用层）工作，覆盖所有程序的网络流量
- `stack: system` 性能最高但需管理员权限，`gvisor` 无需管理员但性能稍弱
- DNS 劫持是 TUN 模式的关键——不劫持 DNS 等于 DNS 泄漏
- Fake-IP 模式在日常使用中体验更好，Redir-Host 在特殊场景更准确
- 路由排除是生产环境 TUN 部署的必选项，否则内网服务会受到影响
- 各平台 TUN 模式有自己的"坑"，按平台注意要点配置即可

当你完成 TUN 模式的配置后，下一步建议深入学习 [Clash 规则分流完全指南](/config/clash-rule-routing-guide/)，将代理规则打磨得更精准、更高效。

<div class="faq-list">

<details>
<summary><strong>TUN 模式和系统代理可以同时开启吗？</strong></summary>
<p>可以。Clash 支持 TUN 和系统代理同时开启。但由于 TUN 已经接管了所有流量，同时开启系统代理通常没有必要，反而可能造成双重代理而导致性能下降。建议二选一：日常使用选 TUN 模式，临时测试用系统代理。</p>
</details>

<details>
<summary><strong>开启 TUN 模式需要 root / 管理员权限吗？</strong></summary>
<p>取决于 stack 类型。使用 <code>stack: system</code> 需要管理员/root 权限来创建虚拟网卡和修改路由表；使用 <code>stack: gvisor</code> 是纯用户态实现，理论上不需要管理员权限，但实际使用中某些平台（如 Windows）仍需管理员权限来安装 Wintun 驱动。Clash Verge Rev 在首次开启 TUN 时会弹出 UAC 提示，点击"是"即可。</p>
</details>

<details>
<summary><strong>TUN 模式会影响局域网共享和打印机吗？</strong></summary>
<p>默认情况下可能会影响。如果 <code>route-exclude-address</code> 中没有添加局域网私有地址段（192.168.x.x、10.x.x.x 等），局域网流量同样会被导入 TUN 设备，导致无法访问局域网内的共享文件夹和打印机。请确保你的配置中包含了局域网网段的排除规则。</p>
</details>

<details>
<summary><strong>TUN 模式下为什么有些国内网站变得很慢？</strong></summary>
<p>这通常是 DNS 解析走了国外 DNS 服务器导致的。TUN 模式劫持了所有 DNS 请求，如果 <code>fallback</code> DNS 优先响应，解析到的可能是海外 CDN 节点。解决方法：在 <code>dns.nameserver</code> 中配置国内 DoH 服务器（如阿里 DNS、腾讯 DNSPod），并正确设置 <code>fallback-filter</code> 的 <code>geoip-code: CN</code>，让国内域名优先走国内 DNS。</p>
</details>

<details>
<summary><strong>Fake-IP 模式下部分网站打不开怎么办？</strong></summary>
<p>Fake-IP 返回虚拟 IP（198.18.x.x），部分做了 IP 检测的应用可能拒绝连接。解决方法有两种：一是在 <code>fake-ip-filter</code> 中添加该域名，让 Clash 对它返回真实 IP；二是临时切换到 <code>redir-host</code> 模式。如果有大量应用受影响，建议全局切换为 redir-host 模式。</p>
</details>

<details>
<summary><strong>TUN 模式下如何确认 DNS 没有泄漏？</strong></summary>
<p>推荐使用浏览器访问 <a href="https://ipleak.net">ipleak.net</a> 或 <a href="https://www.dnsleaktest.com">dnsleaktest.com</a>，这些网站会显示你的 DNS 请求实际发给了哪些服务器。如果显示的 DNS 服务器地址全是你的代理节点所在地，说明没有泄漏。如果出现了你本地的 ISP DNS 地址，说明 DNS 劫持未生效或有 DNS 泄漏。</p>
</details>

<details>
<summary><strong>TUN 模式开启后 SSH 连接频繁断开怎么办？</strong></summary>
<p>SSH 是长连接协议，TUN 模式下如果代理节点不稳定或切换节点，SSH 连接会中断。解决方法：为 SSH 流量配置直连规则，或者在 TUN 配置中添加 <code>route-exclude-address</code> 包含你的 SSH 服务器 IP。如果你需要通过代理连接远程 SSH，建议使用 <code>ProxyCommand</code> 配合 <code>nc</code> 或 <code>connect</code> 工具。</p>
</details>

</div>
