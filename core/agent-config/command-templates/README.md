---
name: Command Templates
description: Platform-agnostic command templates that encode reusable agent workflows — including project conversion and module decomposition — for deployment to each supported agent's command directory.
---

## Overview

Command templates are the canonical, platform-neutral definitions of executable agent workflows. Each template is a `.md` file containing a structured prompt that an AI agent can execute autonomously when invoked from the GUI or CLI.

Commands differ from skills: skills encode background knowledge and rules (always-on context), while commands encode specific tasks with clear start and end conditions.

## Template: convert-project

The `convert-project` command guides an agent through converting an existing software project into a valid ArchUI-compliant structure. It covers:

- **Module decomposition principles** — how to identify module boundaries, when to split vs. consolidate, naming conventions
- **README merge rule** — non-destructive handling of existing README files (create / prepend / patch / skip)
- **ArchUI file generation** — writing `index.yaml`, `layout.yaml`, and updating parent `submodules` maps
- **Link inference** — detecting cross-module dependencies from imports and package relationships
- **Resource archival** — moving every non-spec file into its owning module's `resources/` directory, refining decomposition when no suitable module exists
- **Validation loop** — running `archui validate` and fixing errors until zero ERRORs remain
- **Multi-agent submodule completion** — spawning parallel sub-agents (one per top-level module) to audit and fill in missing `submodules` entries in every `index.yaml`
- **Multi-agent link completion** — spawning parallel sub-agents (one per top-level module) to infer and fill in missing `links` entries in every `index.yaml` from source imports and prose references

## Deployment

Each agent adapter's `deploy.sh` copies the relevant templates to the agent's command directory:

| Agent | Destination |
|---|---|
| Claude Code | `.claude/skills/archui-spec/commands/convert-project.md` |
| Cursor | `.cursor/skills/archui-spec/commands/convert-project.md` |
| Codex | Referenced in `AGENTS.md` as an available command |
| Copilot | Referenced in `.github/copilot-instructions.md` as an available command |
