# Security Policy

## Supported Versions

本项目当前采用**仅主分支维护**的安全更新策略：

| 分支 / 版本 | 安全更新支持 |
| --- | --- |
| `main`（最新代码） | ✅ 支持 |
| 历史发布版本 / 旧分支 | ❌ 不支持 |

> 如需长期支持（LTS）版本，请在仓库中提交需求，由维护者评估后单独发布策略。

## Reporting a Vulnerability

如果你发现了潜在安全漏洞，请**通过以下官方渠道私下报告**：

1. GitHub Private Vulnerability Reporting（推荐）  
   `https://github.com/<OWNER>/<REPO>/security/advisories/new`
2. 如上渠道不可用，请联系维护者安全邮箱（若已公布）。

### 响应时限

- 我们会在 **72 小时内**完成首次响应（确认已收到、分配处理状态、给出下一步时间预期）。
- 若信息不完整，可能会请求补充复现步骤、影响范围与 PoC。

### 处理与披露流程

1. **确认（Triage）**：维护者确认漏洞有效性与影响级别。  
2. **修复（Fix）**：制定并合入修复补丁，必要时准备缓解方案。  
3. **公告（Disclosure）**：修复发布后，通过以下渠道同步披露影响范围、修复版本与缓解建议。

### 公告渠道

- GitHub Security Advisories：`https://github.com/<OWNER>/<REPO>/security/advisories`
- GitHub Releases / Release Notes：`https://github.com/<OWNER>/<REPO>/releases`

## Important Notice

⚠️ **请勿将 0day 漏洞细节直接提交到公开 Issue / Discussion / PR。**  
公开披露可能导致漏洞在修复前被抢先利用。请优先使用私有渠道报告，待修复发布后再进行公开说明。
