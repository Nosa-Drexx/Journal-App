import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiURL } from "./actions";
export const _STORAGE = "_STORAGE-todoLists";

const arr = [];

export const updateAPIAsyncThunk = createAsyncThunk(
  "todos/updateAPI",
  async (data) => {
    const res = await updateDataBase(data);
    return res;
  }
);

const themes = localStorage.getItem("color")
  ? JSON.parse(localStorage.getItem("color"))
  : null;

const updateDataBase = async (data) => {
  let value = false;
  try {
    const token = localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token")).jwt
      : "Bearer unauthorized";

    const dataOBJ = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(data),
    };
    const result = await fetch(`${apiURL}/update/todo`, dataOBJ);
    const answer = await result.json();
    value = { ...answer };
  } catch (e) {
    console.log(e);
    value = { error: "500! Server Error" };
  }
  return value;
};

const initialState = {
  AllUserInfo: { todos: [], logIn: false },
  AllState: arr,
  searchState: arr,
  error: false,
  profileImage: null,
  updateApiWith: false,
  lightDarkMode: themes && themes.black === "white" ? true : false,
};

export const todolistSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    lightDarkMode: (states, action) => {
      states.lightDarkMode = action.payload || !states.lightDarkMode;
    },
    updateUsername: (states, action) => {
      const state = states.AllUserInfo;
      state.username = action.payload.username;
    },
    login: (states, action) => {
      if (!action.payload.error) {
        states.AllUserInfo = { ...action.payload, logIn: true };
        states.AllState = action.payload.todos;
        states.searchState = action.payload.todos;
        states.prev = action.payload.todos;
      } else {
        states.error = action.payload;
      }
    },
    profileImage: (states, action) => {
      states.profileImage = action.payload;
    },
    logout: (states, action) => {
      states.AllUserInfo = { todos: [], logIn: action.payload };
      states.AllState = arr;
      states.searchState = arr;
      states.profileImage = null;
    },
    error: (state, action) => {
      state.error = action.payload;
    },
    add: (states, action) => {
      const state = states.AllState;
      state.unshift({ date: new Date().toUTCString(), ...action.payload });
      const updateAPI = {
        username: states.AllUserInfo.username,
        todos: state,
      };
      states.updateApiWith = updateAPI;
    },
    remove: (states, action) => {
      const state = states.AllState;
      for (let i = 0; i < state.length; i++) {
        if (String(action.payload.id) === String(state[i].id))
          state.splice(i, 1);
      }
      const updateAPI = {
        username: states.AllUserInfo.username,
        todos: state,
      };
      states.updateApiWith = updateAPI;
    },
    removeAllCompleted: (states) => {
      const state = states.AllState;
      var arr = [];

      for (let i = 0; i < state.length; i++) {
        if (state[i].completed === false) {
          arr.push(state[i]);
        }
      }
      if (arr.length) {
        states.AllState = arr;
        states.searchState = arr;

        const updateAPI = {
          username: states.AllUserInfo.username,
          todos: states.AllState,
        };
        states.updateApiWith = updateAPI;
      } else {
        states.updateApiWith = null;
      }
    },
    edit: (states, action) => {
      const state = states.AllState;
      for (let i = 0; i < state.length; i++) {
        if (String(action.payload.id) === String(state[i].id))
          state[i].todo = action.payload.todo;
      }
      const updateAPI = {
        username: states.AllUserInfo.username,
        todos: state,
      };
      states.updateApiWith = updateAPI;
    },
    done: (states, action) => {
      const state = states.AllState;
      for (let i = 0; i < state.length; i++) {
        if (String(action.payload.id) === String(state[i].id))
          state[i].completed = !state[i].completed;
      }
      const updateAPI = {
        username: states.AllUserInfo.username,
        todos: state,
      };
      states.updateApiWith = updateAPI;
    },
    resetupdateAPIWith: (states, action) => {
      states.updateApiWith = action.payload;
    },
    search: (states, action) => {
      states.searchState = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateAPIAsyncThunk.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.error = action.payload;
        state.AllState = state.AllUserInfo.todos;
      } else {
        state.AllUserInfo.todos = action.payload.todos;
        state.AllState = action.payload.todos;
        state.error = { error: "Updated" };
      }
    });
    builder.addCase(updateAPIAsyncThunk.rejected, (state, action) => {
      state.error = action.payload;
      state.AllState = [...state.prev];
    });
  },
});
