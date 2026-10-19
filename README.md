# vitest: `--exclude` is lost for inline projects

Minimal reproduction: two empty tests, `a.test.ts` and `a.integration.test.ts`, and six configs. Every command
excludes the integration file with `--exclude`.

```sh
pnpm install
for c in a b c d e f; do echo "== $c"; pnpm exec vitest list --filesOnly --config $c.config.ts --exclude '**/*.integration.test.*'; done
```

Output with vitest 5.0.5:

| Config | Setup | Listed | Excluded? |
|---|---|---|---|
| `a` | no projects | `a.test.ts` | yes |
| `b` | two inline projects, `unit` sets its own `exclude` | `[unit] a.integration.test.ts`, `[unit] a.test.ts`, `[other] a.test.ts` | no, in `unit` |
| `c` | one inline project, no `exclude` anywhere | `[only] a.test.ts` | yes |
| `d` | root `exclude`, no projects | `a.test.ts` | yes |
| `e` | one inline project with its own `exclude` | `[unit] a.integration.test.ts`, `[unit] a.test.ts` | no |
| `f` | root `exclude`, one inline project without one | `[only] a.integration.test.ts`, `[only] a.test.ts` | no |

Expected: `a.integration.test.ts` is excluded in every case.
