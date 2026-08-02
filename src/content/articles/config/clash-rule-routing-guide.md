---
title: "Clash 规则分流完全指南 — 自定义规则编写与优化"
description: "Clash Verge Rev 规则分流的全面深入指南，从规则类型、匹配器语法到实际编写技巧，详解 DOMAIN、DOMAIN-SUFFIX、GEOIP、IP-CIDR 等各类规则的使用场景，教你如何构建高效精准的分流策略，让国内外流量各行其道。"
keywords: "Clash,规则分流,自定义规则,代理规则,Clash Verge Rev,DOMAIN-SUFFIX,GEOIP,分流策略,规则编写,Clash配置进阶"
date: 2026-08-02
lastmod: 2026-08-02
category: "config"
tags: ["配置", "进阶", "规则"]
coverImage: "/images/default-cover.jpg"
draft: false
---

## 规则分流是什么？为什么你需要它？

很多 Clash 新手刚装好软件、导入机场订阅后，就直接选了全局模式开始用了。这当然能用——所有流量都走代理，要访问的网站一个不落。但用着用着你会发现不对劲：国内视频网站加载慢得离谱，B 站 1080P 一顿一卡，微信发图片要转半天的圈。

原因很简单：你的国内流量也跟着跑了半个地球。明明可以直接访问的国内网站，却绕到海外节点兜了一圈再回来。延迟翻了几倍不说，还白白消耗了机场的流量配额。

规则分流就是 Clash 用来解决这个问题的核心机制。它的逻辑很直白：**预先定义好哪些流量应该走代理、哪些流量应该直连**，Clash 在处理每条连接时自动查规则表，匹配到哪条就按哪条执行。配置好分流规则后，刷 B 站看爱奇艺的流量走本地直连（毫秒级响应），访问 Google、YouTube 的流量走代理节点，两边互不干扰，速度快、流量省、体验好。

你的机场订阅通常已经内置了一套基础分流规则，但这套规则是"通用版"，不一定适合你的实际使用场景。比如你可能有一些小众的外国网站不在内置规则中，或者有些国内 CDN 的前置域名被误判为需要代理。学会自己写规则，你就能从"能用 Clash"升级到"精通 Clash"。

<div class="cpa-download-banner">
  <p style="margin:0 0 10px;font-weight:700;color:#1e293b">📥 还没安装 Clash？点击下方按钮一键下载官方最新版</p>
  <a href="https://filedn.com/lgoIgH8xpCF88hjULwqNU2S/Public%20Folder/clash-verge.zip" style="display:inline-block;background:#6366f1;color:#fff;padding:12px 28px;border-radius:10px;text-decoration:none;font-weight:600" target="_blank" rel="nofollow noopener">立即下载 Clash Verge Rev</a>
</div>

![Clash 规则分流工作流程示意图](/images/clash-rules-workflow.jpg)
*图：Clash 规则匹配的完整流程——从上到下逐条匹配，命中最上面的规则后停止*

## 规则体系全景：一张图看懂 Clash 的规则类型

Clash 支持的规则类型非常丰富，覆盖了从域名、IP、地理位置到进程名等多种匹配方式。先来看一张总览表，帮你快速建立全局认知：

| 规则类型 | 匹配对象 | 精确度 | 性能 | 使用场景 |
|---------|---------|-------|-----|---------|
| `DOMAIN` | 完整域名 | 最高 | 最高 | 精准匹配某个确定的域名 |
| `DOMAIN-SUFFIX` | 域名后缀 | 高 | 高 | 匹配某个域名及其所有子域名 |
| `DOMAIN-KEYWORD` | 域名关键词 | 中等 | 高 | 模糊匹配包含某关键词的域名 |
| `GEOSITE` | 域名分类集 | 中等 | 中等 | 按网站类别批量匹配（如 geosite:google） |
| `GEOIP` | IP 地理位置 | 中等 | 中等 | 按国家/地区匹配 IP |
| `IP-CIDR` | IP 地址段 | 高 | 中等 | 精确匹配 IP 段 |
| `IP-CIDR6` | IPv6 地址段 | 高 | 中等 | 匹配 IPv6 地址段 |
| `SRC-IP-CIDR` | 来源 IP 段 | 高 | 中等 | 匹配发起请求的源 IP |
| `PROCESS-NAME` | 进程名称 | 高 | 低 | 按程序名匹配（如 clash-verge.exe） |
| `MATCH` | 全匹配 | — | — | 最终兜底规则，匹配所有剩余流量 |
| `RULE-SET` | 预定义规则集 | 取决于内容 | — | 引用外部规则集文件 |

