# One Word — Code Conventions

This document captures the coding patterns and conventions for the One Word codebase. Follow these patterns to maintain consistency. Update this document when new patterns emerge or existing ones prove problematic.

---

## Table of Contents

1. [File & Folder Structure](#file--folder-structure)
2. [Naming Conventions](#naming-conventions)
3. [Component Patterns](#component-patterns)
4. [State Management](#state-management)
5. [Styling (NativeWind)](#styling-nativewind)
6. [Data Fetching](#data-fetching)
7. [Type Definitions](#type-definitions)
8. [Error Handling](#error-handling)
9. [Testing](#testing)
10. [Anti-Patterns](#anti-patterns)

---

## File & Folder Structure

```
one-word/
├── app/                    # Expo Router screens (file-based routing)
│   ├── (tabs)/             # Tab navigator group
│   │   ├── _layout.tsx     # Tab layout configuration
│   │   ├── index.tsx       # Home tab (entry display)
│   │   └── settings.tsx    # Settings tab
│   ├── _layout.tsx         # Root layout (providers, global config)
│   ├── index.tsx           # App entry / onboarding redirect
│   ├── onboarding.tsx      # Onboarding flow
│   └── theme-selection.tsx # Theme selection screen
│
├── components/             # Reusable UI components
│   ├── ui/                 # Generic UI primitives
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Input.tsx
│   ├── entry/              # Entry-related components
│   │   ├── EntryCard.tsx
│   │   ├── EntrySource.tsx
│   │   └── EntryInterpretation.tsx
│   ├── comments/           # Comment-related components
│   │   ├── CommentThread.tsx
│   │   ├── CommentItem.tsx
│   │   └── CommentInput.tsx
│   └── theme/              # Theme selection components
│       ├── ThemeGrid.tsx
│       └── ThemeChip.tsx
│
├── hooks/                  # Custom React hooks
│   ├── useEntry.ts         # Fetch current entry
│   ├── useComments.ts      # Fetch/post comments
│   ├── useTheme.ts         # Theme selection state
│   └── useSubscription.ts  # RevenueCat subscription hooks
│
├── stores/                 # Zustand stores (client state)
│   ├── themeStore.ts       # Active theme, theme history
│   ├── uiStore.ts          # UI state (modals, loading, sheets)
│   └── notificationStore.ts # Notification preferences
│
├── lib/                    # Core utilities and clients
│   ├── supabase.ts         # Supabase client initialization
│   ├── queryClient.ts      # TanStack Query client config
│   └── revenueCat.ts       # RevenueCat initialization
│
├── utils/                  # Pure utility functions
│   ├── formatting.ts       # Text/date formatting helpers
│   ├── validation.ts       # Input validation
│   └── timezone.ts         # Timezone conversion utilities
│
├── constants/              # App-wide constants
│   ├── themes.ts           # Theme word definitions
│   ├── queryKeys.ts        # TanStack Query key constants
│   └── config.ts           # App configuration constants
│
├── types/                  # TypeScript type definitions
│   ├── database.ts         # Supabase-generated types
│   ├── entry.ts            # Entry-related types
│   ├── comment.ts          # Comment-related types
│   ├── user.ts             # User-related types
│   └── index.ts            # Barrel export
│
└── assets/                 # Static assets
    ├── fonts/              # Custom fonts
    └── images/             # Static images
```

### Organizing Principles

1. **Feature-based component folders**: Group related components together (`entry/`, `comments/`, `theme/`)
2. **Separation of concerns**: Keep hooks, stores, and components in separate directories
3. **Barrel exports for types only**: Use `index.ts` for re-exporting types, not for components
4. **Flat within folders**: Avoid deep nesting; prefer flat structures within feature folders

---

## Naming Conventions

### Files

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `EntryCard.tsx`, `CommentThread.tsx` |
| Hooks | camelCase with `use` prefix | `useEntry.ts`, `useComments.ts` |
| Stores | camelCase with `Store` suffix | `themeStore.ts`, `uiStore.ts` |
| Utilities | camelCase | `formatting.ts`, `validation.ts` |
| Types | camelCase | `entry.ts`, `comment.ts` |
| Constants | camelCase | `themes.ts`, `queryKeys.ts` |
| Routes | kebab-case | `theme-selection.tsx`, `entry-detail.tsx` |

### Variables & Functions

```typescript
// Constants: SCREAMING_SNAKE_CASE
const MAX_COMMENT_LENGTH = 500;
const ENTRY_STALE_TIME = 1000 * 60 * 5;

// Functions: camelCase, verb-first
function formatDate(date: Date): string { }
function validateComment(text: string): boolean { }
function getEntryById(id: string): Entry { }

// Boolean functions: use is/has/can prefix
function isSubscribed(user: User): boolean { }
function hasSeenEntry(userId: string, entryId: string): boolean { }
function canUpvote(user: User): boolean { }

// Event handlers: handle prefix
function handlePress() { }
function handleSubmit() { }
function handleThemeChange(themeId: string) { }
```

### Components

```typescript
// Component names: PascalCase, noun-based
function EntryCard() { }      // Good: describes what it is
function DisplayEntry() { }   // Avoid: verb-first

// Props interfaces: ComponentNameProps
interface EntryCardProps {
  entry: Entry;
  onPress?: () => void;
}

// Internal state: descriptive, matches purpose
const [isLoading, setIsLoading] = useState(false);
const [commentText, setCommentText] = useState('');
```

### Git Conventions

```bash
# Branch naming: {ISSUE-ID}/{brief-slug}
git checkout -b ROI-42/theme-selection-screen
git checkout -b ROI-55/comment-thread-ui

# Commit messages: [ISSUE-ID] brief description
git commit -m "[ROI-42] add theme selection grid component"
git commit -m "[ROI-42] implement theme persistence in Zustand"

# Keep commits atomic and focused on one change
```

---

## Component Patterns

### Basic Component Structure

```typescript
// components/entry/EntryCard.tsx
import { View, Text, Pressable } from 'react-native';
import type { Entry } from '@/types';

interface EntryCardProps {
  entry: Entry;
  onPress?: () => void;
}

export function EntryCard({ entry, onPress }: EntryCardProps) {
  return (
    <Pressable onPress={onPress} className="bg-white rounded-xl p-4 shadow-sm">
      <Text className="text-lg font-semibold text-gray-900 mb-2">
        {entry.source_text}
      </Text>
      <Text className="text-sm text-gray-500">
        — {entry.attribution}
      </Text>
    </Pressable>
  );
}
```

**Key patterns:**
- Named exports (not default exports) for components
- Props interface defined above the component
- Destructure props in function signature
- NativeWind classes directly in JSX

### Component with Loading/Error States

```typescript
// components/entry/EntryDisplay.tsx
import { View, Text, ActivityIndicator } from 'react-native';
import { useEntry } from '@/hooks/useEntry';

interface EntryDisplayProps {
  entryId: string;
}

export function EntryDisplay({ entryId }: EntryDisplayProps) {
  const { data: entry, isLoading, error } = useEntry(entryId);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text className="text-red-600 text-center">
          Unable to load entry. Please try again.
        </Text>
      </View>
    );
  }

  if (!entry) {
    return null;
  }

  return (
    <View className="flex-1 p-4">
      {/* Entry content */}
    </View>
  );
}
```

### Screen Components (Routes)

```typescript
// app/theme-selection.tsx
import { View, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import { ThemeGrid } from '@/components/theme/ThemeGrid';
import { useThemeStore } from '@/stores/themeStore';

export default function ThemeSelectionScreen() {
  const setActiveTheme = useThemeStore((state) => state.setActiveTheme);

  const handleThemeSelect = (themeId: string) => {
    setActiveTheme(themeId);
    // Navigation happens here
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Choose Your Word' }} />
      <ScrollView className="flex-1 bg-gray-50">
        <View className="p-4">
          <ThemeGrid onThemeSelect={handleThemeSelect} />
        </View>
      </ScrollView>
    </>
  );
}
```

**Key patterns:**
- Screen components use `export default` (required by Expo Router)
- Set screen options via `Stack.Screen`
- Keep screens thin; delegate to components

### Composition Over Props

Prefer composition for complex components:

```typescript
// Good: Composable structure
<EntryCard>
  <EntryCard.Source text={entry.source_text} attribution={entry.attribution} />
  <EntryCard.Interpretation text={entry.interpretation} />
  <EntryCard.Application text={entry.practical_application} />
</EntryCard>

// Avoid: Prop-heavy monolithic components
<EntryCard
  sourceText={entry.source_text}
  attribution={entry.attribution}
  interpretation={entry.interpretation}
  practicalApplication={entry.practical_application}
  showSource={true}
  showInterpretation={true}
  // ... many more props
/>
```

---

## State Management

### Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        Client State                          │
│                         (Zustand)                            │
│  • Theme preferences    • UI state (modals, sheets)          │
│  • Notification prefs   • Onboarding progress                │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                        Server State                          │
│                      (TanStack Query)                        │
│  • Entries             • Comments                            │
│  • User data           • Subscription status                 │
└─────────────────────────────────────────────────────────────┘
```

### Zustand Store Pattern

```typescript
// stores/themeStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ThemeState {
  activeThemeId: string | null;
  themeHistory: string[];
  setActiveTheme: (themeId: string) => void;
  clearTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      activeThemeId: null,
      themeHistory: [],

      setActiveTheme: (themeId) =>
        set((state) => ({
          activeThemeId: themeId,
          themeHistory: [...state.themeHistory, themeId].slice(-10), // Keep last 10
        })),

      clearTheme: () => set({ activeThemeId: null }),
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
```

**Key patterns:**
- Use `persist` middleware for data that should survive app restarts
- Actions are defined inside the store, not separately
- Use selectors to minimize re-renders

### Using Zustand in Components

```typescript
// Select only what you need (prevents unnecessary re-renders)
const activeThemeId = useThemeStore((state) => state.activeThemeId);
const setActiveTheme = useThemeStore((state) => state.setActiveTheme);

// Avoid: Selecting entire store
const store = useThemeStore(); // Re-renders on ANY store change
```

### TanStack Query Pattern

```typescript
// hooks/useEntry.ts
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { QUERY_KEYS } from '@/constants/queryKeys';
import type { Entry } from '@/types';

export function useEntry(entryId: string) {
  return useQuery({
    queryKey: QUERY_KEYS.entry(entryId),
    queryFn: async (): Promise<Entry> => {
      const { data, error } = await supabase
        .from('entries')
        .select('*')
        .eq('id', entryId)
        .single();

      if (error) throw error;
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

// constants/queryKeys.ts
export const QUERY_KEYS = {
  entry: (id: string) => ['entry', id] as const,
  entries: (themeId: string) => ['entries', themeId] as const,
  comments: (entryId: string) => ['comments', entryId] as const,
  currentEntry: (userId: string) => ['currentEntry', userId] as const,
};
```

### Mutations with Optimistic Updates

```typescript
// hooks/useCreateComment.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { QUERY_KEYS } from '@/constants/queryKeys';
import type { Comment } from '@/types';

interface CreateCommentInput {
  entryId: string;
  body: string;
}

export function useCreateComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ entryId, body }: CreateCommentInput) => {
      const { data, error } = await supabase
        .from('comments')
        .insert({ entry_id: entryId, body })
        .select()
        .single();

      if (error) throw error;
      return data;
    },

    onMutate: async ({ entryId, body }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.comments(entryId) });

      // Snapshot previous value
      const previousComments = queryClient.getQueryData<Comment[]>(
        QUERY_KEYS.comments(entryId)
      );

      // Optimistically update
      queryClient.setQueryData<Comment[]>(
        QUERY_KEYS.comments(entryId),
        (old) => [
          ...(old ?? []),
          {
            id: 'temp-' + Date.now(),
            entry_id: entryId,
            body,
            upvote_count: 0,
            created_at: new Date().toISOString(),
          },
        ]
      );

      return { previousComments };
    },

    onError: (err, { entryId }, context) => {
      // Rollback on error
      if (context?.previousComments) {
        queryClient.setQueryData(
          QUERY_KEYS.comments(entryId),
          context.previousComments
        );
      }
    },

    onSettled: (data, error, { entryId }) => {
      // Refetch to sync with server
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.comments(entryId) });
    },
  });
}
```

---

## Styling (NativeWind)

### Basic Usage

```typescript
// Always use className, never StyleSheet.create()
<View className="flex-1 bg-white p-4">
  <Text className="text-lg font-semibold text-gray-900">
    Hello World
  </Text>
</View>
```

### Responsive Design

```typescript
// Use breakpoint prefixes for responsive layouts
<View className="flex-col md:flex-row">
  <View className="w-full md:w-1/2 p-4">
    {/* Left column */}
  </View>
  <View className="w-full md:w-1/2 p-4">
    {/* Right column */}
  </View>
</View>
```

### Dark Mode

```typescript
// Use dark: prefix for dark mode variants
<View className="bg-white dark:bg-slate-900">
  <Text className="text-gray-900 dark:text-gray-100">
    Adapts to system theme
  </Text>
</View>

// In hooks/useColorScheme.ts, use system preference or user choice
import { useColorScheme as useNativeColorScheme } from 'react-native';

export function useColorScheme() {
  const systemScheme = useNativeColorScheme();
  // Could also read from user preferences store
  return systemScheme ?? 'light';
}
```

### Common Patterns

```typescript
// Card pattern
<View className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm">
  {/* Card content */}
</View>

// Pressable with active state
<Pressable
  className="bg-blue-600 active:bg-blue-700 rounded-lg py-3 px-6"
  onPress={handlePress}
>
  <Text className="text-white font-semibold text-center">
    Press Me
  </Text>
</Pressable>

// Input field
<TextInput
  className="bg-gray-100 dark:bg-slate-700 rounded-lg px-4 py-3 text-gray-900 dark:text-gray-100"
  placeholderTextColor="#9CA3AF"
  placeholder="Enter text..."
/>

// Safe area handling
<SafeAreaView className="flex-1 bg-white dark:bg-slate-900">
  {/* Content */}
</SafeAreaView>
```

### Extracting Repeated Patterns

When the same combination of classes repeats, extract to a component, not a variable:

```typescript
// Good: Extract to a component
function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <View className={`bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm ${className ?? ''}`}>
      {children}
    </View>
  );
}

// Use it
<Card className="mb-4">
  <Text>Content</Text>
</Card>

// Avoid: String concatenation in parent components
const cardStyles = "bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm";
<View className={`${cardStyles} mb-4`}>
```

---

## Data Fetching

### Supabase Client Setup

```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Database } from '@/types/database';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
```

### Query Patterns

```typescript
// Fetching a single item
const { data, error } = await supabase
  .from('entries')
  .select('*')
  .eq('id', entryId)
  .single();

// Fetching with joins
const { data, error } = await supabase
  .from('entries')
  .select(`
    *,
    themes:entry_themes(theme:themes(*))
  `)
  .eq('id', entryId)
  .single();

// Fetching with pagination
const { data, error } = await supabase
  .from('comments')
  .select('*')
  .eq('entry_id', entryId)
  .order('created_at', { ascending: false })
  .range(0, 19); // First 20 items
```

### Error Handling in Queries

```typescript
// In TanStack Query hooks, throw errors to trigger error states
export function useEntry(entryId: string) {
  return useQuery({
    queryKey: QUERY_KEYS.entry(entryId),
    queryFn: async () => {
      const { data, error } = await supabase
        .from('entries')
        .select('*')
        .eq('id', entryId)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  });
}
```

---

## Type Definitions

### Database Types

Generate types from Supabase:

```bash
npx supabase gen types typescript --project-id YOUR_PROJECT_ID > types/database.ts
```

### Application Types

```typescript
// types/entry.ts
import type { Database } from './database';

// Extract row type from generated types
export type Entry = Database['public']['Tables']['entries']['Row'];
export type EntryInsert = Database['public']['Tables']['entries']['Insert'];
export type EntryUpdate = Database['public']['Tables']['entries']['Update'];

// Add computed/display types as needed
export interface EntryWithThemes extends Entry {
  themes: Theme[];
}

// types/comment.ts
export type Comment = Database['public']['Tables']['comments']['Row'];

export interface CommentWithHandle extends Comment {
  anon_number: number;
}

// types/index.ts (barrel export)
export * from './entry';
export * from './comment';
export * from './user';
export type { Database } from './database';
```

### Prop Types

```typescript
// Define props inline for simple components
interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

// Or import from a shared types file for complex/reused types
import type { Entry, Comment } from '@/types';

interface EntryCardProps {
  entry: Entry;
  onPress?: () => void;
}
```

---

## Error Handling

### Error Boundaries

```typescript
// components/ErrorBoundary.tsx
import { Component, type ReactNode } from 'react';
import { View, Text, Pressable } from 'react-native';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <View className="flex-1 items-center justify-center p-4">
          <Text className="text-lg font-semibold text-gray-900 mb-2">
            Something went wrong
          </Text>
          <Pressable
            onPress={() => this.setState({ hasError: false })}
            className="bg-blue-600 rounded-lg py-2 px-4"
          >
            <Text className="text-white">Try Again</Text>
          </Pressable>
        </View>
      );
    }

    return this.props.children;
  }
}
```

### User-Facing Error Messages

```typescript
// utils/errorMessages.ts
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    // Map known errors to user-friendly messages
    if (error.message.includes('network')) {
      return 'Please check your internet connection and try again.';
    }
    if (error.message.includes('rate limit')) {
      return 'Please wait a moment before trying again.';
    }
  }
  return 'Something went wrong. Please try again.';
}
```

### Query Error Display

```typescript
// Consistent error display pattern in components
if (error) {
  return (
    <View className="flex-1 items-center justify-center p-4">
      <Text className="text-red-600 dark:text-red-400 text-center mb-4">
        {getErrorMessage(error)}
      </Text>
      <Pressable
        onPress={() => refetch()}
        className="bg-blue-600 rounded-lg py-2 px-4"
      >
        <Text className="text-white">Retry</Text>
      </Pressable>
    </View>
  );
}
```

---

## Testing

### Test File Naming

```
component.tsx       →  component.test.tsx
useHook.ts          →  useHook.test.ts
utils/formatting.ts →  utils/formatting.test.ts
```

### Unit Test Pattern

```typescript
// utils/formatting.test.ts
import { formatRelativeTime } from './formatting';

