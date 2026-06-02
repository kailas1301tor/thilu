# thilu — ZZZ Bank Home Loan Calculator

RMIT FSD S1 2026 — Assessment Task 3: React TypeScript home loan calculator.

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm test` | Run unit tests (Task 4) |

## API

- Base URL: https://a3-loan.onrender.com/
- `output.json` — sample POST `/calculate` response (Task 3a proof)

## Tasks covered

- **Task 1:** Two-column form, header/footer, HTML5 fields with API `name` attributes
- **Task 2:** Manual validation on Calculate (no third-party form libraries)
- **Task 3a:** `output.json` at repo root
- **Task 3b:** API integration, results, loading spinner, React Context monthly payment in header
- **Task 4:** Unit tests in `src/test/loanFormValidation.test.ts`
