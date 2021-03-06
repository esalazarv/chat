import { Action, createReducer, on } from '@ngrx/store';
import { setUser, resetUser } from './user.actions';
import { User } from "./user";

export interface UserState extends User {}

export const initialState: UserState = {
  _id: null,
  nickname: '',
  createdAt: '',
  updatedAt: '',
};

const _reducer = createReducer(
  initialState,
  on(setUser, (state,  user: User) =>  ({ ...state, ...user})),
  on(resetUser, (state) =>  ({...initialState}))
);

export function userReducer(state: any, action: Action) {
  return _reducer(state, action);
}
