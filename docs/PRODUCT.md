# One Word — Product Specification

## Executive Summary

**One Word** is a mobile app that delivers curated passages, poems, quotations, and anecdotes based on a theme word chosen by the user. Users select a word representing an idea or value they want to focus on—such as "presence," "courage," or "gratitude"—and receive regular content tied to that theme. Each entry includes the source material plus interpretation and practical application guidance.

The concept is inspired by a New Year's resolution tradition where people choose a single word to represent their year. One Word takes this further by making the practice dynamic (users can change their word anytime) and supported (curated content reinforces the chosen intention rather than relying on willpower alone).

A comment thread accompanies each entry, allowing users to see reflections from others who received the same content—creating ambient community around shared intentions.

-----

## Origin and Rationale

### The "One Word" Tradition

Many people have adopted the practice of choosing a single word to guide their year—a more flexible alternative to traditional resolutions. Instead of specific goals that can be failed, a word acts as a compass: "What would 'courage' do here?" or "Am I living 'presence' today?"

The practice is compelling but often fades. Without reinforcement, the word becomes something you chose in January and forgot by March.

**One Word solves this by:**

1. **Providing regular reminders**: Curated content arrives on a user-configured schedule, keeping the intention alive
2. **Deepening understanding**: Multiple perspectives on the same theme reveal nuance and application
3. **Allowing flexibility**: Life changes. One Word lets users shift their focus as their needs evolve
4. **Creating community**: Seeing how others engage with the same theme provides connection and perspective

### Why This Format?

The daily meditation app format (proven by products like The Daily Stoic) works because it creates a small, consistent practice.

One Word builds on this by:

- Drawing from an eclectic range of sources (philosophers, poets, psychologists, historical figures)
- Personalizing the experience through user-selected themes
- Allowing content to serve multiple themes where appropriate
- Making frequency user-configurable
- Embracing repetition as a feature (deepening understanding through re-encounter)

### Why Digital-First?

- **Ship and iterate**: Learn what resonates from real users
- **Features books can't have**: Configurable themes, notification timing, social layer
- **Direct relationship**: Own the audience without intermediaries
- **Compounding value**: Comment threads improve the product over time

-----

## Target Audience

### Primary Audience

**People seeking intentional self-improvement without the weight of formal programs.**

Characteristics:

- Drawn to the idea of personal growth but resistant to rigid systems
- Prefer reflection over prescription
- Value wisdom traditions but aren't committed to any single philosophy
- Want to be more deliberate about how they spend their attention
- Likely the type to choose a "word of the year" or have tried similar practices

Demographics:

- Likely 25–50, though not exclusively
- Skews toward knowledge workers, creatives, and professionals
- Both secular and spiritual-but-not-religious
- Readers of self-improvement content who are wary of shallow self-help

### Where to Find Them

- Self-improvement and mindfulness communities (Reddit, Facebook groups)
- Podcast listeners (Ten Percent Happier, On Being, The Knowledge Project)
- Readers of authors like Ryan Holiday, Brené Brown, James Clear
- "Word of the year" communities and blog posts (large annual search volume in December/January)
- Journaling and reflection app users
- Substack readers in the personal development space

-----

## Content Strategy

### Structure

Each theme word has a library of curated entries. For MVP:

- **7 theme words** at launch
- **60 entries per theme** (420 total entries for MVP)
- **Entries cycle** after the library is exhausted, with a minimum 60-90 day gap before a user sees the same entry again

### Entry Format

Each entry contains:

1. **Source material**: A passage, poem, quotation, or historical anecdote relevant to the theme (length varies—from a single sentence to a short paragraph or poem)
2. **Interpretation/Commentary**: 150–300 words contextualizing the source, drawing out its meaning, and connecting it to the theme
3. **Practical application**: A closing thought, question, or suggested practice that helps the user apply the idea to their life
4. **Attribution**: Clear sourcing for the original material
5. **Thematic tags**: Metadata for content management (may also enable future features)

### Source Material

**Intentionally eclectic.** The curation spans:

- **Classical philosophy**: Stoics (Seneca, Marcus Aurelius, Epictetus), Buddhists, Montaigne, Aristotle
- **Poetry**: Mary Oliver, Rilke, Rumi, Wendell Berry, Emily Dickinson, David Whyte
- **Literature**: Excerpts from novels, essays, letters
- **Modern thinkers**: Psychologists, researchers, contemporary writers
- **Historical anecdotes**: Stories that illustrate the theme in action
- **Interviews and speeches**: Wisdom from practitioners, artists, leaders

The unifying thread is **your curatorial voice**, not a single tradition.

### MVP Theme Words (7)

| Theme | Core Idea |
|-------|-----------|
| **Presence** | Attention, awareness, being here now |
| **Connection** | Relationships, belonging, reaching out |
| **Clarity** | Clear thinking, cutting through noise, discernment |
| **Courage** | Facing fear, taking action, vulnerability |
| **Resilience** | Bouncing back, enduring difficulty, adaptation |
| **Patience** | Waiting well, trusting the process, long-term thinking |
| **Gratitude** | Appreciation, noticing abundance, reframing |

