#!/usr/bin/env bash
set -euo pipefail

# deploy.sh — Claude Code adapter deployment script
# Run from the repo root: bash core/agent-config/claude-code/resources/deploy.sh
#
# Reads skill and rule content from .claude/skills/archui-spec/ (source of truth)
# and writes them to their correct destinations under .claude/skills/archui-spec/.
# This script is idempotent: re-running it overwrites files with canonical content.

SKILL_DIR=".claude/skills/archui-spec"
RULES_DIR="${SKILL_DIR}/rules"

echo "==> Creating destination directories..."
mkdir -p "${SKILL_DIR}"
mkdir -p "${RULES_DIR}/spec-format"
mkdir -p "${RULES_DIR}/uuid"
mkdir -p "${RULES_DIR}/validation"
mkdir -p "${RULES_DIR}/resources"
mkdir -p "${RULES_DIR}/commits"
mkdir -p "${RULES_DIR}/sync"
mkdir -p "${RULES_DIR}/context-loading"

# ---------------------------------------------------------------------------
echo "==> Writing ${SKILL_DIR}/SKILL.md ..."
cat > "${SKILL_DIR}/SKILL.md" << 'HEREDOC'
---
name: archui-spec
description: ArchUI architecture document modification workflow. Use when adding, changing, or removing ArchUI modules (README.md files with YAML frontmatter). Enforces filesystem rules, UUID management, and .archui/index.yaml sync.
user-invocable: true
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# ArchUI Spec Modification Workflow

This skill is the entry point for all ArchUI spec work. Load the rule documents below **on demand** based on what the task requires — do not load all of them upfront.

## Module Commands

