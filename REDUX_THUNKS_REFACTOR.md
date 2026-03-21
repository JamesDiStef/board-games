# Redux Thunks API Extraction

**Date:** March 21, 2026  
**Status:** ✅ Complete - Zero Compilation Errors

## Overview

Refactored API handling by extracting all direct fetch calls from React components into Redux Toolkit thunks. This centralizes API logic, improves error handling, and provides better separation of concerns.

## What Changed

### 1. Created 5 Thunk Files

Each game now has centralized API calls:

- **`src/home/homeThunks.ts`**
  - `fetchUser(userId)` - GET `/user/{userId}`
  - `createUser(userId)` - POST `/user/{userId}`

- **`src/tickTackToe/ticTacThunks.ts`**
  - `fetchCurrentGame(userId)` - GET `/ticTacToe/{userId}`
  - `createNewGame(userId)` - POST `/ticTacToe/{userId}`
  - `updateTicTacToeGame({userId, stuffToPatch})` - PATCH `/ticTacToe/{userId}`

- **`src/hangman/hangmanThunks.ts`**
  - `updateHangmanGame({userId, stuffToPatch})` - PATCH `/hangman/{userId}`

- **`src/connectFour/connectFourThunks.ts`**
  - `fetchConnectFourGame(userId)` - GET `/connectFour/{userId}`
  - `createConnectFourGame(userId)` - POST `/connectFour/{userId}`
  - `saveConnectFourGame({userId, stuffToPatch})` - PATCH `/connectFour/{userId}`

- **`src/clue/clueThunks.ts`**
  - `fetchClueGame(playerName)` - GET `/clue/{playerName}`
  - `createClueGame({playerName, gameData})` - POST `/clue/{playerName}`

### 2. Updated 5 Redux Slices

Added to all slices:
- `loading: boolean` - tracks async operation state
- `error: string | null` - stores error messages
- `clearError()` action - clears error state
- `extraReducers` - handles thunk pending/fulfilled/rejected cases

**Modified slices:** homeSlice, ticTacSlice, hangmanSlice, connectFourSlice, clueSlice

### 3. Updated Redux Store (`src/store.ts`)

Added TypeScript exports:
```typescript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

Enables `useDispatch<AppDispatch>()` for full type safety.

### 4. Refactored 5 Components

Removed all inline fetch calls and replaced with thunk dispatches:
- `src/home/Home.tsx`
- `src/tickTackToe/TickTackToeBoard.tsx`
- `src/hangman/HangmanBoard.tsx`
- `src/connectFour/ConnectFourBoard.tsx`
- `src/clue/ClueBoard.tsx`

## Before vs After

### Old Pattern
```tsx
const updateGame = async (data) => {
  const response = await fetch(`${api}/ticTacToe/${userId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
};

// Called directly from component
updateGame({ board: newBoard });
```

### New Pattern
```tsx
// In ticTacThunks.ts
export const updateTicTacToeGame = createAsyncThunk(
  "ticTacToe/updateGame",
  async ({ userId, stuffToPatch }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/ticTacToe/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(stuffToPatch),
      });
      return await response.json();
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// In component - just dispatch it
dispatch(updateTicTacToeGame({ userId, stuffToPatch: { board: newBoard } }));

// Redux automatically handles:
// 1. Sets loading: true
// 2. Makes the API call
// 3. Sets loading: false + updates state on success
// 4. Sets loading: false + error message on failure
```

## Benefits

✅ **Centralized API Logic** - All calls in one place per feature  
✅ **Automatic Error Handling** - Loading/error states managed by Redux  
✅ **Better Separation** - UI, API, and state management clearly separated  
✅ **Type Safety** - `AppDispatch` ensures proper thunk usage  
✅ **Easier Testing** - API logic testable independently  
✅ **Future Ready** - Easy to add retry logic, caching, interceptors

## Files Summary

**Created (5 thunk files):**
```
src/home/homeThunks.ts
src/tickTackToe/ticTacThunks.ts
src/hangman/hangmanThunks.ts
src/connectFour/connectFourThunks.ts
src/clue/clueThunks.ts
```

**Modified (11 files):**
```
src/store.ts (added type exports)
src/home/homeSlice.ts + Home.tsx
src/tickTackToe/ticTacSlice.ts + TickTackToeBoard.tsx
src/hangman/hangmanSlice.ts + HangmanBoard.tsx
src/connectFour/connectFourSlice.ts + ConnectFourBoard.tsx
src/clue/clueSlice.ts + ClueBoard.tsx
```

## Testing Recommendations

1. **Sign In / Create Account** - Test user creation and error handling
2. **Each Game Board** - Start new game, make moves, refresh to verify persistence
3. **Error Scenarios** - Network disconnection, timeout handling
4. **Performance** - Rapid moves don't cause race conditions

## Migration Guide

**Adding new API calls:**
1. Create thunk in `[game]Thunks.ts`
2. Add thunk cases to slice's `extraReducers`
3. Dispatch thunk from component

**Accessing state in components:**
```typescript
const loading = useSelector((state) => state.[slice].loading);
const error = useSelector((state) => state.[slice].error);
const data = useSelector((state) => state.[slice].[property]);
```

## Next Steps

- Add error UI notifications
- Add loading spinners
- Create `useAppDispatch` hook
- Add retry logic for failed requests
