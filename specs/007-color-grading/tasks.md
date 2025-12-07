---

description: "Task list template for feature implementation"
---

# Tasks: AI Color Grading

**Input**: Design documents from `/specs/007-color-grading/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The constitution requires a Test-Driven Development (TDD) approach. All implementation tasks must be preceded by a failing test.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- Paths shown below assume single project - adjust based on plan.md structure

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 [P] Install Jest, React Testing Library, and necessary Jest DOM matchers via pnpm.
- [ ] T002 [P] Configure Jest and Babel for Next.js and TypeScript project in `jest.config.js` and `.babelrc`.
- [ ] T003 [P] Install the Google AI client library for JavaScript (`@google/generative-ai`).
- [ ] T004 Create a dedicated test directory structure, e.g., `src/__tests__`.


---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T005 Create the main application layout in `src/app/page.tsx` with placeholders for the reference image, target image, and output.
- [ ] T006 Define the `AppState` and the state management logic within the `src/hooks/use-color-grade.ts` hook.
- [ ] T007 Write a test for the `use-color-grade` hook to verify its initial state in `src/__tests__/hooks/use-color-grade.test.ts`.

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Upload Reference Image (Priority: P1) 🎯 MVP

**Goal**: Allow users to upload a reference image.

**Independent Test**: A user can select an image file, and see a preview of it in the reference image panel.

### Tests for User Story 1 ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T008 [P] [US1] Write a test for the reference image uploader component in `src/__tests__/components/sidebar-left.test.tsx`.
- [ ] T009 [P] [US1] Write a test to verify the `AppState` is updated when a reference image is provided in `src/__tests__/hooks/use-color-grade.test.ts`.

### Implementation for User Story 1

- [ ] T010 [US1] Create the UI for the reference image uploader in `src/components/layout/sidebar-left.tsx`.
- [ ] T011 [US1] Implement the logic in `src/hooks/use-color-grade.ts` to handle the reference image upload and update the `AppState`.

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Upload Target Image (Priority: P2)

**Goal**: Allow users to upload a target image.

**Independent Test**: A user can select a target image, and see a preview of it in the main canvas area.

### Tests for User Story 2 ⚠️

- [ ] T012 [P] [US2] Write a test for the target image uploader component in `src/__tests__/components/sidebar-right.test.tsx`.
- [ ] T013 [P] [US2] Write a test to verify the `AppState` is updated when a target image is provided in `src/__tests__/hooks/use-color-grade.test.ts`.

### Implementation for User Story 2

- [ ] T014 [US2] Create the UI for the target image uploader in `src/components/layout/sidebar-right.tsx`.
- [ ] T015 [US2] Implement the logic in `src/hooks/use-color-grade.ts` to handle the target image upload and update the `AppState`.

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - "Match Color" Processing (Priority: P3)

**Goal**: Allow users to trigger the AI color grading process.

**Independent Test**: A user can click a "Match Color" button, and the application will process the reference and target images and display an output image.

### Tests for User Story 3 ⚠️

- [ ] T016 [P] [US3] Write a unit test for the `performColorGrade` action in `src/__tests__/app/actions.test.ts`.
- [ ] T017 [P] [US3] Write a unit test for the `applyLut` utility function in `src/__tests__/lib/utils.test.ts`.
- [ ] T018 [P] [US3] Write a test for the "Match Color" button's `onClick` handler in `src/__tests__/components/header.test.tsx`.

### Implementation for User Story 3

- [ ] T019 [US3] Implement the `performColorGrade` action in `src/app/actions.ts`, including the logic for calling the Gemini API.
- [ ] T020 [US3] Implement the `applyLut` utility function in `src/lib/utils.ts`.
- [ ] T021 [US3] Create the "Match Color" button in `src/components/layout/header.tsx` and wire up the `onClick` handler to call the `performColorGrade` action.

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: User Story 4 - View Result (Priority: P4)

**Goal**: Allow users to see the result of the color grading.

**Independent Test**: After processing, the main canvas displays the color-graded image.

### Tests for User Story 4 ⚠️

- [ ] T022 [P] [US4] Write a test for the output image display in `src/__tests__/components/main-canvas.test.tsx`.

### Implementation for User Story 4

- [ ] T023 [US4] Implement the logic in `src/components/layout/main-canvas.tsx` to display the output image from the `AppState`.

---

## Phase 7: User Story 5 - Download Result (Priority: P5)

**Goal**: Allow users to download the processed image.

**Independent Test**: A user can click a "Download" button to save the output image to their local machine.

### Tests for User Story 5 ⚠️

- [ ] T024 [P] [US5] Write a test for the download button in `src/__tests__/components/header.test.tsx`.

### Implementation for User Story 5

- [ ] T025 [US5] Implement the download button in `src/components/layout/header.tsx` to allow users to download the processed image.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T026 [P] Add comprehensive JSDoc comments to all new functions and components.
- [ ] T027 Code cleanup and refactoring across the new feature's codebase.
- [ ] T028 Security hardening: ensure all user inputs are sanitized and there are no obvious vulnerabilities.
- [ ] T029 Run `quickstart.md` validation to ensure it's up-to-date.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Can start immediately.
- **Foundational (Phase 2)**: Depends on Setup. Blocks all user stories.
- **User Stories (Phase 3-7)**: Depend on Foundational. Can be implemented sequentially or in parallel if resources allow.
- **Polish (Phase 8)**: Depends on all user stories being complete.

### User Story Dependencies

- All user stories are largely independent after the Foundational phase is complete.

### Within Each User Story

- Tests MUST be written and FAIL before implementation.
- Data/state logic (in hooks) should be implemented before UI components that use them.

---

## Implementation Strategy

### Incremental Delivery

1.  Complete Setup + Foundational.
2.  Implement US1 (Upload Reference). Test.
3.  Implement US2 (Upload Target). Test.
4.  Implement US3 (Match Color). Test.
5.  Implement US4 (View Result). Test.
6.  Implement US5 (Download). Test.
7.  Complete Polish phase.
8.  Each user story adds a testable increment of value.

---

## Notes

- This task list is a guide. Some tasks may be broken down further during implementation.
- Remember to commit after each logical chunk of work.