### Future Theme Words (Post-MVP)

To be added as content production allows:

- Simplicity
- Kindness
- Balance
- Boundaries
- Compassion
- Acceptance
- Consistency / Discipline
- Curiosity
- Stillness
- Joy
- Vitality
- Integrity
- Wonder
- Flow
- Depth
- Equanimity
- Solitude
- Craft
- Mastery

### Content Reuse Across Themes

Some passages naturally serve multiple themes. For example, a Seneca letter on facing difficulty might fit under "courage," "resilience," and "patience."

- Content **may** be tagged to multiple themes where genuinely appropriate
- This should be the exception, not a crutch—most entries should feel specific to their theme
- Comments are **shared** across themes for simplicity (if a passage appears under both "courage" and "resilience," comments from both audiences appear together)

### Voice and Tone

The interpretation/commentary should be:

- **Warm and conversational**, not academic
- **Grounded**, connecting wisdom to everyday life
- **Non-preachy**, offering perspective rather than prescription
- **Ecumenical**, respecting the diversity of sources without favoring any tradition
- **Concise**, respecting the user's time

Avoid:

- Academic jargon
- Moralistic or prescriptive tone
- Forced contemporary references
- Oversimplification that loses nuance

### Content Production Workflow

Claude serves as research partner and drafting collaborator. The human creator remains curator, editor, and voice.

**Workflow per entry:**

1. **Select source material**: Creator chooses, or asks Claude to surface candidates by theme
2. **Research context**: Claude provides background as needed
3. **Draft interpretation**: Claude writes first draft based on established voice
4. **Edit**: Creator rewrites, adjusts tone, adds perspective
5. **Draft application**: Claude proposes practical application, creator refines
6. **Review**: Read full entry as user would; polish for clarity and resonance
7. **Tag**: Assign theme(s) and metadata

-----

## V1 Feature Specification

### Core Features (MVP)

| Feature | Description | Priority |
|---------|-------------|----------|
| **Theme selection** | User chooses from available theme words | Essential |
| **Entry display** | Today's entry: source material, interpretation, practical application | Essential |
| **Mobile app** | React Native/Expo, iOS and Android | Essential |
| **Configurable notifications** | User sets frequency: daily, every other day, weekly, or monthly | Essential |
| **Notification timing** | User sets preferred time of day | Essential |
| **Comment threads** | Per-entry threads, upvoting | Essential |
| **User accounts** | Simple authentication (email or social auth) | Essential |
| **Theme switching** | Users can change their active theme at any time | Essential |

### User Experience Flow

1. **Onboarding**: User creates account, selects their first theme word from the available options
2. **Configure**: User sets notification frequency and preferred time
3. **Receive notification**: At configured time, user receives push notification with preview
4. **Open app**: Current entry displayed immediately
5. **Read**: Source material → Interpretation → Practical application
6. **Optionally engage**: View comment thread, read others' reflections
7. **Optionally contribute**: Add own comment, upvote others
8. **Close**: Done in 2–5 minutes

### Theme Selection UX

- Display all available themes with brief descriptions
- Allow browsing before committing
- No friction on switching—users can change anytime from settings or a persistent UI element
- Consider showing: how long user has been with current theme, number of entries seen
- No guilt mechanics or "are you sure?" friction—keep it light

### Notification Design

**Frequency options:**
- Daily
- Every other day
- Weekly
- Monthly

**Notification content:**
- App name
- Brief hook or first line of source material
- Example: "One Word: 'The obstacle is the way.' — Marcus Aurelius"

**Timing:**
- User-configurable time of day
- Default: 8:00 AM local time

### Entry Display

- Source material prominently displayed (visually distinct, possibly different typography)
- Clear attribution
- Interpretation follows
- Practical application as closing element
- Comment thread accessible below (collapsed or separate tab—to be determined in design)

### Comment Thread Design

- Displayed below or adjacent to entry content
- Sorted by: Top (upvotes) by default, option for Recent
- Shows: comment text, author username, date, upvote count
- Comments shared across themes (if entry serves multiple themes)
- No replies/nesting in V1
- Moderation: flag/report mechanism, admin can remove

### Account Features

- Username (displayed on comments)
- Email (for account recovery)
- Timezone (for notification timing)
- Active theme word
- Notification preferences (frequency, time of day)
- Option to remain anonymous on comments

-----

## Deferred Features (V2+)

| Feature | Description | Rationale for Deferral |
|---------|-------------|------------------------|
| **Web version** | Browser-based access | Focus on mobile-first; add if demand warrants |
| **Widgets** | Home screen widget with current theme/quote | Adds complexity; validate core first |
| **Archive/browse** | Access to all entries in user's theme | May reduce urgency of daily practice; evaluate later |
| **Journaling** | Private notes attached to entries | Adds scope; could be V1.5 if demand is clear |
| **AI "go deeper"** | Claude-powered exploration of entries | Valuable but not essential to core loop |
| **Theme history** | View past themes and entries seen | Nice-to-have; adds complexity |
| **Streaks/gamification** | Track consecutive engagement | Risk of feeling punitive; add carefully if at all |
| **Audio narration** | Listen to entries | Adds production overhead |
| **Additional themes** | Expand beyond initial 7 | Post-launch priority based on demand and content production capacity |

