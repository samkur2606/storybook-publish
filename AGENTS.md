# Agent instructions

This public repository hosts the published PWA. Maintain the application in its source repository and follow the deployment workflow described in [README.md](README.md).

## GitHub access with Codex

- Prefer the configured GitHub MCP tools for GitHub operations.
- When GitHub MCP is unavailable or lacks the requested operation, use the authenticated GitHub CLI (`gh`) for the authorized task. Prefer the matching `gh` subcommand and use `gh api` when needed. Target the intended repository explicitly. Switching tools needs no separate approval.
- Honor permission denials, branch protections and sandbox controls with either tool. If a write has an uncertain outcome, check GitHub before retrying. If the CLI cannot complete the task, report the specific blocker.
- Perform GitHub writes only when authorized by the project owner. Use local `git` for working-tree operations.