describe('formatRelativeTime', () => {
  it('returns "just now" for times within the last minute', () => {
    const now = new Date();
    const justNow = new Date(now.getTime() - 30 * 1000);
    expect(formatRelativeTime(justNow)).toBe('just now');
  });

  it('returns "X minutes ago" for times within the last hour', () => {
    const now = new Date();
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
    expect(formatRelativeTime(fiveMinutesAgo)).toBe('5 minutes ago');
  });
});
```

### Component Test Pattern

```typescript
// components/entry/EntryCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react-native';
import { EntryCard } from './EntryCard';

const mockEntry = {
  id: '1',
  source_text: 'Test source',
  attribution: 'Test Author',
  interpretation: 'Test interpretation',
  practical_application: 'Test application',
};

describe('EntryCard', () => {
  it('renders source text and attribution', () => {
    render(<EntryCard entry={mockEntry} />);

    expect(screen.getByText('Test source')).toBeTruthy();
    expect(screen.getByText('— Test Author')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const handlePress = jest.fn();
    render(<EntryCard entry={mockEntry} onPress={handlePress} />);

    fireEvent.press(screen.getByText('Test source'));
    expect(handlePress).toHaveBeenCalledTimes(1);
  });
});
```

### What to Test

**Do test:**
- Business logic functions (entry cycling, validation, formatting)
- Component rendering with different props
- User interactions (press, input, submit)
- Error states and edge cases

**Don't test (for MVP):**
- Implementation details (internal state, private methods)
- Third-party library internals
- Visual appearance (use manual review or defer snapshot tests)

---

## Anti-Patterns

### Don't Use StyleSheet.create()

```typescript
// Don't do this
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
});