### 底层执行逻辑：顺序匹配，命中即停

Clash 的规则引擎执行起来很简单——**从上到下逐条匹配，命中第一条就执行该规则的策略，后续规则不再检查**。如果所有规则都没命中，最后一条 `MATCH` 作为兜底（通常配成直连或代理）。

这个"命中即停"的特性要求你在排列规则时必须讲究顺序：**精确匹配放前面，模糊匹配放后面**。如果把 `DOMAIN-KEYWORD, google` 放在 `DOMAIN, google.com` 前面，那 `google.com` 会被关键词规则先命中，永远不会走到精确的域名规则（虽然在这个例子中效果一样，但在使用不同策略时就是 Bug 了）。

## 规则编写实战：从零到一构建分流策略

### 基本语法

Clash 规则的基础格式为：

```
规则类型,匹配内容,策略名称[,是否不解析域名]
```

- **规则类型**：上表中的任何一种
- **匹配内容**：域名、IP 段、关键词等
- **策略名称**：你的代理组名称，如 `PROXY`、`DIRECT`、`REJECT`、`🎯 自动选择` 等
- **是否不解析域名**（可选）：`no-resolve`，仅对 IP 类规则生效，表示不进行 DNS 解析

### 常见规则的编写示例

**1. 域名精确匹配**

```
DOMAIN,www.google.com,PROXY
DOMAIN,www.bilibili.com,DIRECT
DOMAIN,edge.microsoft.com,DIRECT
```

`DOMAIN` 是绝对精确匹配。`DOMAIN,m.google.com,PROXY` 可以匹配 `m.google.com`，但不会匹配 `mail.google.com` 或 `www.m.google.com`。

**2. 域名后缀匹配（最常用）**

```
DOMAIN-SUFFIX,google.com,PROXY
DOMAIN-SUFFIX,github.com,PROXY
DOMAIN-SUFFIX,bilibili.com,DIRECT
DOMAIN-SUFFIX,alipay.com,DIRECT
```

这是 Clash 规则中使用频率最高的类型。`DOMAIN-SUFFIX,google.com` 会匹配 `google.com`、`www.google.com`、`mail.google.com`、`accounts.google.com`、以及任何 `*.google.com` 的子域名。一条规则覆盖整个域名体系，非常高效。

⚠️ 注意：`DOMAIN-SUFFIX,google.com` 不会匹配 `agoogle.com` 或 `fgoogle.com`。它匹配的是以 `.google.com` 结尾或就是 `google.com` 本身的域名。

**3. 域名关键词匹配**

```
DOMAIN-KEYWORD,google,PROXY
DOMAIN-KEYWORD,facebook,PROXY
DOMAIN-KEYWORD,tencent,DIRECT
```

关键词匹配是"模糊匹配之王"——只要域名中任意位置包含该关键词就命中。但这也是一把双刃剑：`DOMAIN-KEYWORD,apple,PROXY` 会把 `apple.com`、`pineapple.com`、`crabapple.net` 全都匹配到。用得不好容易造成误伤，建议只在有明确意图时使用。

**4. 按地理位置匹配 IP**

```
GEOIP,CN,DIRECT
GEOIP,US,PROXY
```

`GEOIP` 是最省心的 IP 级规则——你不需要关心 Google 到底用了哪些 IP 段，一条 `GEOIP,US,PROXY` 就能覆盖所有美国 IP。但它的缺点也很明显：依赖 GeoIP 数据库的准确性，而且有些跨国 CDN（如 Cloudflare）同一个 IP 可能承载了国内外多个站点，按 IP 地理位置的判断会出错。

**5. IP 段精确控制**

```
IP-CIDR,8.8.8.8/32,PROXY
IP-CIDR,114.114.114.114/32,DIRECT
IP-CIDR,223.5.5.5/32,DIRECT
IP-CIDR,10.0.0.0/8,DIRECT,no-resolve
```

