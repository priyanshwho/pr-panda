# PR Panda — Full Feature Implementation Plan

## Summary of What We're Building

| Phase | Scope | Status |
| :--- | :--- | :--- |
| **Phase 1** | Performance (loading skeletons, parallel queries) + UI Redesign (warm colors, spacing) | **COMPLETED** |
| **Phase 2** | AI Assistant (Groq, saved history, sidebar panel) | **COMPLETED** |
| **Phase 3** | 10 Minor Features | **COMPLETED** |
| **Phase 4** | Major Features 5.8 (Re-review), 5.1 (Diff Viewer), 5.2 (History) | **TODO** |
| **Phase 5** | Major Features 5.9 (Codebase Q&A), 5.10 (Analytics) | **TODO** |
| **Phase 6** | Major Features 5.3 (Teams) to 5.7 (Notifications) | **TODO** |

### Decisions Captured
- **AI Provider**: Groq (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)
- **AI Model**: `llama-3.3-70b-versatile` (Groq free tier, very fast)
- **Chat Persistence**: Yes — saved to DB, recent chats shown in sidebar

---

## Part 1 — AI Assistant

### Architecture
- [x] `features/ai-assistant/components/ai-panel.tsx` (Framer Motion slide-in sheet, full chat UI)
- [x] `features/ai-assistant/components/ai-trigger.tsx` (Integrated directly inside `dashboard-nav.tsx`)
- [x] `features/ai-assistant/components/chat-message.tsx` (User / assistant message bubble)
- [x] `features/ai-assistant/components/chat-input.tsx` (Integrated directly inside `ai-panel.tsx`)
- [x] `features/ai-assistant/components/recent-chats.tsx` (History listing inside `ai-panel.tsx`)
- [x] `features/ai-assistant/server/build-context.ts` (Assembles system prompt context from live DB data)
- [x] `features/ai-assistant/server/save-message.ts` (Implemented in `conversations.ts`)
- [x] `features/ai-assistant/server/get-conversations.ts` (Implemented in `conversations.ts`)
- [x] `features/ai-assistant/hooks/use-assistant.ts` (Handled via `@ai-sdk/react`'s `useChat`)
- [x] `app/api/ai/chat/route.ts` (Streaming POST with Groq, context injection)

### System Prompt Context
The assistant is configured to know:
- [x] GitHub installation status & account login
- [x] All repositories (name, sync status, default branch, vector chunk count)
- [x] Pull request summary (total, reviewed, pending, processing)
- [x] Recent activity feed with user timestamps
- [x] Subscription plan & monthly usage limit remaining
- [x] Which dashboard page the user is currently viewing

### Prisma Schema Additions
- [x] `model AiConversation`
- [x] `model AiMessage`

### Sidebar Changes
- [x] New "AI Assistant" item below Settings in nav with a Robot phosphor icon + pulsing amber notification dot.
- [x] When clicked, opens the `AiPanel` slide-over sheet from the right.
- [x] Recent chats loaded dynamically in the history panel of the AI sheet.

---

## Part 2 — Performance

### 2a — loading.tsx Skeletons (Instant Perceived Navigation)
- [x] `app/(protected)/dashboard/loading.tsx`
- [x] `app/(protected)/dashboard/repos/loading.tsx`
- [x] `app/(protected)/dashboard/pull-requests/loading.tsx`
- [x] `app/(protected)/dashboard/github/loading.tsx`
- [x] `app/(protected)/dashboard/settings/loading.tsx`

### 2b — Parallel Data Fetching
- [x] `features/overview/server/get-overview.ts` (queries wrapped in `Promise.all`)

### 2c — Layout Auth Caching
- [x] `layout.tsx` (cache `requireAuth` calls)

---

## Part 3 — UI Redesign (Warm Aesthetic)

### Color Palette Changes
- [x] `app/globals.css` (Warm off-white background, cream sidebar, warm sand borders, warm terracotta primary)

### Spacing
- [x] Page padding: `p-6` → `p-8 lg:p-10`
- [x] Card gap: `space-y-4` → `space-y-6`
- [x] Sidebar nav: more vertical padding per item
- [x] Sidebar header: warm gradient strip behind logo
- [x] Active nav: warm amber left-border accent
- [x] Cards: subtle warm box-shadow

---

## Part 4 — Minor Features (10)
- [x] **[4.1] Usage Warning Badge**: Yellow badge on Settings nav item when usage $\ge$ 80% of monthly limit.
- [x] **[4.2] Pull Requests Filter Chips**: Pill buttons on pull-requests page to filter list by status client-side.
- [x] **[4.3] Review Copy Button**: One-click clipboard copy button on generated reviews with a toast notification.
- [x] **[4.4] PR Age Indicator**: Color-coded age pill on PR list rows (Green $<1$d, Yellow $1$-$3$d, Red $>3$d).
- [x] **[4.5] Keyboard Shortcuts**: Shortcuts hook (`G`+`O` overview, `G`+`R` repos, etc.) + help modal.
- [x] **[4.6] Empty States**: Illustrated zero-data states with inline clean SVG graphics.
- [x] **[4.7] Repos "Sync Now" Button**: Button on repo list to trigger manual vector database re-sync.
- [x] **[4.8] Sidebar Theme Toggle**: Sun/moon quick theme toggle in sidebar footer next to profile button.
- [x] **[4.9] Overview Stats (Avg Time)**: Calculate and display average review duration on overview page.
- [x] **[4.10] Overview Stats (Active Repo)**: Show a highlight badge on the repository with most reviews this month.

---

## Part 5 — Major Features (10)
- [ ] **[5.1] PR Review Diff Viewer**: Split-screen view of file diff alongside AI review comments.
- [x] **[5.2] Review History Timeline**: Paginated, filterable timeline of all historical code reviews.
- [ ] **[5.3] Teams & Organization Support**: Shared billing and installations, admin seat management.
- [ ] **[5.4] Webhook Activity Log**: Debug log page showing received webhooks and review actions.
- [ ] **[5.5] Custom Prompt Review Rules**: Per-repo instruction prompt overrides.
- [ ] **[5.6] Review Rating collector**: thumbs up/down feedback widget on AI comments.
- [ ] **[5.7] Multi-Channel Notifications**: Slack webhook integrations + Resend transaction emails.
- [x] **[5.8] PR Re-review trigger**: Manual trigger to re-review latest head commit.
- [ ] **[5.9] Codebase Q&A (RAG)**: Chat query search over vector embeddings.
- [ ] **[5.10] Review Analytics**: Visual dashboards showing metrics over time (Recharts).
