import { Action, createReducer, on } from '@ngrx/store';
import { setChatList, selectChat, resetChatState } from './chat.actions';
import { Chat, ChatCollection } from "./chat";

export interface ChatState {
  list: Chat[];
  current: Chat | null;
}

export const initialState: ChatState = {
  list: [],
  current: null,
};

const _reducer = createReducer(
  initialState,
  on(setChatList, (state,  payload: ChatCollection) =>  ({ ...state, list: payload.list})),
  on(selectChat, (state, payload: Chat) =>  ({...state, current: payload})),
  on(resetChatState, (state) =>  ({...initialState})),
);

export function chatReducer(state: any, action: Action) {
  return _reducer(state, action);
}
