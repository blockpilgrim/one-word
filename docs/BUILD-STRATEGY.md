# One Word — Build Strategy

## Purpose of This Document

This document captures the strategic technical decisions for One Word. It explains **why** we're making each choice, not **how** to implement them. The goal is to establish a foundation that serves two simultaneous objectives:

1. **A real, production-quality app** for App Store publication and eventual monetization
2. **A portfolio piece** ready to showcase (even as in-progress MVP) within one month

These constraints shape every decision below: we optimize for **development velocity** without sacrificing **production readiness** or **professional quality**.

---

## Tech Stack

### Mobile Framework: React Native + Expo (Managed Workflow)

**Choice:** Expo SDK with managed workflow, using EAS (Expo Application Services) for builds and deployments.

**Why:**
- Expo has evolved from "beginner-friendly wrapper" to the **de facto standard** for React Native development in 2025-2026. Roughly 94% of companies using cross-platform frameworks choose React Native, and Expo is now the recommended way to build RN apps.
- **No native code setup required**: Skip Xcode/Android Studio configuration entirely. EAS handles cloud builds.
- **Over-the-air updates**: Ship bug fixes and UI improvements without App Store review cycles—critical for rapid iteration.
- **RevenueCat compatibility**: The managed workflow fully supports in-app purchases through `react-native-purchases`.
- **Portfolio signal**: Demonstrates knowledge of modern mobile development practices. Expo is what hiring teams expect to see in 2026.

