import { createSlice } from "@reduxjs/toolkit";

export interface clueState {
  playerName: string;
  gameId: string;
  characters: string[];
  weapons: string[];
  isGameOver: boolean;
  eliminatedPeople: string[];
  eliminatedWeapons: string[];
  eliminatedRooms: string[];
  isOpenModal: boolean;
  player: {
    name: string;
    roomId: number;
  };
  currentRoom: string;
  board: { id: number; type: string }[];
  isOpenResponseModal: boolean;
  thingToReveal: string;
  guesses: {
    person: string;
    weapon: string;
    room: string;
  };
  confidential: {
    person: string;
    weapon: string;
    room: string;
  };
}

const characters = [
  "Professor Plum",
  "Colonel Mustard",
  "Ms. Peacock",
  "Ms. Scarlett",
  "Mrs. White",
  "Mr. Green",
];

const weapons = [
  "Candlestick",
  "Lead Pipe",
  "Revolver",
  "Wrench",
  "Rope",
  "Dagger",
];

const board = [
  { id: 0, type: "Study" },
  { id: 1, type: "Library" },
  { id: 2, type: "Dining Room" },
  { id: 3, type: "Kitchen" },
  { id: 4, type: "Pool Room" },
  { id: 5, type: "Bedroom" },
  { id: 6, type: "Walk in Closet" },
  { id: 7, type: "Hall" },
  { id: 8, type: "Billiards Room" },
  { id: 9, type: "Secret Lab" },
  { id: 10, type: "Storage Room" },
  { id: 11, type: "Ballroom" },
  { id: 12, type: "Bathroom" },
  { id: 13, type: "Conservatory" },
  { id: 14, type: "Lounge" },
  { id: 15, type: "Attic" },
];

const initialState: clueState = {
  playerName: "",
  gameId: "",
  characters: characters,
  weapons: weapons,
  isGameOver: false,
  eliminatedPeople: [],
  eliminatedWeapons: [],
  eliminatedRooms: [],
  isOpenModal: false,
  player: {
    name: "",
    roomId: 0,
  },
  currentRoom: "study",
  board: board,
  isOpenResponseModal: false,
  thingToReveal: "",
  guesses: {
    person: "",
    weapon: "",
    room: "",
  },
  confidential: {
    person: characters[Math.floor(Math.random() * 6)],
    weapon: weapons[Math.floor(Math.random() * 6)],
    room: board[Math.floor(Math.random() * 16)].type,
  },
};

export const clueSlice = createSlice({
  name: "clue",
  initialState,
  reducers: {
    setPlayerName: (state, action) => {
      console.log("setting player name to ", action.payload);
      state.playerName = action.payload;
    },
    openModal: (state) => {
      state.isOpenModal = !state.isOpenModal;
    },
    endGame: (state) => {
      state.isGameOver = true;
    },
    startNewGame: (state) => {
      state.isGameOver = false;
      state.eliminatedPeople = [""];
      state.eliminatedRooms = [""];
      state.eliminatedWeapons = [""];
      state.isOpenModal = false;
      state.confidential = {
        person: state.characters[Math.floor(Math.random() * 6)],
        weapon: state.weapons[Math.floor(Math.random() * 6)],
        room: state.board[Math.floor(Math.random() * 16)].type,
      };
    },
    setWeaponGuess: (state, action) => {
      state.guesses.weapon = action.payload;
    },
    setPersonGuess: (state, action) => {
      state.guesses.person = action.payload;
    },
    setRoomGuess: (state, action) => {
      state.guesses.room = action.payload;
    },
    setPlayer: (state, action) => {
      state.player.roomId = action.payload;
    },
    setEliminatedPeople: (state, action) => {
      state.eliminatedPeople = action.payload;
    },
    setEliminatedRooms: (state, action) => {
      state.eliminatedRooms = action.payload;
    },
    setEliminatedWeapons: (state, action) => {
      state.eliminatedWeapons = action.payload;
    },
    setThingToReveal: (state, action) => {
      state.thingToReveal = action.payload;
    },
    setCurrentRoom: (state, action) => {
      state.currentRoom = action.payload;
    },
    openResponseModal: (state) => {
      state.isOpenResponseModal = !state.isOpenResponseModal;
    },
    setUpGame: (state, action) => {
      state.eliminatedPeople = action.payload.eliminatedPeople;
      state.eliminatedRooms = action.payload.eliminatedRooms;
      state.eliminatedWeapons = action.payload.eliminatedWeapons;
      state.confidential = action.payload.confidential;
      state.gameId = action.payload.gameId;
    },
  },
});

export const {
  openModal,
  endGame,
  startNewGame,
  setWeaponGuess,
  setPersonGuess,
  setPlayer,
  setEliminatedPeople,
  setEliminatedRooms,
  setEliminatedWeapons,
  setThingToReveal,
  setCurrentRoom,
  openResponseModal,
  setRoomGuess,
  setPlayerName,
  setUpGame,
} = clueSlice.actions;

export default clueSlice.reducer;