`IP-CIDR` 比 `GEOIP` 更精确，但你需要自己维护 IP 段列表。`no-resolve` 参数很重要：它告诉 Clash"只匹配目标 IP 就是该地址的流量，不要先做 DNS 解析再来匹配"。不加 `no-resolve` 的话，Clash 可能会因为你访问了一个与指定 IP 段相匹配的域名而错误命中规则。

**6. 进程名匹配（高级功能）**

```
PROCESS-NAME,clash-verge.exe,DIRECT
PROCESS-NAME,Telegram.exe,PROXY
PROCESS-NAME,qbittorrent.exe,DIRECT
```

按程序名匹配，用于精细控制特定应用的网络行为。比如你会希望 BT 下载软件（qBittorrent 等）走直连，避免消耗代理流量，也避免给机场带来不必要的版权风险。又比如 Clash 自身的进程要直连，不能走代理——否则就是鸡生蛋蛋生鸡的循环。

**7. RULE-SET（规则集引用）**

```
RULE-SET,https://ruleset.example.com/proxy.list,PROXY
RULE-SET,https://ruleset.example.com/cn.list,DIRECT
```

`RULE-SET` 允许你引用外部维护的规则集文件，不用把所有规则都塞进主配置文件。常用的规则集包括：
- **Loyalsoldier 的 ruleset**：国内维护最活跃的 Clash 规则集，覆盖常见代理/直连域名和 IP
- **ACL4SSR 规则集**：更细粒度的分类规则集
- **自建规则集**：你可以把自己的域名规则放在 GitHub 上，Clash 自动拉取更新

<div class="cpa-download-banner">
  <p style="margin:0 0 10px;font-weight:700;color:#1e293b">📥 还没安装 Clash？点击下方按钮一键下载官方最新版</p>
  <a href="https://filedn.com/lgoIgH8xpCF88hjULwqNU2S/Public%20Folder/clash-verge.zip" style="display:inline-block;background:#6366f1;color:#fff;padding:12px 28px;border-radius:10px;text-decoration:none;font-weight:600" target="_blank" rel="nofollow noopener">立即下载 Clash Verge Rev</a>
</div>

## 规则编排的核心原则：让规则既准又快

### 原则一：越精确越靠前

回忆规则引擎的匹配机制——从上到下，命中即停。因此排列顺序直接影响匹配效率：

```
# ✅ 正确的顺序
DOMAIN,www.specific-site.com,PROXY          # 精确匹配
DOMAIN-SUFFIX,apple.com,PROXY               # 后缀匹配
DOMAIN-KEYWORD,google,PROXY                 # 关键词匹配
GEOIP,US,PROXY                              # 地理 IP 匹配
MATCH,DIRECT                                # 兜底直连

# ❌ 错误的顺序
DOMAIN-KEYWORD,apple,PROXY
DOMAIN,www.apple.com,DIRECT     # 永远不会命中！已被上面的 KEYWORD 拦截
```

当你有特殊域名需要走不同于常规的策略时，把它的精确规则放在对应的大范围规则前面。

### 原则二：直连规则优先于代理规则

从逻辑上来说，Clash 需要明确哪些流量走直连，哪些走代理。但实际上，**"哪些是中国的"比"哪些是外国的"更容易穷举**。所以推荐的规则编排策略是：

1. 先列出必须直连的国内大站（`DOMAIN-SUFFIX,bilibili.com,DIRECT`）
2. 再用 `GEOSITE,cn,DIRECT` 批量覆盖国内域名
3. 用 `GEOIP,CN,DIRECT` 批量覆盖国内 IP
4. 列出明确需要代理的外国站（`DOMAIN-SUFFIX,google.com,PROXY`）
5. 最后 `MATCH,PROXY` 兜底——剩下的全部代理

这样一来，国内流量被大量规则快速直连（高性能），剩下的默认走代理（不漏网），兼顾了性能和覆盖率。

### 原则三：域名规则优先于 IP 规则

同一个连接，Clash 会用域名规则（DOMAIN/DOMAIN-SUFFIX 等）优先匹配，然后才用 IP 规则。这不是配置决定的，是 Clash 内核的匹配机制。

