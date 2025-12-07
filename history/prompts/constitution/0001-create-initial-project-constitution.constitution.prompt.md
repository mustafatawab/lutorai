---
id: 0001
title: Create Initial Project Constitution
stage: constitution
date: 2025-12-07
surface: agent
model: gemini-pro
feature: none
branch: main
user: yasirhayat
command: /sp.constitution
labels: [constitution, initialization]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - .specify/memory/constitution.md
  - .specify/templates/plan-template.md
tests:
  null
---

## Prompt

/sp.constitution You are an expert AI software architect, researcher, and senior full-stack engineer.
Your task is to generate a complete software specification, system design, API design, model pipeline, and Next.js implementation plan for the following SaaS product:

## PRODUCT — “Lutoria AI”
A web-based AI film-grade image editor, inspired by Color.io and Fylm.ai, capable of:
- Taking a reference image
- Taking a target image
- Producing a film-like color graded output that matches the reference
- Using a smart node-based color-science pipeline
- Not just LUT filters — full adaptive pixel-level grading

## CORE FEATURES
1. Image Upload
- Upload reference image
- Upload target image
- Validate formats: JPG, PNG, TIFF
- Max size: 20MB

2. Color Transfer Pipeline
- The AI pipeline should perform:
- Reference → Input color matching
- Film-emulation looks library
- AI-enhanced LUT generation
- Pixel-adaptive tonal curve modeling
- Exposure / Contrast / White balance adjustments
- 3D LUT Export (cube format)

3. Presets & Profiles
- Kodak Vision3
- Fuji Eterna
- Cine LUTs
- Custom film stocks

4. Export
- Download output images
- Export 3D LUT (.cube)
- Save project settings


## TECH STACK REQUIREMENTS
**Frontend**
- Next.js 16
- React Server Components
- Tailwind
- Upload components with previews
- Real-time progress feedback

## Response snapshot

Created the initial project constitution (v1.0.0) for Lutoria AI based on the provided product description. Updated the plan template with constitution-derived gates.

## Outcome

- ✅ Impact: High
- 🧪 Tests: None
- 📁 Files: 2 modified
- 🔁 Next prompts: /sp.plan
- 🧠 Reflection: The constitution provides a solid foundation for the project.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): n/a