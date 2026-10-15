# Little Learners

Little Learners is a browser-based learning game for young children. It is built
with React and Vite and includes English letter games, a counting game, Hindi
letter recognition, animated feedback, and optional background music.

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
  and missing-letter spelling.
- **Math:** count pictured objects and choose the matching number.
- **Hindi:** identify the first Hindi letter for a pictured word.

## Adding or changing an activity

Game screens and round logic are maintained in `src/App.jsx`. When adding a
game, update its activity card, round generation, answer choices, question
prompt, and feedback as needed. Reuse the existing quiz state and feedback flow
so progress, retry behavior, scoring, and celebrations stay consistent. Add
activity-specific styles to `src/styles.css`.

## Music and accessibility

Music and answer cues are generated with the browser's Web Audio API; the app
does not require audio files. Browsers may require a user interaction before
audio can start. Music can be switched off using the on-screen control.

The interface uses semantic buttons and visible keyboard focus styles. Check
new layouts at both desktop and mobile widths, and preserve the reduced-motion
support in the stylesheet when adding animations.
