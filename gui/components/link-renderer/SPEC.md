---
name: Link Renderer
description: "Renders directional edges between sibling module cards on the canvas. Cross-hierarchy links are not drawn; they are surfaced in the detail panel only."
---

## Overview

The link-renderer draws directed edges between module cards at the current canvas level. Only **sibling-to-sibling** edges are drawn — both the source card and the target card must be direct children of the current canvas module.

Cross-hierarchy links (where the target is outside the current level) are intentionally omitted from the canvas. They are fully accessible in the detail panel's **LINK TO** and **LINKED BY** sections when a card is selected.

## Edge Resolution

For each module card at the current level, its `links` array is scanned:

- If the link's target UUID is a sibling (also a child of the current module), draw an edge from the source card to the target card.
- If the link's target UUID is outside the current level, **do not draw an edge**. The link is still present in the data model and visible in the detail panel.

## Port Handles

Each card exposes:

- A **module-level target handle** (◀, left edge) — receives edges from siblings that link to this module.
- A **module-level source handle** (▶, right edge) — emits edges to siblings this module links to.
- **Per-link source port handles** (▶, right edge, one per `links` entry) — allows edges to originate from a specific link row, enabling visual disambiguation when a card has multiple outgoing links.

## Arrow Direction

Every edge has a directional arrowhead pointing toward the **target** (the module being linked TO).

## Same-Level Rendering Rule

When a link points to a module outside the current level, no edge and no stub card is rendered. The user navigates to the appropriate level to see both endpoints as sibling cards, at which point the edge becomes visible.

## Edge Styling

Each edge is styled by its `relation` value — stroke weight, dash pattern, and color vary by relation type. The `relation` value appears as a label pill at the midpoint of the edge. The `description` field appears as a hover tooltip. Full styling reference is in `resources/edge-reference.md`.

## Design System

All visual properties — color, typography, spacing, and elevation — must use semantic tokens from the Design System (`gui/design-system/`). Do not use raw hex, pixel, or opacity values in implementations.
