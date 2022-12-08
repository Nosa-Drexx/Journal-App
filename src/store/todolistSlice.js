import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const _STORAGE = "_STORAGE-todoLists";

const arr = [];

export const updateAPIAsyncThunk = createAsyncThunk(
  "todos/updateAPI",
  async (data) => {
    const res = await updateDataBase(data);
    return res;
  }
);

const updateDataBase = async (data) => {
  let value = false;
  try {
    const token = JSON.parse(localStorage.getItem("token")).jwt;

    const dataOBJ = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(data),
    };
    const result = await fetch(`http://localhost:8080/update/todo`, dataOBJ);
    if (result.error) {
      const answer = await result.json();
      value = answer;
    }
  } catch (e) {
    console.log(e);
    value = { error: "500! Server Error" };
  }
  return value;
};

const initialState = {
  AllUserInfo: { logIn: false },
  AllState: arr,
  searchState: arr,
  error: false,
  updateApiWith: false,
};

export const todolistSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    login: (states, action) => {
      if (!action.payload.error) {
        states.AllUserInfo = { ...action.payload, logIn: true };
        states.AllState = action.payload.todos;
        states.searchState = action.payload.todos;
      } else {
        states.error = action.payload;
      }
    },
    error: (state, action) => {
      state.error = action.payload;
    },
    add: (states, action) => {
      const state = states.AllState;
      state.unshift(action.payload);
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
      state.error = action.payload;
    });
    builder.addCase(updateAPIAsyncThunk.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});
