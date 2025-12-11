# cch-teste-cypress

## Prerequisites
- Node.js 18+ and npm installed
- macOS/Linux/Windows with a GUI if you want to use the interactive Cypress runner

## Install dependencies
```
npm install
```

## Run the tests (headless)
Runs the full Cypress suite in headless mode and writes Mochawesome JSON reports to `cypress/reports/`.
```
npm run cypress:run
```

## Generate the HTML report
Merges all Mochawesome JSON files, then builds a single HTML report at `cypress/reports/final-report.html` (plus assets).
```
npm run cypress:report
```

## Open Cypress in interactive mode
Use the Cypress UI runner if you want to pick and run specs manually.
```
npx cypress open --e2e
```

## Project structure (key paths)
- `cypress/e2e/`: spec files
- `cypress/fixtures/`: test fixtures
- `cypress/reports/`: Mochawesome outputs
- `cypress.config.js`: Cypress configuration

## Troubleshooting
- If you see browser-related errors, set a different browser in the Cypress UI or pass `--browser <name>` to the CLI.
- Remove previous report artifacts if merging fails: delete `cypress/reports/*.json` before rerunning `npm run cypress:report`.