-----

## Technical Requirements (High-Level)

*Detailed technical planning to be done separately.*

### Platform

- **Mobile**: React Native with Expo (iOS and Android)
- **Backend**: Node.js or Python (builder's preference)
- **Database**: PostgreSQL
- **Authentication**: Email/password + OAuth (Google, Apple)
- **Push notifications**: Expo Push Notifications or Firebase Cloud Messaging
- **Hosting**: AWS, Railway, Render, or similar for backend; managed Postgres

### Data Model (Conceptual)

**Entries**
- id, content_text, content_type (passage/poem/quote/anecdote), attribution, interpretation, practical_application, themes[] (array of theme IDs), created_at, updated_at

**Themes**
- id, word, description, active (boolean for MVP availability), created_at

**Users**
- id, email, username, timezone, active_theme_id, notification_frequency, notification_time, created_at

**User_Entry_History**
- id, user_id, entry_id, delivered_at (tracks which entries a user has seen and when, for cycling logic)

**Comments**
- id, entry_id, user_id, body, upvote_count, created_at

**Upvotes**
- id, comment_id, user_id, created_at

### Key Technical Considerations

- **Entry cycling logic**: Track which entries each user has seen; don't repeat until 60-90 days have passed or library exhausted
- **Multi-theme entries**: Entries can belong to multiple themes; comments are shared
- **Timezone handling**: Notifications and "current entry" must respect user's local timezone
- **Notification scheduling**: Support for daily, every-other-day, weekly, monthly cadences
- **Content management**: Admin interface or headless CMS for authoring entries
- **Comment moderation**: Flag/report system, admin removal capability

-----

## Launch Strategy

### Phase 1: Content Foundation (Weeks 1–6)

- Establish voice by writing 15–20 complete entries across themes
- Build passage/source database organized by theme
- Refine production workflow with Claude
- Complete 60 entries for each of 7 themes (420 total)

### Phase 2: Technical Build (Weeks 4–10, overlapping)

- Build mobile app (React Native/Expo)
- Implement core features (theme selection, entry display, auth, comments, notifications)
- Build admin interface for content management
- Set up backend and database

### Phase 3: Private Beta (Weeks 10–12)

- Invite 50–100 beta users
- Gather feedback on content, UX, and notification experience
- Seed comment threads with quality reflections
- Identify bugs and friction points
- Iterate on product and content

### Phase 4: Public Launch (Week 14+)

- App store submission (iOS and Android)
- Launch marketing focused on identified communities
- Consider timing around New Year (peak "word of the year" interest)
- Begin content production for additional themes

-----

## Success Metrics

### North Star

**Weekly Active Users engaging with entries**

(Not daily, since notification frequency is configurable)

### Supporting Metrics

| Metric | What It Indicates |
|--------|-------------------|
| **Retention (D7/D30/D90)** | Is the practice sticky? |
| **Notification open rate** | Are notifications compelling? |
| **Entries read to completion** | Is content resonating? |
| **Theme switching frequency** | Are users exploring or churning? |
| **Comment rate** | Is social layer adding value? |
| **Time spent per session** | Are people reading fully? |

### Anti-Metrics

- Time spent beyond 5–10 minutes (not an engagement trap)
- Notification volume (respect attention)
- Theme switching penalization (flexibility is a feature)

-----

## Naming and Brand

**Product name**: One Word

**Rationale:**
- Describes the core mechanic directly
- Clean, memorable, easy to say
- Works well for App Store discovery ("one word app," "word of the year app")
- Scales if format expands

**Potential tagline**: "Choose your word. Let it guide you."

**Alternative taglines:**
- "Wisdom for the word you're living"
- "One word. Daily wisdom."
- "Your intention, reinforced"

-----

## Open Questions

1. **Monetization model**: Free with premium features? Subscription? One-time purchase? (Can defer past MVP launch)

2. **Onboarding flow**: How much explanation does the concept need? Should users see sample entries before choosing a theme?

3. **Theme descriptions**: How much guidance to provide when users are choosing? Brief tagline vs. detailed explanation?

4. **Entry length variability**: Some sources are one sentence, others are paragraphs. How to handle visual consistency?

5. **Seasonal timing**: Launch around New Year to capitalize on "word of the year" interest, or launch whenever ready?

6. **Anonymous commenting**: Allow fully anonymous, require username, or let users choose per-comment?

7. **Content licensing**: Verify rights for any modern sources (poems, recent authors)

-----

## Appendix: Content Production Estimates

**MVP scope:**
- 7 themes × 60 entries = 420 entries
- Estimated production rate: 3–5 entries per focused hour (with Claude assistance)
- Estimated total production time: 85–140 hours of focused work
- At 15 hours/week: approximately 6–10 weeks

**Post-MVP expansion:**
- Each additional theme requires 60 entries
- Can prioritize based on user demand and production capacity

-----

## Document History

- **Created**: January 2026
- **Purpose**: Standalone document to inform technical and implementation planning
