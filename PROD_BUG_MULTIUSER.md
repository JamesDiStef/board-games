# Production Bug: Multi-User State Isolation

**Date:** March 21, 2026  
**Priority:** CRITICAL  
**Status:** In Investigation & Fix  
**Severity:** User A sees User B's game state after login

## Problem Summary

When logging in as different users sequentially, the Redux store **does not clear previous user's game state**. This causes:
- User A plays Tic Tac Toe, gets to move 5
- User A logs out
- User B logs in
- **BUG:** User B sees the Tic Tac Toe board from User A with 5 moves already made

### Root Cause

The Redux thunks refactor centralized API calls but **forgot to clear game state when `userId` changes**. The Redux slices (ticTacToe, hangman, connectFour, clue) have game state that persists across user switches.

**The Flow:**
1. User A logs in → `setUserId("userA")` dispatched
2. User A plays → game state stored in Redux
3. User B logs in → `setUserId("userB")` dispatched
4. **MISSING:** Game slices should reset when userId changes
5. User B sees User A's game state (WRONG!)

## Affected Files

Each game slice needs a reset action:
- `src/tickTackToe/ticTacSlice.ts` - ticTacToe reducer
- `src/hangman/hangmanSlice.ts` - hangman reducer
- `src/connectFour/connectFourSlice.ts` - connectFour reducer
- `src/clue/clueSlice.ts` - clue reducer

**Trigger point:**
- `src/home/homeSlice.ts` - when `setUserId` is called with a new user

## Investigation Findings

### homeSlice.ts Structure
```typescript
interface userState {
  userId: string;        // ← Changes when user logs in/out
  clueId, ticTacId, etc. // Game IDs stored per user
  loading, error
}

reducers: {
  setUserId: (state, action) => {
    state.userId = action.payload;  // ← Happens here!
  }
}
```

**Issue:** No middleware or effect clears game state when userId changes.

### Component Initialization Pattern (TickTackToeBoard.tsx)
```typescript
useEffect(() => {
  if (userId === "") {
    dispatch(setUpGame(blankGame)); // Reset for guest
  } else if (gameIsEmpty) {
    dispatch(fetchCurrentGame(userId)); // Try to fetch saved game
  }
}, [userId]); // Depends on userId change
```

**Issue:** This effect tries to fetch, but only runs on mount and userId changes. However, Redux store still has OLD game state until fetch completes or new game created.

### Race Condition Timeline
```
Time 0: User A logs in
  → setUserId("userA")
  → useEffect runs → fetchCurrentGame("userA")
  → Redux state: ticTacToe = { board: userA's moves ... }

Time 1: User A logs out, User B logs in
  → setUserId("userB")  
  → useEffect runs → fetchCurrentGame("userB") [API call in flight]
  → Redux state: ticTacToe = { board: userA's moves ... } ← STALE!
  → UI renders with userA's game board
  → API returns User B's game → Updates to correct state
  
PROBLEM: Between setUserId and the fetch response, user sees old game!
```

## Solution Strategy

### Option A: Clear All Game State in homeSlice
When `setUserId` is called, also dispatch game reset actions.

**Pros:** Centralized, solves immediately  
**Cons:** Tight coupling between user slice and game slices

### Option B: Add Reset Reducer to Each Game Slice ✅ CHOSEN
Each game slice gets a `resetGameState()` action that clears to initialState.

**Then:** Dispatch the reset from components when userId changes.

**Pros:** Clean separation of concerns, each slice manages itself  
**Cons:** Need to update each component's useEffect

### Option C: Use Middleware
Redux middleware watches for `setUserId` changes and dispatches resets automatically.

**Pros:** Automatic, no component changes needed  
**Cons:** More complex, overkill for this scenario

## Implementation Plan

### Step 1: Add resetGameState() Action to Each Slice
- `ticTacSlice.ts` - Add `resetGameState` action
- `hangmanSlice.ts` - Add `resetGameState` action
- `connectFourSlice.ts` - Add `resetGameState` action
- `clueSlice.ts` - Add `resetGameState` action

### Step 2: Export Reset Actions
Ensure all reset actions are exported.

### Step 3: Update Game Components
Each board component's useEffect should dispatch reset when userId changes:

```typescript
useEffect(() => {
  if (userId === "") {
    dispatch(resetGameState());
  } else {
    dispatch(resetGameState()); // Clear old state first
    dispatch(fetchCurrentGame(userId));
  }
}, [userId, dispatch]);
```

### Step 4: Test Multi-User Flow
```
1. Start as guest → Play game
2. Log in as User A → New user, fresh state ✓
3. Play game as User A
4. Log out, log in as User B → Fresh state ✓
5. Verify no User A state visible ✓
```

## Files to Modify

| File | Change | Lines |
|------|--------|-------|
| `src/tickTackToe/ticTacSlice.ts` | Add `resetGameState` reducer | reducers: {} |
| `src/hangman/hangmanSlice.ts` | Add `resetGameState` reducer | reducers: {} |
| `src/connectFour/connectFourSlice.ts` | Add `resetGameState` reducer | reducers: {} |
| `src/clue/clueSlice.ts` | Add `resetGameState` reducer | reducers: {} |
| `src/tickTackToe/TickTackToeBoard.tsx` | Dispatch reset on userId change | useEffect |
| `src/hangman/HangmanBoard.tsx` | Dispatch reset on userId change | useEffect |
| `src/connectFour/ConnectFourBoard.tsx` | Dispatch reset on userId change | useEffect |
| `src/clue/ClueBoard.tsx` | Dispatch reset on userId change | useEffect |

## Expected Outcome

After fix:
- ✅ User A logs in → Sees User A's games
- ✅ User A plays game
- ✅ User A logs out, User B logs in → Sees ONLY User B's games
- ✅ No stale state leakage between users
- ✅ Guest mode still works independently

## Testing Checklist

- [ ] Start as guest, play game
- [ ] Log in as User A (different user ID)
- [ ] Verify board is reset/empty
- [ ] Play game as User A
- [ ] Stop app, restart
- [ ] Log in as User B (different ID)
- [ ] Verify board is empty (not showing User A's moves)
- [ ] Play as User B
- [ ] Switch back to User A
- [ ] Verify User A's game is restored correctly

## Notes

This bug likely appeared after the thunks refactor because:
1. Old code had direct fetch calls in components
2. Each user switch would naturally clear local state
3. New thunk pattern centralizes state but forgets to reset

The fix ensures game state is properly scoped to the current user and cleared when switching users.
