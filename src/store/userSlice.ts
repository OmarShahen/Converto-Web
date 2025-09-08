import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  _id: string;
  firstName?: string;
  email?: string;
  imageURL?: string;
  storeId?: string | null;
  storeName?: string;
}

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "null")
      : null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
      if (action.payload) {
        localStorage.setItem("user", JSON.stringify(action.payload));
      } else {
        localStorage.removeItem("user");
      }
    },
    setStoreId(
      state,
      action: PayloadAction<{ storeName: string; storeId: string | null }>
    ) {
      if (state.user) {
        state.user.storeId = action.payload.storeId;
        state.user.storeName = action.payload.storeName;
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },
    logout(state) {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { setUser, setStoreId, logout } = userSlice.actions;
export default userSlice.reducer;