<View style={styles.container}>

// Do this instead
<View className="flex-1 bg-white p-4">
```

**Why**: NativeWind provides all styling capabilities with less code, better DX, and built-in dark mode support. Mixing approaches creates inconsistency.

### Don't Select Entire Zustand Store

```typescript
// Don't do this (re-renders on ANY store change)
const store = useThemeStore();
const theme = store.activeThemeId;

// Do this instead (re-renders only when activeThemeId changes)
const activeThemeId = useThemeStore((state) => state.activeThemeId);
```

**Why**: Selecting the entire store causes unnecessary re-renders whenever any part of the store changes.

### Don't Mix Server and Client State

```typescript
// Don't do this (duplicating server state in Zustand)
const useEntryStore = create((set) => ({
  currentEntry: null,
  setCurrentEntry: (entry) => set({ currentEntry: entry }),
}));

// Do this instead (let TanStack Query manage server state)
const { data: currentEntry } = useCurrentEntry();
```

**Why**: TanStack Query provides caching, background refetching, and stale-while-revalidate. Duplicating in Zustand creates sync issues and loses these benefits.

### Don't Use Default Exports for Components

```typescript
// Don't do this
export default function EntryCard() { }

// Do this instead
export function EntryCard() { }
```

**Why**: Named exports enable better IDE support (auto-import, refactoring) and make imports explicit. Exception: Expo Router requires default exports for screen files.

### Don't Inline Complex Logic in JSX

```typescript
// Don't do this
<View>
  {entries
    .filter(e => e.themes.includes(activeTheme))
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 10)
    .map(entry => <EntryCard key={entry.id} entry={entry} />)}
</View>

// Do this instead
const filteredEntries = useMemo(() => {
  return entries
    .filter(e => e.themes.includes(activeTheme))
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 10);
}, [entries, activeTheme]);

<View>
  {filteredEntries.map(entry => <EntryCard key={entry.id} entry={entry} />)}
</View>
```

**Why**: Complex logic in JSX hurts readability and can cause performance issues (recalculating on every render).

### Don't Catch Errors Silently

```typescript
// Don't do this
try {
  await submitComment(text);
} catch (error) {
  // Silent failure
}

// Do this instead
try {
  await submitComment(text);
} catch (error) {
  console.error('Failed to submit comment:', error);
  showErrorToast('Failed to post comment. Please try again.');
}
```

**Why**: Silent failures make debugging impossible and leave users confused about why something didn't work.

---

## Document History

| Date | Change |
|------|--------|
| 2026-01-20 | Initial creation based on BUILD-STRATEGY.md patterns |

---

*This document should be updated as patterns evolve. See CLAUDE.md for the Compound Engineering Protocol on when and how to update conventions.*
