# Board Games Application - Copilot Working Memory

**Last Updated:** March 21, 2026 - 2:15 PM (Redux Thunks Refactor Complete)

## Project Overview

A React-based board games application built with TypeScript, featuring 5 playable games with Redux state management. The app uses Vite for bundling, Tailwind CSS for styling, and React Router for navigation.

**Tech Stack:**
- **Frontend Framework:** React 18.3.1 + TypeScript 5.6.2
- **Bundler:** Vite 5.4.10
- **State Management:** Redux Toolkit 2.6.1 + React Redux 9.2.0 (with async thunks for API calls)
- **Routing:** React Router DOM 7.2.0
- **Styling:** Tailwind CSS 4.0.9 + @tailwindcss/vite
- **Icons:** FontAwesome (SVG Core, React component)
- **Effects:** canvas-confetti 1.9.3 (celebration animations)
- **Linting:** ESLint 9.13.0 + TypeScript ESLint

**Current Status:** ✅ All errors fixed, thunks refactor complete and working

## Directory Structure

```
src/
├── App.tsx              # Main app with routing and layout logic
├── main.tsx             # Entry point (Redux Provider + BrowserRouter wrapper)
├── store.ts             # Redux store configuration (with RootState & AppDispatch types)
├── global.css           # Global styles
├── NavBar.tsx           # Desktop navigation bar
├── MobileNav.tsx        # Mobile hamburger menu navigation
├── 
├── home/
│   ├── Home.tsx              # Home page component (uses fetchUser/createUser thunks)
│   ├── homeSlice.ts          # Redux slice for user data with extraReducers for thunks
│   └── homeThunks.ts         # Thunks for fetchUser, createUser
│
├── tickTackToe/
│   ├── TickTackToeBoard.tsx  # Main 3x3 game board (uses thunks)
│   ├── Square.tsx            # Individual square/cell component
│   ├── ticTacSlice.ts        # Redux slice with extraReducers for ticTac thunks
│   └── ticTacThunks.ts       # Thunks: fetchCurrentGame, createNewGame, updateTicTacToeGame
│
├── hangman/
│   ├── HangmanBoard.tsx      # Main hangman game container (uses updateHangmanGame thunk)
│   ├── HangmanDrawing.tsx    # Visual hangman drawing component
│   ├── HangmanWord.tsx       # Word display with guessed letters
│   ├── Keyboard.tsx          # Letter selection keyboard
│   ├── hangmanSlice.ts       # Redux slice with extraReducers for hangman thunks
│   ├── hangmanThunks.ts      # Thunks: updateHangmanGame
│   └── words.json            # List of words for game
│
├── connectFour/
│   ├── ConnectFourBoard.tsx  # 7x6 game board grid (uses thunks)
│   ├── ConnectFourColumn.tsx # Individual column component
│   ├── connectFourSlice.ts   # Redux slice with extraReducers for connectFour thunks
│   └── connectFourThunks.ts  # Thunks: fetchConnectFourGame, createConnectFourGame, saveConnectFourGame
│
├── clue/
│   ├── ClueBoard.tsx         # Main clue game board (uses thunks)
│   ├── ClueComingSoon.tsx    # Placeholder coming soon page
│   ├── GuessPanel.tsx        # Guess input UI
│   ├── Report.tsx            # Report/results component
│   ├── alibis.ts             # Clue game data/logic
│   ├── clueSlice.ts          # Redux slice with extraReducers for clue thunks
│   └── clueThunks.ts         # Thunks: fetchClueGame, createClueGame
│
└── assets/                   # Static assets
```

## Redux Store Structure

**File:** `src/store.ts`

```typescript
store = {
  clue:        clueReducer,
  user:        userReducer,
  ticTacToe:   ticTacToeReducer,
  connectFour: connectFourReducer,
  hangman:     hangmanReducer
}

// Types exported for proper typing
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
```

### State Slices Breakdown

#### 1. **homeSlice** (User State)
- **Location:** `src/home/homeSlice.ts`
- **State Interface:** `userState`
- **Key Properties:**
  - `userId: string` - Current user identifier
  - `clueId, ticTacId, connectFourId, hangmanId: string` - Last played game IDs
  - `loading: boolean` - Async loading state for thunks
  - `error: string | null` - Error message from failed thunks
- **Actions:**
  - `setUserId(payload: string)` - Set the current user
  - `setClueGame, setTicTacToeGame(payload: string)` - Store game IDs
  - `clearError()` - Clear error state