为什么域名规则优先更好？因为现代互联网大量使用 CDN（内容分发网络），同一个 IP 可能同时服务于国内和国外的网站。如果你用 `GEOIP,CN,DIRECT` 去判断一个托管在 Cloudflare 上的国内网站，它的 IP 可能在 Cloudflare 的美国 IP 段，结果就是本该直连的国内网站走了代理——这叫 IP 误判。而域名规则绝对准确：`bilibili.com` 肯定是国内的。

所以记住：**能用域名规则解决的，就不要依赖 IP 规则**。IP 规则作为域名规则的补充，用来兜底那些你不知道具体域名的流量。

### 原则四：善用 no-resolve 避免不必要的 DNS 查询

对 IP 类规则（`IP-CIDR`、`GEOIP`）来说，如果目标是一个域名而非 IP，Clash 需要先做 DNS 解析才能拿到 IP。如果你希望这条规则只在目标本身就是 IP 地址时才生效（不做额外解析），就加上 `no-resolve`：

```
IP-CIDR,10.0.0.0/8,DIRECT,no-resolve
IP-CIDR,127.0.0.0/8,DIRECT,no-resolve
```

对于私有 IP 和回环地址，`no-resolve` 是必须的——你不可能对外网域名解析出一个 `10.x.x.x` 地址，不需要也不该为这些规则做 DNS 查询。

### 原则五：拒绝不需要的流量

除了 `DIRECT`（直连）和 `PROXY`（代理），Clash 还支持 `REJECT`——直接拒绝连接。这对于阻断广告、跟踪器、恶意域名非常有效：

```
DOMAIN-SUFFIX,doubleclick.net,REJECT
DOMAIN-SUFFIX,googlesyndication.com,REJECT
DOMAIN-SUFFIX,googleadservices.com,REJECT
DOMAIN-SUFFIX,amazon-adsystem.com,REJECT
DOMAIN-KEYWORD,ad,REJECT
```

不过 `REJECT` 规则要慎用——误伤了正常网站的 CDN 或 API 域名会导致功能异常。建议先用浏览器的开发者工具观察哪些域名跑的是纯广告，确认真的是广告相关再添加 `REJECT`。

![Clash 规则编写对比示意图](/images/clash-rules-comparison.jpg)
*图：不同规则类型的精确度与性能对比*

## 实战：一步步构建你自己的分流规则

### 场景一：日常使用通用配置

这是最常见的需求——国内直连、国外代理、广告拦截，适合 90% 的用户：

```yaml
rules:
  # === 局域网/私有地址直连 ===
  - IP-CIDR,10.0.0.0/8,DIRECT,no-resolve
  - IP-CIDR,127.0.0.0/8,DIRECT,no-resolve
  - IP-CIDR,172.16.0.0/12,DIRECT,no-resolve
  - IP-CIDR,192.168.0.0/16,DIRECT,no-resolve
  
  # === 苹果服务（国内走直连速度快）===
  - DOMAIN-SUFFIX,apple.com.cn,DIRECT
  - DOMAIN-SUFFIX,icloud.com.cn,DIRECT
  - DOMAIN-SUFFIX,apple.com,PROXY    # 海外 apple.com 服务
  
  # === 国内大站直连 ===
  - DOMAIN-SUFFIX,bilibili.com,DIRECT
  - DOMAIN-SUFFIX,alipay.com,DIRECT
  - DOMAIN-SUFFIX,weixin.qq.com,DIRECT
  - DOMAIN-SUFFIX,taobao.com,DIRECT
  - DOMAIN-SUFFIX,jd.com,DIRECT
  - DOMAIN-SUFFIX,zhihu.com,DIRECT
  
  # === 游戏平台 ===
  - DOMAIN-SUFFIX,steampowered.com,PROXY
  - DOMAIN-SUFFIX,steamcommunity.com,PROXY
  - DOMAIN-SUFFIX,epicgames.com,PROXY
  
  # === 开发者工具 ===
  - DOMAIN-SUFFIX,github.com,PROXY
  - DOMAIN-SUFFIX,githubusercontent.com,PROXY
  - DOMAIN-SUFFIX,npmjs.org,PROXY
  - DOMAIN-SUFFIX,docker.com,PROXY
  - DOMAIN-SUFFIX,pypi.org,PROXY
  
  # === AI / 大模型平台 ===
  - DOMAIN-SUFFIX,openai.com,PROXY
  - DOMAIN-SUFFIX,claude.ai,PROXY
  - DOMAIN-SUFFIX,gemini.google.com,PROXY
  
  # === 批量规则 ===
  - GEOSITE,cn,DIRECT
  - GEOIP,CN,DIRECT
  
  # === 广告拦截 ===
  - DOMAIN-KEYWORD,adservice,REJECT
  - DOMAIN-KEYWORD,advertisement,REJECT
  
  # === 最终兜底 ===
  - MATCH,PROXY
```

