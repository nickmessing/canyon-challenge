# canyon-challenge

I'm terrible at design so it doesn't really look well, but it works!

## Project setup
```
yarn install
```

### Visible Features:
 * Stages have complete CRUD (create, read, update and delete)
 * Cards have complete CRUD (create, read, update and delete)
 * Stages can be reordered (drag & drop by arrows icon in the left corner)
 * Cards can be reordered inside a stage & moved to another stage
 * Complete feature coverage by e2e tests

### Code Features:
 * Fake database with real delay and configurable error probability
 * API wrapper to have nice access to the Card and Stage models as classes
 * TypeScript helpers for Vuex to inherit types as much as possible

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Run end-to-end tests
```
yarn test:e2e
```

### Lints and fixes files
```
yarn lint
```