- **Thunks (in homeThunks.ts):**
  - `fetchUser(userId)` - GET `/user/{userId}` - Fetch existing user
  - `createUser(userId)` - POST `/user/{userId}` - Create new user

#### 2. **ticTacSlice** (Tic Tac Toe Game State)
- **Location:** `src/tickTackToe/ticTacSlice.ts`
- **State Interface:** `ticTacSlice`
- **Key Properties:**
  - `board: Square[]` - 9-element array representing 3x3 grid
  - `numClicks, isPlayerOne, isGameOver, loading, error` - Game state
- **Actions:**
  - `setNumClick()` - Increment click counter
  - `setIsPlayerOne()` - Toggle player turn
  - `setIsGameOver(payload)` - Set game over status
  - `setBoardUpdate(payload)` - Update entire board array
  - `setUpGame(payload)` - Reset game with provided state
  - `clearError()` - Clear error state
- **Thunks (in ticTacThunks.ts):**
  - `fetchCurrentGame(userId)` - GET `/ticTacToe/{userId}` - Load saved game
  - `createNewGame(userId)` - POST `/ticTacToe/{userId}` - Create new game
  - `updateTicTacToeGame({userId, stuffToPatch})` - PATCH `/ticTacToe/{userId}` - Save game state

#### 3. **hangmanSlice** (Hangman Game State)
- **Location:** `src/hangman/hangmanSlice.ts`
- **State Interface:** `hangmanSliceInterface`
- **Key Properties:**
  - `wordToGuess, guessedLetters, wrongGuesses, isWin, loading, error`
- **Actions:**
  - `setIsWin, setGuessedLetters, setWrongGuesses, setGame, clearError`
- **Thunks (in hangmanThunks.ts):**
  - `updateHangmanGame({userId, stuffToPatch})` - PATCH `/hangman/{userId}` - Save game state

#### 4. **connectFourSlice** (Connect Four Game State)
- **Location:** `src/connectFour/connectFourSlice.ts`
- **State Interfaces:** `ConnectFourState`, `Column`, `Square`
- **Key Properties:**
  - `columns: Column[]` - 7 columns with 6 squares each
  - `isRedTurn, isGameOver, loading, error`
- **Actions:**
  - `handleDropPiece(payload)` - Update columns and toggle turn
  - `toggleGameOver()`, `restart()`, `clearError()`
- **Thunks (in connectFourThunks.ts):**
  - `fetchConnectFourGame(userId)` - GET `/connectFour/{userId}` - Load saved game
  - `createConnectFourGame(userId)` - POST `/connectFour/{userId}` - Create new game
  - `saveConnectFourGame({userId, stuffToPatch})` - PATCH `/connectFour/{userId}` - Save game state

#### 5. **clueSlice** (Clue Game State)
- **Location:** `src/clue/clueSlice.ts`
- **State Interface:** `clueState`
- **Key Properties:**
  - `playerName, gameId, characters[], weapons[], board`
  - `confidential, guesses, eliminatedPeople/Weapons/Rooms`
  - `isGameOver, isOpenModal, isOpenResponseModal, loading, error`
- **Actions:** Various setters + `clearError()`
- **Thunks (in clueThunks.ts):**
  - `fetchClueGame(playerName)` - GET `/clue/{playerName}` - Load saved game
  - `createClueGame({playerName, gameData})` - POST `/clue/{playerName}` - Create new game

## Routing

**File:** `src/App.tsx`

Routes are defined in the `<Routes>` component:
- `/` → `<Home />`
- `/home` → `<Home />`
- `/ticTacToe` → `<Board />`
- `/hangman` → `<HangmanBoard />`
- `/connectFour` → `<ConnectFourBoard />`
- `/clue` → `<ClueBoard />`

**Navigation:**
- Desktop: `NavBar.tsx` component (hidden on small screens)
- Mobile: `MobileNav.tsx` with hamburger menu (visible only on small screens)

## API Integration (Extracted to Thunks)

**Environment Variable:** `VITE_NEW_API_URL` (from `import.meta.env`)

All API calls are now centralized in thunk files by game/feature:

