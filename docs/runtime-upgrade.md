# Node 24 security upgrade

Upgrade only the nested credit-card demo from CRA 2 to 5.0.1 with Dart Sass, Node 24 and a committed lockfile; add the missing CRA entry point.

## Versions and compatibility

Validated on Node.js **24.22.1**; package engines remain **24.x**. The provider controls its patched 24.x rollout. Use the pinned package manager **npm@11.19.1** and the committed credit-card-form/package-lock.json.

- node: 24.22.1
- engines: 24.x
- packageManager: npm@11.19.1
- react: 16.8.3
- react-dom: 16.8.3
- react-scripts: 5.0.1
- sass: 1.106.1

- Move only its world illustration inside src to satisfy CRA source-scope rules. Preserve other demos and Pages paths.
- Browser checks found pre-existing unguarded optional focus/blur callbacks in the nested demo.
- Browser validation exposed unguarded optional focus/blur callbacks; match the standalone demo’s existing guards.
- Desktop form interactions pass. Existing fixed desktop layout can overflow at narrow mobile widths; no responsive layout redesign is included.

## Validation evidence

Baseline source: `254d0008bfbca0ef11fb028f9380a363dc352058`. Baseline manifests/lockfiles and audits were captured; full baseline production builds were run for the three Next 14 migrations, not all legacy/service repositories. Upgraded service builds use non-production environment values. No production database or image migration was run.

The table retains failed attempts as well as later repairs. Phase names distinguish placeholder-environment checks from checks that require no service configuration. The machine-readable [validation evidence](security-upgrade-validation.json) includes the lockfile digest and latest audit counts. A passing build alone does not imply authenticated workflows have been exercised.

| Check | Command | Result |
| --- | --- | --- |
| final-test | `npm run test -- --passWithNoTests` | passed |
| final-build | `npm run build` | exit 1 |
| fixed-build | `npm run build` | passed |
| verified-build | `npm run build` | passed |
| guarded-input-build | `npm run build` | passed |

Browser smoke: **passed**. name input, card-number spacing, expiry input, CVV length and focus/blur; desktop and mobile screenshots.

## Vulnerability comparison

- Baseline full dependency audit: not captured.
- Current full dependency audit: 9 low, 29 moderate, 15 high, 0 critical.
- Current production dependency audit: 9 low, 29 moderate, 15 high, 0 critical.
- Remaining high/critical package names (full graph): @svgr/plugin-svgo, @svgr/webpack, css-select, node-forge, nth-check, postcss, react-scripts, rollup-plugin-terser, selfsigned, serialize-javascript, svgo, webpack-dev-middleware, webpack-dev-server, workbox-build, workbox-webpack-plugin.
- Remaining high/critical package names (production graph): @svgr/plugin-svgo, @svgr/webpack, css-select, node-forge, nth-check, postcss, react-scripts, rollup-plugin-terser, selfsigned, serialize-javascript, svgo, webpack-dev-middleware, webpack-dev-server, workbox-build, workbox-webpack-plugin.

Counts follow the repository's package-manager audit format and may count advisory paths differently across managers. For static CRA/Gatsby sites, a dependency marked production can still be a build tool; it is not evidence that a Node development server is deployed. Retained legacy-toolchain findings need follow-up, and must not be hidden with forced peer resolution or a react-scripts@0 replacement. Re-run the audits before merging because advisories change.

## Remaining acceptance gates

- Complete the checks on the final PR head and review a preview with isolated fixtures. Production promotion is a separate review step.

## Hosting, deployment and rollback

1. Review the PR and its checks. On Vercel, select **Node.js 24.x** in Project Settings and retain `engines.node: "24.x"`. Vercel selects the patch level; [runtime documentation](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions). Other hosts must use the committed .nvmrc/Node 24 Docker stages; Netlify reads the Node 24 build environment where configured.
2. Install with `npm ci` inside `credit-card-form/`, then run the checks above with test service values. Never test cron/reminder/bot writes with production tokens or databases.
3. After separate merge approval, build a new preview, verify public routes and fixture workflows, then separately approve production redeployment. Verify **the actual deployed Node 24 runtime** in provider logs/runtime metadata and exercise the application after rollout. This PR does not merge or promote production.
4. If rollout fails, restore the previous provider deployment/container image and revert this upgrade commit as needed. No application schema or saved-data migration is required. Preserve existing canvas documents, backups and databases. Returning to vulnerable versions is a temporary rollback and requires a replacement security fix.

## Ongoing maintenance

Dependabot is configured weekly for the applicable npm, GitHub Actions and Docker manifests. npm major-version updates are excluded so Next stays on the chosen major and Node typings stay on 24; Docker Node >=25 is excluded. Review minor/patch security PRs promptly. .nvmrc and CI's exact Node 24 patch also need refreshing when patched 24.x versions are released.

A repository administrator should enable **Dependency graph**, **Dependabot alerts**, **Dependabot security updates**, and **Grouped security updates** where available under Settings → Advanced Security / Code security. These account/repository settings were not changed by the source PR.

Migration references: [Next 15](https://nextjs.org/docs/app/guides/upgrading/version-15), [Next 16](https://nextjs.org/docs/app/guides/upgrading/version-16), [CRA deprecation](https://react.dev/blog/2025/02/14/sunsetting-create-react-app), [Node Sass end of life](https://sass-lang.com/blog/node-sass-is-end-of-life/).
