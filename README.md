# Instagram Stories Clone

This is a submission from Ketan Verma(ketan18710@gmail.com) for the MCR for Stage.

## Live app

```
https://subtle-marshmallow-2dfced.netlify.app/
```

## Features

- Fetches user stories from `data.json`.
- Displays user avatars and names in a horizontal scroll.
- Allows users to click on a story to view it in full screen.
- Supports manual navigation using left/right taps and arrow buttons.
- Automatically moves to the next story after 5 seconds.
- Implements a progress bar for story duration.
- Includes a close button to exit the story view.
- Optimized for mobile view (iPhone 14 dimensions in tests).

## Setup & Installation

### Clone the repository

```
git clone https://github.com/ketan18710/react-ts-tailwind-template/
cd react-ts-tailwind-template
```

### Switch to the `stage-MCR` branch

### Install dependencies

```
npm install
```

### Start the development server

```
npm run dev
```

This will run the app on `http://localhost:5173/` (default Vite port).

### Run Playwright tests

```
npm run test
```

This will execute end-to-end tests using Playwright.

## Design Choices & Optimizations

### Performance & Scalability

- Uses `useState` and `useEffect` for efficient state management.
- Ensures component cleanup with `isMounted` flag to prevent memory leaks.
- Lazy loads stories when a user clicks on them, reducing initial load time.
- Minimal re-renders using key-based indexing and dependency tracking.

### Testing Strategy

- Added `data-testid` attributes to key elements for Playwright.
- Playwright tests simulate an iPhone 14 screen.
- Separated navigation tests for manual clicks and auto-jumps.
- Uses meaningful element selectors instead of hardcoded click coordinates.

## Test Cases

- App loads and displays the logo.
- Story list appears on page load with at least one story.
- User can click on a story to open it.
- Clicking on the right side of a story moves to the next story.
- Clicking on the left side of a story moves to the previous story.
- Story automatically advances to the next after 6.5 seconds.
- User can close the story view by clicking the close button.
- After closing a story, the story list should be visible again.