| Game | Thunks File | API Endpoints |
|------|-------------|--------------|
| Home/User | `homeThunks.ts` | `GET /user/{userId}`, `POST /user/{userId}` |
| Tic Tac Toe | `ticTacThunks.ts` | `GET /ticTacToe/{userId}`, `POST /ticTacToe/{userId}`, `PATCH /ticTacToe/{userId}` |
| Hangman | `hangmanThunks.ts` | `PATCH /hangman/{userId}` |
| Connect Four | `connectFourThunks.ts` | `GET /connectFour/{userId}`, `POST /connectFour/{userId}`, `PATCH /connectFour/{userId}` |
| Clue | `clueThunks.ts` | `GET /clue/{playerName}`, `POST /clue/{playerName}` |

**Thunk Structure:**
```typescript
export const fetchGame = createAsyncThunk(
  'slice/actionName',
  async (params, { rejectWithValue }) => {
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
```

**Components use thunks like:**
```typescript
dispatch(fetchCurrentGame(userId)).then((result) => {
  if (fetchCurrentGame.fulfilled.match(result)) {
    // Handle success
  }
});
```

## Key Component Patterns

### Game Board Components (Updated)
1. Import `AppDispatch` type from store
2. Use `useDispatch<AppDispatch>()` for proper typing
3. Dispatch thunks instead of calling fetch directly
4. Handle thunk promises with `.then()` and `fulfilled.match()`
5. Slices automatically handle loading/error states via extraReducers

### Updated Pattern Example:
```typescript
const dispatch = useDispatch<AppDispatch>();

// Instead of: updateGame({ board: newBoard })
// Now use:
dispatch(updateTicTacToeGame({ userId, stuffToPatch: { board: newBoard } }));
```

## Build & Development

- **Dev Server:** `npm run dev` → Vite dev server
- **Build:** `npm run build` → TypeScript check + Vite build
- **Lint:** `npm run lint` → ESLint check
- **Preview:** `npm run preview` → Preview built app

## Recent Changes (Thunks Extraction)

✅ **Extracted all API calls from components into Redux thunks**
- Created 5 thunk files (one per game/feature)
- Updated all 5 slices with `extraReducers` to handle async actions
- Added `loading` and `error` properties to all slices
- Updated all components to dispatch thunks instead of inline fetch
- Exported `AppDispatch` type from store for component typing
- Removed direct API URL usage from components

**Benefits:**
- Centralized API logic - easier to maintain and debug
- Proper async state handling (loading, error states)
- Better separation of concerns (API logic separate from UI)
- Improved testability
- Error handling through Redux state

## Redux Selectors Used Across App

```typescript
state.user.userId, loading, error
state.ticTacToe.*, loading, error
state.hangman.*, loading, error
state.connectFour.*, loading, error
state.clue.*, loading, error
```

## Known Patterns & Best Practices (Updated)

1. ✅ Redux Toolkit + thunks for async operations
2. ✅ Centralized API calls in thunk files
3. ✅ Proper typing with AppDispatch
4. ✅ Loading/error states in all slices
5. ✅ Game state reset via setUpGame() pattern
6. ✅ Confetti celebrations on win conditions
7. ✅ Responsive mobile-first design with Tailwind

## Next Steps for Enhancement

- Add error UI notifications for failed API calls
- Add loading spinners/indicators in components
- Create custom hook for thunk dispatch (useAppDispatch)
- Add retry logic for failed API calls
- Implement game statistics/leaderboard feature
- Add multiplayer functionality
- Create settings/preferences page
- Add game sound effects



## Directory Structure

```
src/
├── App.tsx              # Main app with routing and layout logic
├── main.tsx             # Entry point (Redux Provider + BrowserRouter wrapper)
├── store.ts             # Redux store configuration
├── global.css           # Global styles
├── NavBar.tsx           # Desktop navigation bar
├── MobileNav.tsx        # Mobile hamburger menu navigation
├── 
├── home/
│   ├── Home.tsx         # Home page component
│   └── homeSlice.ts     # Redux slice for user data (userId, game IDs)
│
├── tickTackToe/
│   ├── TickTackToeBoard.tsx  # Main 3x3 game board
│   ├── Square.tsx            # Individual square/cell component
│   └── ticTacSlice.ts        # Redux slice (board state, player turn, game over)
│
├── hangman/
│   ├── HangmanBoard.tsx      # Main hangman game container
│   ├── HangmanDrawing.tsx    # Visual hangman drawing component
│   ├── HangmanWord.tsx       # Word display with guessed letters
│   ├── Keyboard.tsx          # Letter selection keyboard
│   ├── hangmanSlice.ts       # Redux slice (word, guesses, wrong count)
│   └── words.json            # List of words for game
│
├── connectFour/
│   ├── ConnectFourBoard.tsx  # 7x6 game board grid
│   ├── ConnectFourColumn.tsx # Individual column component
│   └── connectFourSlice.ts   # Redux slice (columns, turn, game over)
│
├── clue/
│   ├── ClueBoard.tsx         # Main clue game board
│   ├── ClueComingSoon.tsx    # Placeholder coming soon page
│   ├── GuessPanel.tsx        # Guess input UI
│   ├── Report.tsx            # Report/results component
│   ├── alibis.ts             # Clue game data/logic
│   └── clueSlice.ts          # Redux slice (board, characters, weapons, confidential info)
│
└── assets/                   # Static assets
```