**Trade-offs:**
- Slightly larger bundle size than bare React Native (acceptable for this app type)
- Some exotic native modules require ejecting to bare workflow (none needed for One Word's feature set)

**References:** [Expo 2026 Guide](https://metadesignsolutions.com/expo-2026-the-best-way-to-build-cross-platform-apps/), [React Native Best Practices 2026](https://www.esparkinfo.com/blog/react-native-best-practices)

---

### Navigation: Expo Router

**Choice:** File-based routing with Expo Router (built on React Navigation).

**Why:**
- **Faster development**: File-system routing eliminates navigation boilerplate
- **Modern pattern**: Mirrors Next.js conventions—recognizable to reviewers and collaborators
- **Deep linking out of the box**: Notification tap → specific entry works automatically
- **Web-ready**: If we add a web version later, the routing structure transfers directly

**Trade-offs:**
- Learning curve if unfamiliar with file-based routing (minimal—pattern is intuitive)
- Slightly less flexibility than manual React Navigation setup (unnecessary for this app's simple nav structure)

---

### Styling: NativeWind (Tailwind CSS for React Native)

**Choice:** NativeWind v4/v5 for utility-first styling.

**Why:**
- **Development speed**: Utility classes eliminate context-switching between files. Style directly in JSX.
- **Design consistency**: Tailwind's constraint-based system prevents arbitrary values and enforces visual coherence
- **Dark mode support**: Built-in `dark:` variant selector works with `useColorScheme`
- **Portfolio signal**: Shows modern frontend sensibilities; Tailwind is the dominant styling paradigm in 2025-2026
- **TypeScript integration**: Full autocomplete for class names

**Trade-offs:**
- JSX can look cluttered with many classes (mitigated by component extraction for repeated patterns)
- Not 100% parity with web Tailwind (rare edge cases—none relevant to this app)

**References:** [NativeWind v5 Overview](https://www.nativewind.dev/v5), [NativeWind Best Practices](https://huyha.zone/blog/post/styling-react-native-nativewind-styled-components/)

---

### State Management: Zustand + TanStack Query

**Choice:** Zustand for client/UI state, TanStack Query for server state.

**Why:**

**Zustand** (client state: theme preferences, notification settings, UI state):
- **Minimal boilerplate**: No providers, no reducers, no actions. Create a store in 5 lines.
- **Tiny footprint**: ~1KB vs Redux's ~7KB+
- **React 18+ optimized**: Uses native `useSyncExternalStore` for better performance
- **Right-sized for this app**: One Word doesn't have complex client state that would benefit from Redux's ceremony

**TanStack Query** (server state: entries, comments, user data):
- **Caching and synchronization**: Automatic background refetching, stale-while-revalidate
- **Optimistic updates**: Comments appear instantly, sync in background
- **Offline support**: Cached data remains available when connection drops
- **Focus/reconnect handling**: Refetch when app returns to foreground or reconnects

**Why this combination over Redux:**
- Redux excels at complex client state with many interdependencies. One Word's state is simple: most "state" is actually server data (entries, comments), which TanStack Query handles better than Redux ever could.
- This pattern (Zustand + TanStack Query) is the **2025-2026 best practice** for apps of this scope.

**Trade-offs:**
- Two libraries instead of one (but they're complementary, not overlapping)
- Less familiar to teams who only know Redux (acceptable—both have excellent docs)

**References:** [Zustand vs Redux 2025](https://betterstack.com/community/guides/scaling-nodejs/zustand-vs-redux/), [TanStack Query React Native](https://tanstack.com/query/latest/docs/framework/react/react-native)

---

### Backend: Supabase

**Choice:** Supabase as Backend-as-a-Service (BaaS), using PostgreSQL with Row Level Security.

**Why:**
- **PostgreSQL foundation**: One Word has inherently relational data—entries belong to themes, comments belong to entries, users have history with entries. PostgreSQL handles this naturally with JOINs and foreign keys. Firebase's NoSQL would require denormalization and client-side joins.
- **Row Level Security (RLS)**: Fine-grained access control at the database level. Comments can be readable by anyone but writable only by the commenter. Entry history is private to each user. This security model is enforced in the database, not just the API.
- **Built-in auth**: Apple and Google sign-in work out of the box. Anonymous users get a device-scoped UUID.
- **Real-time subscriptions**: Comment threads can update live without polling (stretch goal, not MVP)
- **Edge Functions**: Custom backend logic (entry cycling, notification scheduling) in TypeScript/Deno
- **Predictable pricing**: Based on data stored, not read/write operations. No surprise bills.
- **No vendor lock-in**: PostgreSQL is open source. Data is exportable. Can self-host if needed.
- **Development speed**: Auto-generated REST and GraphQL APIs from database schema. Supabase Studio provides instant admin UI.

**Why not Firebase:**
- Firebase's NoSQL model is wrong for relational data. Representing "entries that belong to multiple themes, with comments from users who have viewing history" in Firestore requires denormalization that complicates every query.
- Firebase pricing scales with reads/writes—unpredictable for an app where users browse content.

**Why not custom Node.js/Express backend:**
- Adds weeks of development time for auth, database setup, API design, hosting
- For MVP timeline, BaaS is the right abstraction level
- Can migrate to custom backend later if needed (Supabase's PostgreSQL makes this easy)

**Trade-offs:**
- Less battle-tested than Firebase (acceptable—Supabase is production-ready and growing fast)
- Real-time is not as seamless as Firebase (sufficient for our needs; we don't need real-time for MVP)
- Dependent on Supabase's service (mitigated by open-source foundation and self-host option)

**References:** [Supabase vs Firebase 2025](https://zapier.com/blog/supabase-vs-firebase/), [Supabase vs Firebase Comparison](https://supabase.com/alternatives/supabase-vs-firebase)

---

### Push Notifications: Expo Push Notifications

**Choice:** Expo's push notification service, which abstracts FCM (Android) and APNs (iOS).

**Why:**
- **Simplest integration with Expo**: No native credential juggling during development
- **Unified API**: Send to both platforms with one request format
- **Sufficient for MVP**: Expo Push handles the complexity; we can migrate to direct FCM/APNs later if we need finer control
- **Scheduling support**: Server-side scheduling for user-configured delivery times

**Architecture:**
- Expo Push service handles delivery to FCM/APNs
- Supabase Edge Function scheduled via cron to determine which users receive notifications when
- Notification content pulled from entry data

**Trade-offs:**
- Requires Expo's servers for delivery (acceptable for our scale)
- Less advanced segmentation than dedicated services like OneSignal (unnecessary for our use case)
- Production apps still need APNs/FCM credentials configured in EAS (straightforward, just not zero-config)

**References:** [Expo Push Notifications Overview](https://docs.expo.dev/push-notifications/overview/), [Top Push Notification Services for Expo 2025](https://pushbase.dev/blog/top-5-push-notification-services-for-expo-react-native-in-2025)

---

### In-App Purchases: RevenueCat

**Choice:** RevenueCat SDK (`react-native-purchases`) for subscription management.

**Why:**
- **Industry standard**: De facto solution for React Native subscriptions. Battle-tested at scale.
- **Handles the hard parts**: Receipt validation, subscription status tracking, grace periods, refunds, cross-platform entitlements
- **Expo compatible**: Works with managed workflow via development builds
- **Free trial management**: App Store trial configuration + RevenueCat tracking = reliable trial-to-paid conversion
- **Analytics included**: LTV, churn, MRR dashboards without building them
- **Cross-platform entitlements**: If a user subscribes on iOS, they get access on Android too (future-proofing)
- **Web Billing support**: If we add web subscriptions later, RevenueCat handles it

**Architecture:**
- RevenueCat SDK on client handles purchase flow
- RevenueCat backend validates receipts with App Store/Play Store
- Supabase stores subscription status (synced via RevenueCat webhooks)
- App checks subscription status via RevenueCat SDK (cached locally, verified server-side)

**Trade-offs:**
- Another third-party dependency (acceptable—the alternative is implementing StoreKit/Google Play Billing directly, which is complex and error-prone)
- Cost at scale: free up to $2,500 MTR, then 1% (acceptable for our price point)

**References:** [RevenueCat React Native](https://www.revenuecat.com/docs/getting-started/installation/reactnative), [RevenueCat Expo Guide](https://www.revenuecat.com/docs/getting-started/installation/expo)

---

### Content Management: Supabase (Direct)

**Choice:** Manage content directly in Supabase, using Supabase Studio as admin interface.

**Why:**
- **No additional integration**: Content lives in the same database as user data
- **Immediate availability**: No separate CMS to set up, configure, or pay for
- **Supabase Studio**: Provides spreadsheet-like interface for editing entries—sufficient for solo content management
- **Full SQL power**: Complex queries for content organization (entries by theme, multi-theme entries, etc.)

**Why not Strapi/Sanity/Contentful:**
- Adds integration complexity for marginal benefit at this stage
- One Word's content structure is simple (entries with fields)—doesn't need rich CMS features
- Can migrate to headless CMS later if content team grows or needs change

**Future option:** If editorial workflow becomes complex, add Strapi as a layer that syncs to Supabase.

**Trade-offs:**
- No visual content editor (acceptable—entries are structured text, not rich layouts)
- No preview functionality (can build if needed)
- Admin UX is developer-focused (acceptable for solo creator)

**References:** [Best Mobile CMS Platforms 2025](https://strapi.io/blog/best-mobile-cms)

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CLIENT (React Native + Expo)                    │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │  Expo Router │  │  NativeWind  │  │   Zustand    │  │ TanStack     │    │
│  │  (Navigation)│  │  (Styling)   │  │ (UI State)   │  │ Query        │    │
│  └──────────────┘  └──────────────┘  └──────────────┘  │ (Server State)│   │
│                                                         └──────────────┘    │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                     expo-notifications                                │  │
│  │                     react-native-purchases (RevenueCat)               │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      │ HTTPS / WebSocket
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              SUPABASE                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │   Auth       │  │  Database    │  │  Edge        │  │  Storage     │    │
│  │   (OAuth)    │  │  (PostgreSQL)│  │  Functions   │  │  (if needed) │    │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘    │
│                           │                │                                 │
│                           │                │                                 │
│              Row Level Security    ┌───────┴───────┐                        │
│              (access control)      │               │                        │
│                                    │  Scheduled    │                        │
│                                    │  Notifications│                        │
│                                    │               │                        │
│                                    │  Entry        │                        │
│                                    │  Cycling      │                        │
│                                    │  Logic        │                        │
│                                    └───────────────┘                        │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         EXTERNAL SERVICES                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                       │
│  │  RevenueCat  │  │  Expo Push   │  │  App Store / │                       │
│  │  (Subs)      │  │  Service     │  │  Play Store  │                       │
│  └──────────────┘  └──────────────┘  └──────────────┘                       │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Data Flow Patterns

**Reading an Entry:**
1. App requests current entry via TanStack Query
2. Supabase returns entry based on user's theme + history (RLS enforces user can only see their own history)
3. Entry cached locally; stale-while-revalidate on next open

**Posting a Comment:**
1. User submits comment
2. Optimistic update: comment appears immediately in UI (Zustand local state or TanStack Query mutation)
3. Request sent to Supabase
4. If anon handle doesn't exist for this user+entry, Edge Function assigns next available number
5. Comment persisted, UI confirms

**Receiving a Notification:**
1. Scheduled Edge Function runs at configured times
2. Determines which users should receive notifications now (based on their preferences + timezone)
3. Sends to Expo Push service with entry preview
4. Expo delivers to FCM/APNs
5. User taps → deep link opens entry

---

## Data Architecture

### Core Models

```
┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│   themes    │       │   entries   │       │  comments   │
├─────────────┤       ├─────────────┤       ├─────────────┤
│ id (PK)     │◄──┐   │ id (PK)     │◄──────│ id (PK)     │
│ word        │   │   │ source_text │       │ entry_id(FK)│
│ description │   │   │ source_type │       │ user_id(FK) │
│ is_active   │   │   │ attribution │       │ body        │
│ created_at  │   │   │ interp...   │       │ upvotes     │
└─────────────┘   │   │ application │       │ created_at  │
                  │   │ rights_type │       └─────────────┘
                  │   │ created_at  │
                  │   └─────────────┘
                  │          │
                  │          │ M:N
                  │          ▼
                  │   ┌─────────────────┐
                  └───│ entry_themes    │
                      ├─────────────────┤
                      │ entry_id (FK)   │
                      │ theme_id (FK)   │
                      └─────────────────┘

┌─────────────┐       ┌─────────────────────┐       ┌─────────────────────┐
│   users     │       │ user_entry_history  │       │ entry_anon_handles  │
├─────────────┤       ├─────────────────────┤       ├─────────────────────┤
│ id (PK)     │◄──────│ id (PK)             │       │ id (PK)             │
│ install_id  │       │ user_id (FK)        │◄──────│ entry_id (FK)       │
│ auth_id     │       │ entry_id (FK)       │       │ user_id (FK)        │
│ timezone    │       │ delivered_at        │       │ anon_number         │
│ theme_id(FK)│       └─────────────────────┘       │ created_at          │
│ notif_freq  │                                     └─────────────────────┘
│ notif_time  │
│ sub_status  │       ┌─────────────┐
│ created_at  │       │   upvotes   │
└─────────────┘       ├─────────────┤
                      │ id (PK)     │
                      │ comment_id  │
                      │ user_id     │
                      │ created_at  │
                      └─────────────┘
```

### Key Relationships

- **Entry ↔ Theme**: Many-to-many (an entry can serve multiple themes; comments are shared)
- **User ↔ Entry History**: Many-to-many with timestamp (tracks when each entry was delivered to prevent premature repeats)
- **Entry ↔ Anon Handle ↔ User**: Assigns unique per-thread identifiers (Anon 1, Anon 2) that are consistent within a thread but not across threads

### Row Level Security Policies

| Table | Read | Write |
|-------|------|-------|
| `themes` | All authenticated | Admin only |
| `entries` | All authenticated | Admin only |
| `comments` | All authenticated | Own comments only |
| `user_entry_history` | Own records only | Own records only |
| `users` | Own record only | Own record only |
| `upvotes` | All authenticated | Subscribers only; own votes only |

---

## Key Decisions

### 1. Anonymous Commenting Without Authentication

**Context:** The product requires anonymous commenting with per-thread identifiers (Anon 7) that are readable but preserve privacy. Traditional auth (login to comment) would create friction that kills engagement.

**Decision:** Use device-scoped UUIDs as user identifiers. No sign-in required for commenting. Per-thread anon handles are generated server-side and stored in `entry_anon_handles`.

**Rationale:**
- Minimizes friction: user opens app, reads, comments—no account creation
- Per-thread handles make conversations readable without linking identity across threads
- Device UUID provides enough persistence for rate limiting and basic abuse prevention
- Optional sign-in (Apple/Google) enables cross-device sync without being required

**Trade-offs:**
- Harder to track repeat bad actors across devices (mitigated by content moderation)
- Users who reinstall app or switch devices lose comment history (acceptable for this use case)
- Rate limiting is device-based, not identity-based (sufficient for MVP)

**Moderation approach:**
- Rate limits (comments per hour/day per device)
- Report/flag mechanism
- Auto-hide after N reports
- Admin review queue in Supabase

---

### 2. Entry Cycling Logic Server-Side

**Context:** Users shouldn't see the same entry twice until 60-90 days have passed or the library is exhausted. This requires tracking per-user viewing history.

**Decision:** Entry selection happens server-side (Edge Function), not client-side.

**Rationale:**
- **Security**: Client can't manipulate which entries it sees
- **Consistency**: Same logic works across devices if user syncs
- **Simplicity**: All business logic in one place (Supabase), not split between client and server
- **Efficiency**: Database query with NOT IN (seen entries) is fast with proper indexing

**Algorithm:**
1. Get user's active theme
2. Get all entry IDs for that theme
3. Exclude entries seen in last 60 days
4. If no entries available, reset to entries seen longest ago
5. Select randomly from available pool
6. Record in `user_entry_history`

**Trade-offs:**
- Requires server call to get "today's entry" (vs. client having all entries locally)
- Slightly more complex than "just shuffle and iterate" (worth it for the recurrence feature)

---

### 3. Subscription State: RevenueCat as Source of Truth

**Context:** Need to track who's subscribed, who's in trial, who's free-tier. This affects feature access (notification frequency, commenting, upvoting).

**Decision:** RevenueCat is the source of truth for subscription status. Supabase mirrors this via webhooks for fast queries.

**Rationale:**
- RevenueCat handles the complexity of receipt validation, trial tracking, and cross-platform entitlements
- Webhooks keep Supabase in sync without polling
- RLS policies can use `users.sub_status` for feature gating
- Client SDK provides instant offline access to subscription status

**Trade-offs:**
- Two places where subscription state lives (mitigated by webhook sync)
- Webhook failures could cause temporary desync (RevenueCat retries; can add reconciliation job)

---

### 4. Timezone Handling: Store UTC, Convert Client-Side

**Context:** Notifications need to arrive at user's preferred local time. Users might travel.

**Decision:** Store times in UTC everywhere. Store user's timezone preference. Convert on display and when scheduling notifications.

**Rationale:**
- Standard practice for global apps
- Supabase/PostgreSQL handles UTC natively
- Notification scheduler queries for users where `current_utc_time = user_preferred_time_in_their_timezone`
- User can update timezone if they move (or we can detect via device)

**Trade-offs:**
- Timezone edge cases (DST transitions) require care in scheduling logic
- Users traveling temporarily might get notifications at "wrong" local time (acceptable; they can adjust)

---

### 5. No Separate CMS for MVP

**Context:** Need to manage 420+ entries. Options: dedicated headless CMS (Strapi, Sanity) vs. direct database management.

**Decision:** Manage content directly in Supabase using Supabase Studio. Build simple admin views if needed.

**Rationale:**
- One less integration to build and maintain
- Entries are structured data, not rich content layouts
- Solo creator workflow doesn't need collaborative editing features
- Can add CMS later if editorial needs grow

**Trade-offs:**
- No rich text editor (plain markdown or text fields)
- No content preview in context
- Developer-focused UX for content entry

---

## Testing Philosophy

### What We Test

**Critical paths that must not break:**
1. Entry display (content appears correctly)
2. Comment submission (comments save and appear)
3. Subscription checks (paywalled features stay paywalled)
4. Notification delivery (scheduled notifications fire)

**What gets unit tests:**
- Entry cycling logic
- Anon handle assignment
- Timezone conversions
- Subscription state evaluation

**What gets integration tests:**
- Auth flows (sign-in, sign-out)
- Comment CRUD with RLS
- Entry fetch with history exclusion
- RevenueCat webhook handling

### What We Don't Test (MVP)

- UI snapshot tests (high maintenance, low value at this stage)
- End-to-end tests (valuable but time-intensive; defer until post-launch)
- Visual regression (defer until design stabilizes)

### Testing Stack

- **Jest** for unit tests (default with Expo)
- **React Native Testing Library** for component tests
- **Supabase local dev** for integration tests against real database

### Testing Principles

1. **Test behavior, not implementation**: Does the user see the right entry? Not: Did the query use the right SQL.
2. **Test the happy path first**: Ensure core flows work before edge cases.
3. **Make it easy to write tests**: If tests are hard to write, we won't write them. Keep setup simple.

---

## Performance Considerations

### Optimizing for Perceived Speed

**Cold start:**
- Hermes engine (enabled by default in Expo SDK 52+) improves JS execution
- Avoid heavy computation on app launch
- Show cached entry immediately, refresh in background (stale-while-revalidate via TanStack Query)

**Navigation:**
- Expo Router uses lazy loading by default
- Preload likely-next screens (e.g., comment thread while reading entry)

**Images (if any):**
- Expo Image with caching
- Compress at upload time, not runtime

### Database Performance

**Indexes to create:**
- `user_entry_history(user_id, entry_id)` for cycling checks
- `user_entry_history(user_id, delivered_at)` for recency queries
- `comments(entry_id, created_at)` for thread loading
- `entry_themes(theme_id)` for entry-by-theme queries
- `users(notification_time, timezone)` for notification scheduling

**Query patterns:**
- Entry cycling: Single query with NOT IN subquery (indexed)
- Comment threads: Paginated, sorted by upvotes or date
- Notification scheduling: Batch query by time bucket

### Network Optimization

- TanStack Query caching reduces redundant fetches
- Offline support: cached entries remain readable
- Optimistic updates for comments (no waiting for round-trip)
- Background sync when connection restored

### Bundle Size

- NativeWind: Minimal runtime overhead (compile-time transform)
- Zustand: ~1KB
- TanStack Query: ~13KB (worth it for caching benefits)
- Tree shaking: Import only what we use from Supabase client

---

## Development Phases (High-Level)

Given the one-month constraint for portfolio readiness, prioritize in this order:

### Week 1-2: Core Loop
- Project setup (Expo, Supabase, basic navigation)
- Theme selection → Entry display
- Basic styling with NativeWind
- Seed database with sample entries

**Portfolio milestone:** App launches, user can select theme, read entries.

### Week 2-3: Engagement Features
- Anonymous commenting (with anon handles)
- Entry history / cycling logic
- Basic moderation (rate limits, flagging)
- Push notification setup

**Portfolio milestone:** Full read-and-engage loop works.

### Week 3-4: Monetization + Polish
- RevenueCat integration
- Subscription gating
- Free tier limitations
- UI polish, loading states, error handling

**Portfolio milestone:** App Store-ready. Subscription flow works.

### Post-Launch
- Upvoting
- Optional account sync
- Additional themes
- Analytics and monitoring

---

## What We're Optimizing For

| Priority | What | Why |
|----------|------|-----|
| 1 | **Development velocity** | One-month timeline demands fast iteration |
| 2 | **Production readiness** | This is a real app, not just a demo |
| 3 | **Code quality** | Portfolio piece must demonstrate competence |
| 4 | **Scalability** | Design for growth without over-engineering |

## What We're Accepting

| Accepted Trade-off | Why It's Acceptable |
|--------------------|---------------------|
| BaaS dependency (Supabase) | Saves weeks of backend development; can migrate later |
| Expo managed workflow constraints | Feature set doesn't require bare workflow |
| No dedicated CMS | Solo creator workflow doesn't need it yet |
| Limited test coverage at launch | Focus on critical paths; expand post-launch |
| Device-based identity for anon users | Sufficient for MVP; optional auth covers sync case |

---

## References

### React Native / Expo
- [React Native Best Practices 2026](https://www.esparkinfo.com/blog/react-native-best-practices)
- [Expo 2026 Guide](https://metadesignsolutions.com/expo-2026-the-best-way-to-build-cross-platform-apps/)
- [NativeWind Documentation](https://www.nativewind.dev/v5)

### Backend
- [Supabase vs Firebase 2025](https://zapier.com/blog/supabase-vs-firebase/)
- [Supabase Documentation](https://supabase.com/docs)

### State Management
- [Zustand vs Redux 2025](https://betterstack.com/community/guides/scaling-nodejs/zustand-vs-redux/)
- [TanStack Query React Native](https://tanstack.com/query/latest/docs/framework/react/react-native)

### Subscriptions
- [RevenueCat React Native](https://www.revenuecat.com/docs/getting-started/installation/reactnative)
- [RevenueCat Expo Guide](https://www.revenuecat.com/docs/getting-started/installation/expo)

### Push Notifications
- [Expo Push Notifications Overview](https://docs.expo.dev/push-notifications/overview/)

---

*Document created: January 2026*
*Purpose: Strategic guidance for One Word technical implementation*
