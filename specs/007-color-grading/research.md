# Research: AI Color Grading

**Input**: `plan.md` and `spec.md`

## 1. Testing Framework for Next.js

- **Decision**: Use Jest and React Testing Library.
- **Rationale**: This is a standard and robust combination for testing React applications, including those built with Next.js. It allows for both unit and component-level testing. The project does not have existing tests to contradict this choice.
- **Alternatives considered**: Playwright for E2E testing (can be added later), Cypress.

## 2. Image Processing Strategy

- **Decision**: For the MVP, all image processing will be done on the client-side.
- **Rationale**:
    - **Simplicity**: Avoids the complexity of a dedicated backend for image processing.
    - **Cost**: No server costs for processing.
    - **Speed**: Faster for the user as there's no upload/download cycle for processing.
- **Trade-offs**:
    - **Performance**: May be slow on low-end devices for large images.
    - **Security**: The AI model and processing logic will be exposed on the client.
- **Future Work**: For more intensive operations or proprietary models, a server-side processing pipeline could be introduced.

## 3. LLM Provider

- **Decision**: Use Google's Gemini 1.5 Flash or Pro via their client-side SDK.
- **Rationale**: The spec explicitly mentions Gemini. Using a client-side SDK aligns with the client-side processing strategy. Gemini 1.5 Flash is cost-effective and fast, suitable for an interactive application.
- **Alternatives considered**: OpenAI's GPT-4o (also has vision capabilities).

## 4. Application Scope

- **Decision**: The application will be developed as a standalone product for the MVP.
- **Rationale**: This simplifies the initial development and deployment. It can be integrated into a larger suite later if required.
