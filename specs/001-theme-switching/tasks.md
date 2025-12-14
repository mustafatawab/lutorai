# Tasks: Theme Switching

**Input**: Design documents from `specs/001-theme-switching/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, quickstart.md

**Tests**: The feature specification does not explicitly request TDD or test tasks, but it is a project constitution. I will add test tasks for each user story.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- Paths shown below assume single project - adjust based on plan.md structure

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Install dependencies and setup theme provider.

- [x] T001 Install `next-themes` and its dependencies.
- [x] T002 Create `src/components/theme-provider.tsx` to wrap the application with `next-themes`'s `ThemeProvider`.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Integrate the theme provider into the application layout.

- [x] T003 Update `src/app/layout.tsx` to import and use `ThemeProvider` from `src/components/theme-provider.tsx`.

---

## Phase 3: User Story 1 - Manual Theme Selection (Priority: P1) 🎯 MVP

**Goal**: Allow users to manually switch between light and dark themes.

**Independent Test**: Verify that the UI correctly switches between light and dark themes when the user selects the corresponding option.

### Tests for User Story 1 ⚠️

- [x] T004 [P] [US1] Create unit tests for `theme-provider.tsx` in `src/__tests__/components/theme-provider.test.tsx` to verify theme application and persistence.
- [x] T005 [P] [US1] Create unit tests for `theme-toggle.tsx` in `src/__tests__/components/theme-toggle.test.tsx` to verify theme switching functionality.

### Implementation for User Story 1

- [x] T006 [P] [US1] Create `src/components/theme-toggle.tsx` with UI controls (e.g., a dropdown or buttons) for "Light", "Dark", and "System" theme options.
- [x] T007 [US1] Implement theme persistence logic within `theme-provider.tsx` using `next-themes` to store the selected theme in `localStorage`.
- [x] T008 [US1] Integrate `theme-toggle.tsx` into an appropriate place in the application UI (e.g., `src/components/layout/header.tsx`).

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently.

---

## Phase 4: User Story 2 - System Theme Synchronization (Priority: P2)

**Goal**: Automatically synchronize the application theme with the operating system's theme.

**Independent Test**: Verify that the application theme updates automatically when the OS theme is changed (with "System" theme selected).

### Tests for User Story 2 ⚠️

- [ ] T009 [P] [US2] Update unit tests for `theme-provider.tsx` in `src/__tests__/components/theme-provider.test.tsx` to include system theme detection.

### Implementation for User Story 2

- [x] T010 [US2] Implement system theme detection and application logic within `theme-provider.tsx` using `next-themes`.
- [x] T011 [US2] Ensure that if the browser does not support theme detection, the "System" option in `theme-toggle.tsx` is gracefully handled (e.g., disabled or hidden).

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Final refinements and quality assurance.

- [x] T012 Code review and refactoring for theme-related components.
- [x] T013 Verify smooth theme transitions and absence of flickering. (Manual visual inspection by human developer required)
- [x] T014 Ensure all UI components correctly adapt to all three theme modes. (Manual visual inspection by human developer required)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately.
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories.
- **User Stories (Phase 3+)**: All depend on Foundational phase completion.
  - User stories can then proceed in parallel (if staffed) or sequentially in priority order (P1 → P2).
- **Polish (Final Phase)**: Depends on all desired user stories being complete.

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories.
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - No dependencies on other stories, but builds upon the theme provider setup.

### Within Each User Story

- Tests MUST be written and FAIL before implementation.
- Core implementation before integration.
- Story complete before moving to next priority.

### Parallel Opportunities

- All tests for a user story marked [P] can run in parallel.
- Tasks T004, T005, T006 can be started in parallel after T003.
- Task T009 can be started after T008.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1 (including tests and implementation)
4. **STOP and VALIDATE**: Test User Story 1 independently.
5. Deploy/demo if ready.

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together.
2. Once Foundational is done:
   - Developer A: User Story 1 (tasks T004, T005, T006, T007, T008)
   - Developer B: User Story 2 (tasks T009, T010, T011)
3. Stories complete and integrate independently.

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
