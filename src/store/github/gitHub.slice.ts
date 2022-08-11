import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const rfc = "rfk";

interface GitHubState {
  favorites: string[];
}

const initialState: GitHubState = {
  favorites: JSON.parse(localStorage.getItem(rfc) ?? "[]"),
};

export const gitHubSlice = createSlice({
  name: "gitHub",
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<string>) {
      state.favorites.push(action.payload);
      localStorage.setItem(rfc, JSON.stringify(state.favorites));
    },
    removeAction(state, action: PayloadAction<string>) {
      state.favorites = state.favorites.filter((f) => f !== action.payload);
      localStorage.setItem(rfc, JSON.stringify(state.favorites));
    },
  },
});

export const githubAction = gitHubSlice.actions;
export const gitHubreducer = gitHubSlice.reducer;
