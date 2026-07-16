# AGENTS.md

You **must not** run `npm run build`

Use Japanese for all human-facing reports and notes.

Write the following files in Japanese by default:

- `WORK_REPORT_<date>.md`
- research notes written by agents
- Codex final summaries
- progress reports and handoff notes

Keep raw technical outputs in their original language:

- command output
- compiler errors
- JS/CSS/Python exception messages
- package manager logs
- raw numerical output
- copied error messages

## Project overview

This repository contains two websites. One is the personal website for Prof. Kazuki yamamoto, and the other is the group website of which Prof. yamamoto organizes. 

The goal is to create the readable code of websites by using the Next.js and several web technologies. 

## Visual QA and Development Server Workflow

After editing the website, do not stop at a successful build. Always verify the actual rendered page in a browser-like environment.

The development server is managed by the user in the VS Code terminal and should remain running on port `3000`. Codex should not start a separate dev server with `npm run dev` unless the user explicitly asks for it. Use the existing server for visual checks.

Default URLs:

- Japanese pages: `http://localhost:3000/group/ja/...`
- English pages: `http://localhost:3000/group/...`



Important notes:

- Do not stop, restart, or replace the user-managed `localhost:3000` server unless the user explicitly asks.
- If `localhost:3000` is unreachable, report that first instead of starting a new server.
- Do not run `npm run build` command. Prefer using the existing user-managed dev server for visual checks, and avoid starting another server.
- This site uses the `/group` base path. Always include `/group` in verification URLs. For example, use `/group/ja/members`, not `/ja/members`.
