# Little Learners

Little Learners is a browser-based learning game for young children. It is built
with React and Vite and includes English letter games, a counting game, Hindi
letter recognition, subject-themed picture puzzles, a step-by-step cooking game,
animated feedback, and optional background music.

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Getting started

From the project directory, install the locked dependencies and start the
development server:

```sh
npm ci
npm run dev
```

Open the **Local** URL printed by Vite (usually `http://localhost:5173/`) in a
browser. Keep the terminal running while developing; Vite refreshes the page
when source files change.

### Troubleshooting npm install

If installation stops with an `EACCES` or `EEXIST` error mentioning npm's cache,
the cache may contain files your account cannot update. The later
`vite: command not found` message means the install did not finish, so the
development server cannot start yet.

Retry with a separate cache directory instead of forcing an overwrite or
changing permissions on the shared npm cache:

```sh
npm ci --cache /tmp/little-learners-npm-cache
npm run dev
```

If npm reports a different error, check the first error in its output; the Vite
message may only be a consequence of the failed install.

## Available commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create an optimized production build in `dist/` |
| `npm run preview` | Serve the production build locally for a final check |

To preview a production build:

```sh
npm run build
npm run preview
```

## Project structure

```text
.
├── index.html          # HTML entry point
├── src/
│   ├── App.jsx         # Screens, game data, quiz logic, music and feedback
│   ├── main.jsx        # React entry point
│   └── styles.css      # Layout, responsive styles and animations
├── package.json        # Scripts and dependencies
└── vite.config.js      # Vite React plugin configuration
```

## Activities

- **English:** picture-letter matching, uppercase/lowercase matching, ABC order,
  missing-letter spelling, and an ABC picture puzzle.
- **Math:** count pictured objects, choose the matching number, and assemble a
  number picture puzzle.
- **Hindi:** identify the first Hindi letter for a pictured word and assemble a
  Hindi picture puzzle.
- **Cooking:** make pizza, berry ice cream, or roti by following recipe steps
  and adding ingredients.

In each picture puzzle, tap a piece and then tap its matching space to assemble
the picture. The puzzle hints support young learners and touch screens.

In the cooking game, drag an ingredient onto the cooking spot, or tap an
ingredient and then the spot on touch devices. Recipes guide kids through the
ingredients in order before they finish cooking or serve the dish.

## Adding or changing an activity

Game screens and round logic are maintained in `src/App.jsx`. When adding a
quiz, update its activity card, round generation, answer choices, question
prompt, and feedback as needed. Picture puzzle boards are defined in
`picturePuzzles`; keep each board's piece order aligned with its target spaces.
Add activity-specific styles to `src/styles.css`.

## Music and accessibility

Music and answer cues are generated with the browser's Web Audio API; the app
does not require audio files. Browsers may require a user interaction before
audio can start. Music can be switched off using the on-screen control.

The interface uses semantic buttons and visible keyboard focus styles. Check
new layouts at both desktop and mobile widths, and preserve the reduced-motion
support in the stylesheet when adding animations.