## Redux Store Structure

**File:** `src/store.ts`

```typescript
store = {
  clue:        clueReducer,
  user:        userReducer,
  ticTacToe:   ticTacToeReducer,
  connectFour: connectFourReducer,
  hangman:     hangmanReducer
}
```

### State Slices Breakdown

#### 1. **homeSlice** (User State)
- **Location:** `src/home/homeSlice.ts`
- **State Interface:** `userState`
- **Key Properties:**
  - `userId: string` - Current user identifier
  - `clueId: string` - Last played clue game ID
  - `ticTacId: string` - Last played tic tac toe game ID
  - `connectFourId: string` - Last played connect four game ID
  - `hangmanId: string` - Last played hangman game ID
- **Actions:**
  - `setUserId(payload: string)` - Set the current user
  - `setClueGame(payload: string)` - Store clue game ID
  - `setTicTacToeGame(payload: string)` - Store tic tac toe game ID

#### 2. **ticTacSlice** (Tic Tac Toe Game State)
- **Location:** `src/tickTackToe/ticTacSlice.ts`
- **State Interface:** `ticTacSlice`
- **Key Properties:**
  - `board: Square[]` - 9-element array representing 3x3 grid (each Square has `num` and `value`)
  - `numClicks: number` - Move counter
  - `isPlayerOne: boolean` - Current player (X = player 1, O = player 2)
  - `isGameOver: boolean` - Game completion flag
- **Actions:**
  - `setNumClick()` - Increment click counter
  - `setIsPlayerOne()` - Toggle player turn
  - `setIsGameOver(payload)` - Set game over status
  - `setBoardUpdate(payload)` - Update entire board array
  - `setUpGame(payload)` - Reset game with provided state

#### 3. **hangmanSlice** (Hangman Game State)
- **Location:** `src/hangman/hangmanSlice.ts`
- **State Interface:** `hangmanSliceInterface`
- **Key Properties:**
  - `wordToGuess: string` - The target word (lowercase)
  - `guessedLetters: string[]` - Array of guessed letters
  - `wrongGuesses: number` - Count of wrong guesses (max typically 6)
  - `isWin: boolean` - Game won flag
- **Actions:**
  - `setIsWin(payload)` - Set win status
  - `setGuessedLetters(payload)` - Update guessed letters array
  - `setWrongGuesses(payload)` - Set wrong guess count
  - `setGame(payload)` - Reset entire game state

#### 4. **connectFourSlice** (Connect Four Game State)
- **Location:** `src/connectFour/connectFourSlice.ts`
- **State Interfaces:** `ConnectFourState`, `Column`, `Square`
- **Key Properties:**
  - `columns: Column[]` - 7 columns, each with 6 squares
  - `isRedTurn: boolean` - Tracks whose turn (red vs yellow)
  - `isGameOver: boolean` - Game completion flag
- **Actions:**
  - `handleDropPiece(payload)` - Update columns after piece drop and toggle turn
  - `toggleGameOver()` - Toggle game over status
  - `restart()` - Reset to initial state

#### 5. **clueSlice** (Clue Game State)
- **Location:** `src/clue/clueSlice.ts`
- **State Interface:** `clueState`
- **Key Properties:**
  - `playerName: string` - Current player name
  - `gameId: string` - Game identifier
  - `characters: string[]` - Available character suspects (6 total)
  - `weapons: string[]` - Available weapons (6 total)
  - `board: object[]` - Room board with 16 rooms
  - `confidential: { person, weapon, room }` - Secret solution (randomly generated)
  - `guesses: { person, weapon, room }` - Current guess being made
  - `eliminatedPeople/Weapons/Rooms: string[]` - Ruled out items
  - `isGameOver: boolean` - Game completion flag
  - `isOpenModal: boolean` - UI modal state
  - `isOpenResponseModal: boolean` - Response modal state
  - `thingToReveal: string` - Item to show as response
  - `player: { name, roomId }` - Player position
  - `currentRoom: string` - Current room name
