<!--
Sync Impact Report
- Version change: 1.0.0 -> 1.1.0
- List of modified principles:
  - Added: VII. Multi-Theme UI
- Templates requiring updates:
  - ✅ .specify/templates/plan-template.md
- Follow-up TODOs: None
-->
# Lutoria AI Constitution

## Core Principles

### I. Film-Grade Aesthetics
The primary goal is to produce visually superior, film-emulative images. All features, algorithms, and UI/UX decisions must serve the creation of professional, cinematic results.

### II. Advanced Color Science Pipeline
The system must transcend simple filters. It will be built on a smart, node-based, adaptive color-science pipeline, ensuring pixel-level precision and control.

### III. Component-Based & Server-First UI
The frontend will be built with Next.js and React Server Components. UI elements must be modular, reusable, and designed for a clear separation of concerns.

### IV. Robustness and Validation
All inputs (images, settings) must be rigorously validated. The system must be resilient, handle errors gracefully, and provide clear feedback to the user.

### V. User-Centric Experience
The user experience is paramount. The interface will be intuitive, provide real-time feedback (e.g., for uploads and processing), and simplify complex processes.

### VI. Test-Driven Development (NON-NEGOTIABLE)
TDD is mandatory. Tests must be written before implementation to ensure correctness and maintainability. A Red-Green-Refactor cycle will be strictly enforced.

### VII. Multi-Theme UI
The system must support dark mode, light mode, and a system-based theme setting. This ensures user comfort and accessibility across different environments.

## Tech Stack Requirements
- **Frontend:** Next.js 16, React Server Components, Tailwind CSS.
- **Image Handling:** Robust components for uploads with previews.

## Development Workflow
- All changes must be introduced through Pull Requests.
- PRs must be reviewed and approved by at least one other team member.
- All tests must pass before merging.

## Governance
This constitution is the single source of truth for project principles. Amendments require team consensus and documentation. All development must align with these principles.

**Version**: 1.1.0 | **Ratified**: 2025-12-07 | **Last Amended**: 2025-12-14