Every module can expose executable commands. Commands are \`.md\` files located at:

\`\`\`
<module-path>/.archui/commands/<command-name>.md
\`\`\`

To discover what actions a module supports, list its \`.archui/commands/\` directory. Each file has a \`name\` (button label), \`description\` (what it does), and a body (skill instructions for the AI agent). When the user asks to run a command on a module, read the corresponding command file and follow its instructions.

---

## Rule Loading Guide

| Situation | Load |
|---|---|
| User mentions \`resources/\`, reports a bug, or asks to investigate code | [rules/resources/README.md](rules/resources/README.md) — **load first, before anything else** |
| Writing or editing any README.md or \`.archui/index.yaml\` | [rules/spec-format/README.md](rules/spec-format/README.md) |
| Creating a new module | [rules/uuid/README.md](rules/uuid/README.md) + [rules/spec-format/README.md](rules/spec-format/README.md) |
| After any spec change | [rules/validation/README.md](rules/validation/README.md) — mandatory, no exceptions |
| After resources/ code changes pass testing | [rules/sync/README.md](rules/sync/README.md) |
| Before or during a git commit | [rules/commits/README.md](rules/commits/README.md) |
| Reading any module to understand it or its dependencies | [rules/context-loading/README.md](rules/context-loading/README.md) — always read identity doc + .archui/index.yaml together |

---

## Workflow Steps

### Step 1 — Determine scope

Read the affected modules and their parent modules to understand current state:
- What modules are changing (added / renamed / moved / deleted)?
- What modules link TO or FROM the affected modules?
- Does the task involve \`resources/\`? → Load [rules/resources/README.md](rules/resources/README.md) immediately.

### Step 2 — Update README.md and .archui/index.yaml

Load [rules/spec-format/README.md](rules/spec-format/README.md) for the exact format rules.

### Step 3 — Generate UUIDs (new modules only)

Load [rules/uuid/README.md](rules/uuid/README.md) for generation and uniqueness rules.

### Step 4 — Validate (mandatory)

Load [rules/validation/README.md](rules/validation/README.md). Run the validator. Fix all errors before proceeding.

### Step 5 — Sync spec after resources changes

If the task involved resources/ code changes, load [rules/sync/README.md](rules/sync/README.md) and apply the sync workflow.

### Step 6 — Commit

Load [rules/commits/README.md](rules/commits/README.md). Spec and resources commits must be separate.

---

## Quick reference — relation vocabulary

| relation | meaning |
|---|---|
| \`depends-on\` | this module needs the other to function |
| \`implements\` | this module is a concrete implementation of the other |
| \`extends\` | this module builds on the other |
| \`references\` | informational reference |
| \`related-to\` | loosely related, no strict dependency |
HEREDOC

# ---------------------------------------------------------------------------
echo "==> Writing ${RULES_DIR}/spec-format/README.md ..."
cat > "${RULES_DIR}/spec-format/README.md" << 'HEREDOC'
# Spec File Format Rules

## Node types and identity documents

Every module folder contains exactly one typed identity document. The filename determines the node type:

| File | Node type | When to use |
|---|---|---|
| \`SPEC.md\` | Spec | An implementation specification with generated \`resources/\`. Must have exactly one HARNESS as a **direct** submodule; MEMORY submodule is optional (at most one). |
| \`HARNESS.md\` | Harness | Test harness for a SPEC. Exactly one link → direct parent SPEC. No other links permitted. |
| \`MEMORY.md\` | Memory | Persistent memory record. Links only to parent SPEC. Additional outbound links are a validation **warning** (not an error). |
| \`SKILL.md\` | Skill | Reusable skill or knowledge unit. No \`resources/\` typically. |
| \`README.md\` | Generic | Untyped fallback when no stronger type applies. |

**Precedence when multiple files exist:** \`SPEC.md\` > \`HARNESS.md\` > \`MEMORY.md\` > \`SKILL.md\` > \`README.md\`. Only the highest-priority file acts as the identity document.

## Identity document format

All identity document types share the same frontmatter schema. Only two fields are allowed:

\`\`\`yaml
---
name: Human-readable module name
description: One-sentence summary — always loaded into agent context, keep it sharp
---

Body markdown here.
\`\`\`

**Forbidden in identity documents:** \`uuid\`, \`submodules\`, \`links\`, \`layout\`, any other structural field. These belong in \`.archui/index.yaml\`, not frontmatter.

**Description must be a single, declarative, self-contained sentence.** Multi-paragraph or multi-sentence descriptions trigger a validation warning. Keep it sharp — it is always loaded into agent context.

## Default names for whitelisted hidden folders

When creating an identity document for a root-level whitelisted hidden folder, use these default names:

| Folder | Default \`name\` |
|---|---|
| \`.archui\` | ArchUI Settings |
| \`.claude\` | Claude Settings |
| \`.cursor\` | Cursor Settings |
| \`.github\` | GitHub Settings |
| \`.vscode\` | VS Code Settings |
| \`.aider\` | Aider Settings |
| \`.windsurf\` | Windsurf Settings |

**Body rules:**
- Natural language prose only
- No code snippets, scripts, config files — those belong in \`resources/\`
- Keep it as short as the concept allows

## .archui/index.yaml format

\`\`\`yaml
schema_version: 1          # REQUIRED
uuid: <stable 8-hex UUID — never change after creation>   # REQUIRED
submodules:                # folder-name → child uuid (must match actual subfolders)
  folder-name-a: <uuid-a>
  folder-name-b: <uuid-b>
links:
  - uuid: <target module UUID>
    relation: depends-on   # depends-on | implements | extends | references | related-to | custom
    description: Optional clarification
\`\`\`

**Rules:**
- \`schema_version\` and \`uuid\` are REQUIRED fields
- \`uuid\` is permanent — never change it, even on rename/move
- \`submodules\` is a **map** (\`folder-name → uuid\`), not an array
- \`submodules\` keys must match actual subfolders on disk (bidirectional)
- \`links\` targets are UUIDs, not paths

**HARNESS link structure** (exactly one link, no others permitted):
\`\`\`yaml
links:
  - uuid: <parent SPEC uuid>
    relation: implements
\`\`\`

**layout.yaml:** The CLI checks for this file's existence but does not validate its contents. Stale UUIDs in \`layout.yaml\` are silently ignored.

## Module design principles

**Split aggressively.** If a module covers more than one coherent concept, split it. Prefer many small focused modules over fewer large ones. Every split must be reversible — child modules together must fully reconstruct the parent's meaning.

## .archui/ data handling

**Use the CLI to query or modify \`.archui/\` data; do not load raw \`.archui/index.yaml\` files into context.** Use \`archui validate .\` to check consistency. Read \`.archui/index.yaml\` only when you need the exact UUID of a specific module and cannot get it another way.
HEREDOC

# ---------------------------------------------------------------------------
echo "==> Writing ${RULES_DIR}/uuid/README.md ..."
cat > "${RULES_DIR}/uuid/README.md" << 'HEREDOC'
# UUID Rules

## Format

8 lowercase hex characters. Examples: \`93ab33c4\`, \`7e3f1c9a\`.

**Never use full RFC 4122 UUIDs** (\`xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx\`).

## Generating

\`\`\`bash
openssl rand -hex 4
\`\`\`

## Before using a generated UUID

Check it is not already in any existing \`.archui/index.yaml\`:

\`\`\`bash
grep -r "<generated-uuid>" . --include="*.yaml"
\`\`\`

If found, generate a new one.

## Rules

- UUID is assigned at module creation — **never changes** after that (not on rename, move, or content edit)
- Never reuse UUIDs from deleted modules
- UUIDs must be unique across the entire project

## YAML quoting

Some valid 8-hex strings are misread by YAML parsers:
- \`785e2416\` → looks like scientific notation (785 × 10^2416)
- \`54534937\` → looks like an integer

**Always quote UUIDs that could be misread:**

\`\`\`yaml
uuid: "785e2416"   # quoted
\`\`\`

When in doubt, quote it.
HEREDOC

# ---------------------------------------------------------------------------
echo "==> Writing ${RULES_DIR}/validation/README.md ..."
cat > "${RULES_DIR}/validation/README.md" << 'HEREDOC'
# Validation Rules

## Mandatory after every change — no exceptions

\`\`\`bash
archui validate .
\`\`\`

## Reading output

- \`ERROR\` — blocking, fix all before proceeding
- \`WARN\` — advisory, acceptable but note them

## Common warnings

| Warning | Meaning | Fix |
|---|---|---|
| \`frontmatter/description-multiline\` | \`description\` field spans multiple sentences or lines | Rewrite as one concise, declarative sentence |
| \`links/memory-extra-links\` | MEMORY module has outbound links beyond its parent SPEC | Advisory only — remove extra links if possible |
| \`spec/multiple-memory\` | SPEC module has more than one MEMORY submodule | Keep at most one MEMORY submodule |

## Common errors

| Error code | Meaning | Fix |
|---|---|---|
| \`links/dangling-uuid\` | A link targets a UUID not found in the project | Remove the link or add the missing module |
| \`archui/undeclared-subfolder\` | A subfolder exists but is not in \`.archui/index.yaml\` submodules | Add it to the parent's submodules map |
| \`archui/submodule-not-found\` | submodules map references a folder or UUID that doesn't exist | Remove the entry or create the missing folder |
| \`frontmatter/missing-field\` | README.md is missing \`name\` or \`description\` | Add the missing field |
| \`archui/missing-file\` | \`.archui/index.yaml\` not found | Create it with at minimum \`schema_version: 1\` and a \`uuid\` |
| \`spec/missing-harness\` | SPEC module has no HARNESS submodule | Add a \`<name>-harness/\` subfolder with a \`HARNESS.md\` identity document |
| \`spec/multiple-harness\` | SPEC module has more than one HARNESS submodule | Keep exactly one HARNESS submodule |

## If validation fails

Return to the relevant step and fix. Never proceed past a failing validation.
HEREDOC

# ---------------------------------------------------------------------------
echo "==> Writing ${RULES_DIR}/resources/README.md ..."
cat > "${RULES_DIR}/resources/README.md" << 'HEREDOC'
# Resources Boundary Rules

## The Rule

**Never read or modify any \`resources/\` folder content unless the user explicitly says so.**

"Explicitly" means the user's message contains words like: fix, update, modify, change, implement, build, rebuild, generate — AND the target is clearly \`resources/\` code (not spec files).

## Before touching resources/

1. **Always analyze from spec level first.** Read the relevant module README.md files.
2. **Check if the spec is complete.** If a spec module is missing or incomplete, that may be the root cause — add/fix the spec before touching code.
3. **Only after spec analysis**, if resources/ code must be read or changed, confirm with the user or proceed only if the user has explicitly authorized it in this message.

## Allowed without asking

- Reading module README.md and \`.archui/index.yaml\` files
- Running the CLI validator
- Running \`git diff\` / \`git log\` to understand what changed

## Requires explicit user authorization

- Reading any file inside \`resources/\`
- Modifying any file inside \`resources/\`
- Running \`npm run build\` or any build command

## When the user reports a bug

1. Read the relevant spec modules' README.md first
2. Run \`archui validate .\` to check spec consistency
3. If spec is valid and complete → tell the user the issue is in resources/, ask if they want you to investigate there
4. If spec is incomplete → fix the spec first, then ask about resources
HEREDOC

# ---------------------------------------------------------------------------
echo "==> Writing ${RULES_DIR}/commits/README.md ..."
cat > "${RULES_DIR}/commits/README.md" << 'HEREDOC'
# Commit Discipline Rules

## Spec and resources must always be separate commits

| Commit type | Files it may touch | Message prefix |
|---|---|---|
| Spec | \`README.md\`, \`.archui/index.yaml\` only | \`spec:\` |
| Resources (web) | \`web-development-release/**/resources/**\` only | \`web:\` |
| Resources (iOS) | \`ios-development-release/**/resources/**\` only | \`ios:\` |
| Resources (Android) | \`android-development-release/**/resources/**\` only | \`android:\` |
| Resources (CLI) | \`cli/resources/**\` only | \`cli:\` |

**Mixed commits are not allowed.** If you find yourself staging both spec and resources files, split them into two separate commits before proceeding.

## How to check before committing

\`\`\`bash
git diff --cached --name-only
\`\`\`

If the output contains both README.md / \`.archui/index.yaml\` files AND files under \`resources/\`, unstage and split.

## Ordering

When both spec and resources need to change for the same feature:
- Spec commit first (defines the contract)
- Resources commit second (implements the contract)
HEREDOC

# ---------------------------------------------------------------------------
echo "==> Writing ${RULES_DIR}/sync/README.md ..."
cat > "${RULES_DIR}/sync/README.md" << 'HEREDOC'
# Spec ↔ Resources Sync Workflow

## When to use

After any \`resources/\` code change has passed acceptance testing, the corresponding ArchUI spec modules must be synchronized. This is a mandatory step — do not skip it.

## Workflow

1. **Check what changed**
   \`\`\`bash
   git diff HEAD~1 --name-only | grep resources/
   git log --oneline -5
   \`\`\`

2. **Find the smallest affected modules**
   Start from the innermost modules whose spec is affected by the change. Do not start from the root.

3. **Update from the bottom up**
   - Update the leaf module's README.md body and \`.archui/index.yaml\` (links/submodules) first
   - After each leaf, check its parent — if the parent's description or links no longer match, update it too
   - Continue upward until all affected ancestors are updated

4. **Delegate per platform to sub-agents**
   For platform-specific resources (e.g. \`web-development-release/\`, \`ios-development-release/\`), spawn a sub-agent scoped to that platform's module tree. The sub-agent starts from the smallest changed module and works upward.

5. **Run validation**
   \`\`\`bash
   archui validate .
   \`\`\`

## What "affected" means

A spec module is affected if:
- Its described behavior changed in resources/
- A new capability was added that isn't described
- An existing description references something that no longer exists
- Links to/from this module are now inaccurate

## Scope rule

Only update spec modules whose content is genuinely stale. Do not touch modules that aren't affected by the resources change.
HEREDOC

# ---------------------------------------------------------------------------
echo "==> Writing ${RULES_DIR}/context-loading/README.md ..."
cat > "${RULES_DIR}/context-loading/README.md" << 'HEREDOC'
# Module Context Loading

## Rule

When reading any module's identity document (\`README.md\`, \`SPEC.md\`, \`SKILL.md\`, \`HARNESS.md\`, \`MEMORY.md\`), you **must also read** \`.archui/index.yaml\` in the same directory. A module's context is not complete until both files have been read.

## Why

Identity documents contain only \`name\` and \`description\`. The structural half of a module — its \`uuid\`, \`submodules\` (child modules), and \`links\` (cross-module dependencies) — lives exclusively in \`.archui/index.yaml\`. Skipping it means you are missing:

- **uuid** — needed to identify this module in links from other modules
- **submodules** — the list of child modules this module contains
- **links** — what other modules this module depends on, implements, or extends

## When this applies

Every time you read a module to understand it, modify it, or reason about its relationships. There are no exceptions.

## Common violations

- Reading \`SPEC.md\` and starting to edit without checking what the module links to
- Answering "what does this module depend on?" from the identity document body alone
- Creating a new link without first reading \`index.yaml\` to check existing links
HEREDOC

# ---------------------------------------------------------------------------
echo "==> Writing ${SKILL_DIR}/commands/convert-project.md ..."
mkdir -p "${SKILL_DIR}/commands"
: "${REPO_ROOT:?REPO_ROOT env var must be set}"
cp "${REPO_ROOT}/core/agent-config/command-templates/resources/convert-project.md" \
   "${SKILL_DIR}/commands/convert-project.md"

# ---------------------------------------------------------------------------
echo "==> Writing .claude/skills/archui-docs/SKILL.md ..."
mkdir -p ".claude/skills/archui-docs"
cat > ".claude/skills/archui-docs/SKILL.md" << 'HEREDOC'
---
name: archui-docs
description: "ArchUI identity document authoring and reading skill. Use when creating, modifying, or reading any ArchUI identity document (SPEC.md, HARNESS.md, MEMORY.md, SKILL.md, README.md). Teaches document structure, quality standards, and efficient reading strategies."
user-invocable: false
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# ArchUI Identity Document Authoring & Reading

Load this skill when **creating, modifying, or reading** any ArchUI identity document (\`SPEC.md\`, \`HARNESS.md\`, \`MEMORY.md\`, \`SKILL.md\`, \`README.md\`). It teaches document structure, quality standards, and efficient reading strategies.

This skill complements \`archui-spec\` (structural workflow) — \`archui-spec\` covers *how to create/move/link modules*; this skill covers *how to write and read the prose inside them*.

---

## Quick Dispatch

| Task | Jump to |
|---|---|
| Creating or enriching a **SPEC.md** | [Writing SPEC.md](#writing-specmd) |
| Creating or enriching a **HARNESS.md** | [Writing HARNESS.md](#writing-harnessmd) |
| Creating or enriching a **MEMORY.md** | [Writing MEMORY.md](#writing-memorymd) |
| Creating or enriching a **README.md** | [Writing README.md](#writing-readmemd) |
| Writing a good \`description\` field | [Description Field](#description-field) |
| Reading a module you haven't seen before | [Reading Strategy](#reading-strategy) |
| Reading a large module tree | [Tree Scanning](#tree-scanning) |
| Checking documentation quality | [Quality Checklist](#quality-checklist) |

---

## Frontmatter Rules (all document types)

Every identity document uses the same frontmatter schema — **two fields only**:

\`\`\`yaml
---
name: Human-Readable Module Name
description: One declarative sentence describing the module's purpose.
---
\`\`\`

**Forbidden in frontmatter:** \`uuid\`, \`submodules\`, \`links\`, \`layout\`, or any other field.

### Description Field

The \`description\` is always loaded into agent context. It must be:

- **One sentence** — multi-sentence triggers a validation warning
- **Declarative** — states what the module *does*, not what it *contains*
- **Self-contained** — understandable without reading the body
- **Present tense** — "Validates filesystem structure" not "Will validate..."

| Quality | Example |
|---|---|
| Bad | "This is the CLI module." |
| Bad | "Contains index.ts, validate.ts, and init.ts." |
| Good | "Validates ArchUI filesystem structure and reports conformance errors after agent or human edits." |

---

## Writing SPEC.md

A SPEC defines an implementation specification — a module with \`resources/\` that implements something. Every SPEC must have exactly one HARNESS submodule.

### Required Sections

\`\`\`markdown
---
name: Module Name
description: One-sentence purpose statement.
---

## Overview

[What this module does, why it exists, what problem it solves — 2-4 sentences.
Must add information beyond the description field.]

## Design

[Key design decisions, constraints, architectural choices.
Describe the approach without reproducing source code.
Include state machines, data flow, or protocol descriptions if applicable.
3-6 sentences, or structured subsections for complex modules.]

## Sub-modules

[For each direct child in .archui/index.yaml submodules, one sentence
describing its role. Omit this section if no submodules exist.]

## Dependencies

[For each link in .archui/index.yaml links, one sentence explaining
the relationship. Omit this section if no links exist.]
\`\`\`

### Optional Sections (add when relevant)

- **Commands** — If the module exposes executable agent commands via \`.archui/commands/\`
- **Constraints** — Hard rules or invariants the implementation must respect
- **API** — Public interfaces, protocol definitions, or contract specifications

### SPEC Anti-Patterns

| Don't | Do |
|---|---|
| Reproduce source code in the body | Describe the design at an architectural level |
| List every file in \`resources/\` | Summarize the implementation approach |
| Write multi-page prose | Keep each section 3-6 sentences |
| Leave body empty (stub) | Always write at least Overview + Design |
| Write "TODO" or "See code" | Omit a section entirely rather than stub it |

---

## Writing HARNESS.md

A HARNESS is a test playbook for its parent SPEC. It has exactly one link (to the parent SPEC with \`relation: implements\`). No other links are permitted.

### Required Sections

\`\`\`markdown
---
name: Module Name Test Playbook
description: "Playbook for verifying that [parent module] correctly [key behavior summary]."
---

## Overview

[What this harness tests and how it verifies the parent SPEC — 2-3 sentences.]

## Playbook

### Group N: [Behavior being tested]

[init] Setup conditions — what must be true before the test.
[action] The action that triggers the behavior under test.
[eval] Observable outcomes that prove the behavior is correct.
[end] Cleanup or reset.
\`\`\`

### Harness Writing Rules

1. **Group structure**: Each test group targets one coherent behavior. Use \`[init]\`, \`[action]\`, \`[eval]\`, \`[end]\` markers for each step.
2. **Observable outcomes**: Every \`[eval]\` must describe something verifiable — a visible state, a measurable value, or a file on disk. Never write "it should work correctly."
3. **Independence**: Each group must be runnable independently. Do not assume prior groups have passed.
4. **Coverage**: Cover the happy path first, then edge cases. Every requirement in the parent SPEC should have at least one corresponding test group.
5. **No implementation details**: Describe *what to verify*, not *how to implement the test code*. The harness is a specification, not a test script.

### Harness Anti-Patterns

| Don't | Do |
|---|---|
| Write vague evals like "works as expected" | Describe specific observable outcomes |
| Couple groups so they must run in order | Make each group independent |
| Test implementation details | Test behavior described in the parent SPEC |
| Skip edge cases | Cover error handling and boundary conditions |

---

## Writing MEMORY.md

A MEMORY records accumulated knowledge and runtime observations for its parent SPEC. Links only to the parent SPEC. Additional outbound links are a warning.

### Required Sections

\`\`\`markdown
---
name: Module Name Memory
description: "Runtime memory and accumulated observations for the [parent module] module."
---

## Overview

[What accumulated knowledge this memory records — 2-3 sentences.]

## Observations

[Timestamped entries of runtime discoveries, bug patterns, performance notes,
or design trade-off learnings. Append-only — never delete observations.]
\`\`\`

### Memory Writing Rules

1. **Append-only**: New observations are added at the bottom. Never delete or rewrite existing entries.
2. **Timestamped**: Each observation should include a date or context marker.
3. **Actionable**: Observations should inform future decisions. "The BLE handshake times out after 30s under load" is useful; "tested BLE" is not.
4. **Scoped**: Only record observations relevant to the parent SPEC module. Cross-cutting observations belong in the parent module's memory.

---

## Writing README.md

A README is the generic fallback identity document — used when no stronger type (\`SPEC.md\`, \`HARNESS.md\`, \`MEMORY.md\`, \`SKILL.md\`) applies. Typically used for organizational grouping modules that have no \`resources/\`.

### Required Sections

\`\`\`markdown
---
name: Module Name
description: One-sentence purpose statement.
---

## Overview

[What this module represents, why it exists — 2-4 sentences.]

## Sub-modules

[For each direct child in .archui/index.yaml submodules, one sentence
describing its role. Omit if no submodules.]

## Dependencies

[For each link in .archui/index.yaml links, one sentence explaining
the relationship. Omit if no links.]
\`\`\`

### When to Promote README to SPEC

If a module with \`README.md\` gains a \`resources/\` directory, it should be promoted to \`SPEC.md\`:

1. Rename: \`git mv README.md SPEC.md\`
2. Preserve all frontmatter and body content
3. Create a harness submodule: \`<name>-harness/\` with \`HARNESS.md\`
4. The harness gets one link to the parent SPEC with \`relation: implements\`

---

## Progressive Disclosure Rules

### Table of Contents Trigger

If any identity document body exceeds **300 lines**, prepend a table of contents immediately after the frontmatter.

### Cross-Referencing

When one document needs information from another:

- **Do**: Write a 1-2 sentence summary + link to the authoritative source
- **Don't**: Copy content between documents

### Section Depth

- Limit heading depth to H3 (\`###\`) inside identity documents
- Use tables and lists instead of deeper nesting
- If a section needs H4 or deeper, it is a candidate for splitting into a submodule

---

## Content Quality Rules

1. **Third-person present tense**: "This module validates..." not "I will validate..."
2. **Every sentence adds information**: If a sentence only restates the module name, delete it
3. **No source code in identity documents**: Code belongs in \`resources/\`
4. **No file listings**: Do not enumerate files in \`resources/\`
5. **Omit rather than stub**: An absent section is better than "TODO" or "See code"
6. **Concise by default**: 3-6 sentences per section unless complexity demands more
7. **Consistent terminology**: Use terms from the parent module or core spec

---

## Reading Strategy

### Reading a Single Module

1. Read the identity document (\`SPEC.md\` / \`README.md\` / etc.)
2. Read \`.archui/index.yaml\` in the same directory — **always**, no exceptions
3. You now have: name, description, uuid, submodules list, links list, and body prose

### Reading a Module Tree

**Step 1 — Scan descriptions only**: Read the \`description\` field from each module's frontmatter.

**Step 2 — Select relevant modules**: Identify the 2-3 modules most relevant to your task.

**Step 3 — Read selected modules fully**: Only now read the full body.

### Tree Scanning

| What you need | What to read | Context cost |
|---|---|---|
| Module inventory | \`description\` fields only | ~1 line per module |
| Structure map | \`description\` + \`.archui/index.yaml\` | ~5 lines per module |
| Specific module detail | Full identity document + index.yaml | ~50-300 lines |
| Cross-module relationships | \`links\` from all index.yaml files | ~3 lines per link |

**Never read all identity documents fully at once.** Start narrow, expand as needed.

---

## Quality Checklist

- [ ] Frontmatter has exactly \`name\` and \`description\` — nothing else
- [ ] \`description\` is one declarative sentence in present tense
- [ ] Body has at minimum an \`## Overview\` section
- [ ] No source code, config snippets, or file listings in the body
- [ ] No "TODO", "TBD", or "See code" placeholders
- [ ] Cross-references use relative paths with section anchors
- [ ] If body exceeds 300 lines, a table of contents is present
- [ ] Every section adds information not implied by the module name
- [ ] Third-person present tense throughout
- [ ] HARNESS has \`[init]\`/\`[action]\`/\`[eval]\`/\`[end]\` structure in playbook groups
- [ ] MEMORY observations are timestamped and append-only
HEREDOC

echo "==> Deployment complete."
