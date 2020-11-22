import {Action, createReducer, on} from '@ngrx/store';
import { setUser, reset } from './user.actions';
import { User } from "./user";

export const initialState: User = {
  _id: null,
  nickname: '',
  createdAt: '',
  updatedAt: '',
};

const _reducer = createReducer(
  initialState,
  on(setUser, (state,  user: User) =>  ({ ...state, ...user})),
  on(reset, (state) =>  ({...initialState}))
);

export function userReducer(state: any, action: Action) {
  return _reducer(state, action);
}