关于 TUN 模式下的规则分流协同，建议配合 [Clash TUN 模式配置详解](/config/clash-tun-mode-guide/) 一起阅读，TUN + 分流规则组合使用才能达到最佳效果。

### 场景二：BT/PT 下载分流

BT 下载会产生大量流量，而且 BT 协议在代理节点上存在版权风险。最好让 BT 流量走直连：

```yaml
# BitTorrent 协议相关规则
- DOMAIN-SUFFIX,tracker.example.com,DIRECT
- DOMAIN-KEYWORD,tracker,DIRECT
- PROCESS-NAME,qbittorrent,DIRECT
- PROCESS-NAME,transmission,DIRECT
- PROCESS-NAME,aria2c,DIRECT
```

注意：Clash 不能代理 BitTorrent 协议的 DHT 网络流量（P2P 直连部分），只能代理 tracker 服务器的 HTTP 请求和部分下载流量。如果你的主要用途是 BT/PT 下载，建议直接用网盘或 HTTP 下载方式代替。

### 场景三：游戏加速分流

游戏加速是一个特殊场景——延迟比带宽更重要。你需要游戏连接走低延迟节点，但不能让下载更新包这些大流量也挤占游戏通道：

```yaml
# 游戏平台商店/更新（走大流量节点）
- DOMAIN-SUFFIX,steamcontent.com,DIRECT   # Steam 下载 CDN 直连
- DOMAIN-SUFFIX,epicgames-download.com,DIRECT

# 游戏登录/匹配服务器（走低延迟节点）
- DOMAIN-SUFFIX,steam-api.com,PROXY
- DOMAIN-SUFFIX,riotgames.com,PROXY
- DOMAIN-SUFFIX,blizzard.com,PROXY

# 语音聊天（走低延迟节点）
- DOMAIN-SUFFIX,discord.com,PROXY
- DOMAIN-SUFFIX,discord.gg,PROXY
- DOMAIN-SUFFIX,discordapp.com,PROXY
```

## 规则调试：如何验证你的规则是否正确工作

写好了规则不等于万事大吉。验证规则是否正确生效，是配置 Clash 过程中必不可少的一环。

### 方法一：Clash 日志面板

Clash Verge Rev 主界面自带日志面板，可以实时查看每条连接的匹配情况。当你访问一个网站时，日志中会显示：

```
[2026-08-02 11:30:00] [TCP] www.google.com:443 --> PROXY[香港01]
matched rule: DOMAIN-SUFFIX,google.com,PROXY
```

这说明 `google.com` 被 `DOMAIN-SUFFIX` 规则正确命中，走了代理策略。如果看到某条连接走到了你意想不到的策略（比如该代理的走了直连），就说明规则需要调整。

### 方法二：浏览器 IP 检测站点

访问 `whatismyip.com` 或 `ip.sb` 这类 IP 检测网站，看显示的 IP 是否是你的代理节点 IP。如果显示的是你本地的运营商 IP，说明当前流量没走代理。

### 方法三：规则测试工具

Clash 内核支持一个测试 API——你可以用它来模拟一条规则匹配：

```
curl -X POST http://127.0.0.1:9090/rules/test \
  -H "Content-Type: application/json" \
  -d '{"domain":"www.google.com"}'
```

这会返回命中规则的结果，方便你在不实际访问的情况下验证规则是否正确。

## 进阶技巧：让规则系统更智能

### 技巧一：使用 GEOSITE 替代大量手动域名规则

与其手动维护上百条 `DOMAIN-SUFFIX` 规则，不如使用 Clash 内置的 GEOSITE 分类：

