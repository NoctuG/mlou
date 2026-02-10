# Security Policy

## Supported Versions

This repository tracks a single live branch. Security fixes are applied on `main` and shipped through regular dependency updates.

| Branch | Supported |
| --- | --- |
| `main` | ✅ |

## Dependency Security Baseline

- Runtime dependencies in `package.json` are pinned to exact versions to reduce surprise upgrades.
- High-risk Hexo ecosystem packages are explicitly monitored first: `hexo-server`, renderers (`hexo-renderer-*`), and theme packages (currently `hexo-theme-redefine`).
- CI enforces production dependency audit checks with a **high** severity failure threshold (`npm audit --omit=dev --audit-level=high`).

## Upgrade Cadence

To avoid large, risky batch upgrades:

1. **Monthly light update window**
   - Run high-risk package checks (`npm run deps:check:risk`).
   - Apply patch/minor updates where safe.
   - Run smoke regression (`npm run clean && npm run build`).

2. **Quarterly deep update window**
   - Review all runtime dependencies.
   - Revalidate lockfile and audit posture.
   - Perform broader regression checks on generated site output.

The GitHub Actions workflow `.github/workflows/dependency-security.yml` schedules both monthly and quarterly runs.

## Reporting a Vulnerability

If you discover a vulnerability, please open a private security report through your Git hosting platform (or contact the maintainer directly if private reporting is unavailable) with:

- affected dependency/package and version
- impact assessment (what can be exploited)
- proof of concept or reproduction steps
- suggested mitigation or upgrade path

Acknowledgement target: within 3 business days.
