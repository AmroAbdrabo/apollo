import { createSlice } from "@reduxjs/toolkit";
import type { AppThunk, RootState, TypedDispatch } from "redux/store";
import { Database } from "../../../shared/types";

export interface GeneralState {
  users: Database.UserType[];
  supporters: Database.SupporterType[];
  mentors: Database.MentorType[];
  events: Database.EventType[];
  contractURL: string;
}

const initialGeneralState: GeneralState = {
  users: [],
  supporters: [],
  mentors: [],
  events: [],
  contractURL: "",
};

const generalSlice = createSlice({
  name: "general",
  initialState: initialGeneralState,
  reducers: {
    setUsers: (state, action) => ({
      ...state,
      users: action.payload.users,
    }),
    setSupporters: (state, action) => ({
      ...state,
      supporters: action.payload.supporters,
    }),
    setEvents: (state, action) => ({
      ...state,
      events: action.payload.events,
    }),
    setContractURL: (state, action) => ({
      ...state,
      contractURL: action.payload.contractURL,
    }),
    setMentors: (state, action) => ({
      ...state,
      mentors: action.payload.mentors,
    }),
  },
});

export default generalSlice.reducer;

const setUsers =
  (users: Database.UserType[]): AppThunk =>
  async (dispatch: TypedDispatch) => {
    dispatch(generalSlice.actions.setUsers({ users }));
  };

const setSupporters =
  (supporters: Database.SupporterType[]): AppThunk =>
  async (dispatch: TypedDispatch) => {
    dispatch(generalSlice.actions.setSupporters({ supporters }));
  };

const setEvents =
  (events: Database.EventType[]): AppThunk =>
  async (dispatch: TypedDispatch) => {
    dispatch(generalSlice.actions.setEvents({ events }));
  };

const setContractURL =
  (contractURL: string): AppThunk =>
  async (dispatch: TypedDispatch) => {
    dispatch(generalSlice.actions.setContractURL({ contractURL }));
  };

const setMentors =
  (mentors: Database.MentorType[]): AppThunk =>
  async (dispatch: TypedDispatch) => {
    dispatch(generalSlice.actions.setMentors({ mentors }));
  };

export const generalActions = {
  setUsers,
  setSupporters,
  setMentors,
  setEvents,
  setContractURL,
};

export const generalSelector = (state: RootState) => state.general;
