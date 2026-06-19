# AGENTS.md

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

Post-edit verification workflow:

1. Run `npm run build` when appropriate and confirm that the build succeeds.
2. Check that the target page returns `200 OK` from the user-managed server at `http://localhost:3000`.
3. Use Playwright or an equivalent browser-based tool to capture screenshots of the edited pages.
4. Check desktop views, and mobile views when the change affects layout or responsive behavior.
5. Inspect the rendered page for broken images, incorrect text, broken links, language issues, layout overflow, spacing problems, and leftover placeholder content.
6. In the final report, include the verified URLs, screenshot paths, and any remaining visual or behavioral issues.

Important notes:

- Do not stop, restart, or replace the user-managed `localhost:3000` server unless the user explicitly asks.
- If `localhost:3000` is unreachable, report that first instead of starting a new server.
- Running `npm run build` while a dev server is active can cause `.next` cache conflicts. Prefer using the existing user-managed dev server for visual checks, and avoid starting another server.
- This site uses the `/group` base path. Always include `/group` in verification URLs. For example, use `/group/ja/members`, not `/ja/members`.

## End report

At the end of each session:

Create a `WORK_REPORT/WORK_REPORT_<date>_<time>.md` with:

   - completed work
   - tests or checks performed
   - remaining tasks
   - next actions

where `<date>` and `<time>` are the current date and time.