- **Actions:** Various setters for game progression and state updates

## Routing

**File:** `src/App.tsx`

Routes are defined in the `<Routes>` component:
- `/` → `<Home />`
- `/home` → `<Home />`
- `/ticTacToe` → `<Board />` (Tic Tac Toe)
- `/hangman` → `<HangmanBoard />`
- `/connectFour` → `<ConnectFourBoard />`
- `/clue` → `<ClueBoard />`

**Navigation:**
- Desktop: `NavBar.tsx` component (hidden on small screens with `hidden sm:block`)
- Mobile: `MobileNav.tsx` with hamburger menu (visible only on small screens with `block sm:hidden`)
- Navbar shows only on non-home pages (`isHome` check using `useLocation()`)

## API Integration

**Environment Variable:** `VITE_NEW_API_URL` (from `import.meta.env`)

Games are accessing an API endpoint for game persistence/updates:
- **Usage Pattern:** `const api = import.meta.env.VITE_NEW_API_URL;`
- **Called In:**
  - `HangmanBoard.tsx` - `updateGame()` function calls
  - `TickTackToeBoard.tsx` - Game state synchronization
  - Likely in other board components for data persistence

**Note:** The specific API endpoints and methods are not fully visible in slices but are used in board components for `updateGame()` calls and game state synchronization.

## Key Component Patterns

### Game Board Components
All game boards follow a similar pattern:
1. Import Redux actions and selectors
2. Use `useSelector()` to read state
3. Use `useDispatch()` to update Redux state
4. Call `updateGame()` to sync with backend API
5. Use `canvas-confetti` for win animations
6. Initialize game on mount (if `userId` is empty)

### Component Props Patterns
- **NavBar/MobileNav:** Accept route/navigation props
- **Game Boards:** Self-contained, read from Redux, dispatch to Redux
- **Slices:** Minimal business logic, mostly state mutations

## Styling

- **Framework:** Tailwind CSS 4.0.9
- **Key Classes Used:**
  - Responsive: `block sm:hidden`, `hidden sm:block` for mobile/desktop switching
  - Colors: `bg-amber-500` (navbar background), `text-3xl`, `p-3`, `flex`
  - Layout: Flexbox with `flex`, padding/margin utilities

## Build & Development

- **Dev Server:** `npm run dev` → Vite dev server
- **Build:** `npm run build` → TypeScript check + Vite build
- **Lint:** `npm run lint` → ESLint check
- **Preview:** `npm run preview` → Preview built app

## Important Implementation Notes

1. **Tic Tac Toe Win Conditions:** 8 winning combos defined in `TickTackToeBoard.tsx`
2. **Hangman:** Words loaded from `words.json`, random selection on game start
3. **Connect Four:** Uses column-based architecture (7 columns × 6 rows)
4. **Clue:** Has 16 rooms, 6 characters, 6 weapons; solution randomly generated
5. **Confetti Animation:** Triggered on game wins using `canvas-confetti` library
6. **Mobile Responsive:** Uses Tailwind breakpoint `sm:` (640px) for layout switches

## Redux Selectors Used Across App

- `state.user.userId` - Current user identifier
- `state.ticTacToe.*` - Tic tac toe game state
- `state.hangman.*` - Hangman game state
- `state.connectFour.*` - Connect four game state
- `state.clue.*` - Clue game state

## Known Patterns & Best Practices (In This Codebase)

1. ✅ Redux Toolkit for state management (modern, clean)
2. ✅ Game state reset via `setUpGame()` pattern
3. ✅ Confetti celebrations on win conditions
4. ✅ Responsive mobile-first design with Tailwind
5. ⚠️ API calls in components (consider extracting to thunks for better separation)
6. ⚠️ Some state management could be optimized (e.g., hangman `updateGame()` calls seem redundant)

---

## Next Steps for Enhancement

- Add API error handling
- Create Redux thunks for async operations
- Add game statistics/leaderboard
- Implement multiplayer features
- Add game sound effects
- Create settings/preferences page

