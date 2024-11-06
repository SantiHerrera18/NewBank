import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import moment from "moment";

const localStorageUserId = localStorage.getItem("UserId");

export const loginUser = createAsyncThunk(
  "user/login",
  async (loginData, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/users/login",
        loginData
      );

      dispatch(setUser(data.user.id));
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAppointmetns = createAsyncThunk(
  "appointment/get",
  async (userId, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`http://localhost:3000/users/${userId}`);

      dispatch(setUserAppointments(data.data.appointments));
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const cancelAppointment = createAsyncThunk(
  "appointment/cancel",
  async (appointmentId, { dispatch, rejectWithValue }) => {
    try {
      await axios.put(
        `http://localhost:3000/appointments/cancel/${appointmentId}`
      );
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const scheduleAppointment = createAsyncThunk(
  "appointment/schedule",
  async (scheduleData, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `http://localhost:3000/appointments/schedule`,
        scheduleData
      );
      const { user, ...newData } = data.data;
      newData.date = moment(newData.date).format("YYYY-MM-DD");

      dispatch(setScheduleAppointment(newData));
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getUserInfo = createAsyncThunk(
  "user/info",
  async (userId, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`http://localhost:3000/users/${userId}`);

      const { id, appointments, ...newData } = data.data;
      dispatch(setUserInfo(newData));
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    user: localStorageUserId || null,
    userAppointments: [],
    userInfo: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("UserId", action.payload);
    },
    setUserAppointments: (state, action) => {
      state.userAppointments = action.payload;
    },
    setScheduleAppointment: (state, action) => {
      state.userAppointments = [...state.userAppointments, action.payload];
    },

    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },

    setLogout: (state) => {
      state.user = null;
      state.userAppointments = [];
      state.userInfo = "";
      localStorage.removeItem("UserId");
    },
  },
});

export const {
  setUser,
  setUserAppointments,
  setScheduleAppointment,
  setLogout,
  setUserInfo,
} = userSlice.actions;

export default userSlice.reducer;