```
GEOSITE,google,PROXY    # 覆盖所有 Google 相关域名
GEOSITE,netflix,PROXY   # 覆盖所有 Netflix CDN 域名
GEOSITE,openai,PROXY    # 覆盖所有 OpenAI 域名
GEOSITE,cn,DIRECT       # 覆盖国内主流网站
```

GEOSITE 的数据来源是 v2fly 维护的 [domain-list-community](https://github.com/v2fly/domain-list-community)，社区持续更新，新人也能轻松跟上。一条 `GEOSITE,cn,DIRECT` 抵得上你手写几百条国内规则。

### 技巧二：利用 RULE-SET 分离规则与配置

当你的规则量积累到几百上千条时，全部写在主配置文件里会严重影响可读性和可维护性。`RULE-SET` 允许你把规则拆分到独立文件中：

```yaml
rule-providers:
  proxy-sites:
    type: http
    behavior: domain
    url: "https://your-server.com/rules/proxy.yaml"
    path: ./rules/proxy.yaml
    interval: 86400   # 每 24 小时更新一次

  cn-sites:
    type: http
    behavior: domain
    url: "https://your-server.com/rules/cn.yaml"
    path: ./rules/cn.yaml
    interval: 86400

rules:
  - RULE-SET,proxy-sites,PROXY
  - RULE-SET,cn-sites,DIRECT
  - MATCH,PROXY
```

这样一来，更新规则只需要修改服务器上的规则文件，Clash 会自动拉取更新，不用手动改配置文件。配合 TUN 模式使用时，分流效果会更加显著——参考 [Clash TUN 模式配置详解](/config/clash-tun-mode-guide/) 了解 TUN 与规则分流的最佳协同方式。

### 技巧三：按应用行为分类代理

现代应用不再是"这个软件走代理、那个软件不走代理"这么简单——很多应用内部混合了国内外请求。例如微信：聊天消息走国内服务器，但朋友圈中的外部链接可能指向海外 CDN。你可以通过分析日志，找出需要特殊处理的关键域名，然后为它们编写专属规则。

![Clash 规则调试日志截图](/images/clash-rules-debug-log.jpg)
*图：通过 Clash 日志面板实时观察规则匹配结果*

## 配置进阶

掌握规则分流的最终目标是让你的网络访问"无缝"——你自己都感觉不到代理的存在。该快的快、该直连的直连、该代理的代理，一切都是自动的、安静的、不需要任何手动切换。

为此，推荐你把规则分流与以下配置搭配使用：
- **TUN 模式**：确保所有应用流量都经过 Clash 规则引擎
- **DNS 配置**：Fake-IP + DoH，确保 DNS 不泄漏且响应快
- **策略组**：按需求分配不同节点（高速、低延迟、流量优先）

关于 TUN 模式与规则分流的协同配置，可以参考本站的 [Clash TUN 模式配置详解](/config/clash-tun-mode-guide/) 一文。

## 总结

规则分流是 Clash 最核心的能力，也是 Clash 区别于普通 VPN 的关键所在。用好规则分流，你就不再是被动接受"全局开/关"的普通用户，而是能精准控制每一条网络连接走向的高级玩家。

核心要点回顾：
- 规则引擎自上而下匹配，命中即停——精确规则放前面，通用规则放后面
- 域名规则优于 IP 规则——CDN 时代域名匹配更准确
- `DOMAIN-SUFFIX` 是主力武器，`GEOIP` 和 `GEOSITE` 是批量利器
- 私有地址和局域网网段务必加 `DIRECT` + `no-resolve`
- 调试规则靠日志面板和 IP 检测站点，不要靠"感觉"
- RULE-SET 和 GEOSITE 让规则维护从体力活变成脑力活

当你完成了规则分流的优化，下一步可以考虑深入研究 [Clash TUN 模式配置详解](/config/clash-tun-mode-guide/)，将网络层代理与分流策略结合起来，实现真正的"无感代理"。

<div class="faq-list">

<details>
<summary><strong>为什么我加了 DOMAIN-SUFFIX,google.com,PROXY 后 YouTube 还是打不开？</strong></summary>
<p>YouTube 使用的是 <code>youtube.com</code> 域名，不是 <code>google.com</code>。你需要单独添加 <code>DOMAIN-SUFFIX,youtube.com,PROXY</code> 以及 YouTube 的 CDN 域名如 <code>DOMAIN-SUFFIX,googlevideo.com,PROXY</code>。或者更省事的办法是用 <code>GEOSITE,google,PROXY</code> 一次性覆盖所有 Google 系域名（YouTube、Google Drive、Gmail 等）。</p>
</details>

<details>
<summary><strong>DOMAIN-KEYWORD 和 DOMAIN-SUFFIX 哪个更好？</strong></summary>
<p>没有绝对的"更好"，只有"更适合"。<code>DOMAIN-SUFFIX</code> 更精确、性能更高，适合你明确知道域名结构的场景（如 <code>google.com</code> 匹配所有 Google 子域名）。<code>DOMAIN-KEYWORD</code> 更灵活，适合你不知道完整域名结构但知道关键词的场景（如 <code>DOMAIN-KEYWORD,tracker,PROXY</code> 匹配各种 tracker 服务器）。建议优先使用 <code>DOMAIN-SUFFIX</code>，只在确实需要模糊匹配时才用 <code>DOMAIN-KEYWORD</code>。</p>
</details>

<details>
<summary><strong>GEOIP,CN,DIRECT 会把所有国内 IP 流量都直连吗？</strong></summary>
<p>理论上是的，但实际效果取决于 GeoIP 数据库的准确性和时效性。GeoIP 数据库并非 100% 准确——尤其在处理跨国 CDN（如 Cloudflare、Akamai）时，同一个 IP 段可能同时分配给多个国家的用户。所以 GEOIP 适合作为兜底规则，不建议作为唯一的判断依据。建议配合域名规则一起使用。</p>
</details>

<details>
<summary><strong>我的规则配置中有几千条规则，会影响性能吗？</strong></summary>
<p>Clash 的规则匹配引擎经过高度优化，几千条规则的性能影响通常可以忽略不计（毫秒级延迟增加）。但如果规则超过万条且大量使用了 <code>IP-CIDR</code> 或 <code>DOMAIN-KEYWORD</code>（这两类规则的匹配效率低于 <code>DOMAIN-SUFFIX</code>），你可能在极端高并发场景下（如同时加载 50+ 个网页）感受到略微的延迟增加。建议使用 RULE-SET 管理大量规则，将更新和维护分离到外部文件。</p>
</details>

<details>
<summary><strong>如何知道某个网站是否被我的规则正确匹配？</strong></summary>
<p>打开 Clash Verge Rev 的日志面板（通常在「日志」标签页），然后访问目标网站。日志中会显示每条连接的匹配规则名称和最终走的是哪个策略。如果日志中没有出现该连接，说明 TUN 模式可能没有正常接管流量（检查 TUN 状态指示灯）；如果日志中出现了但走的不是预期的策略，说明规则需要调整。</p>
</details>

<details>
<summary><strong>MATCH 应该设置为 DIRECT 还是 PROXY？</strong></summary>
<p>取决于你的使用场景和风险偏好。如果设为 <code>PROXY</code>，未被前面规则覆盖的流量全部走代理——优点是保证了"该代理的一定能代理到"，缺点是可能有国内冷门网站误走代理。如果设为 <code>DIRECT</code>，未知流量全部直连——优点是省流量、国内体验更好，缺点是可能有小众国外网站漏网。一般推荐 <code>MATCH,PROXY</code>，同时配合充足的国内直连规则（<code>GEOSITE,cn</code> + <code>GEOIP,CN</code>），尽量减少误代理的情况。</p>
</details>

<details>
<summary><strong>REJECT 规则能用来去广告吗？效果如何？</strong></summary>
<p>可以，Clash 的 <code>REJECT</code> 规则确实能拦截广告域名的网络请求，效果类似于简易版 DNS 广告过滤。但它的能力有限：只能拦截独立广告域名请求，无法处理与正常内容混在一起的广告（如 YouTube 视频前贴片广告、微博信息流广告），也无法进行元素级过滤（如隐藏广告占位符）。如果需要更强的广告过滤，建议配合浏览器扩展（uBlock Origin）或 DNS 级广告过滤服务。</p>
</details>

</div>
