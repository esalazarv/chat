import { Action, createReducer, on } from '@ngrx/store';
import { setChatList, selectChat, appendMessage, resetChatState } from './chat.actions';
import { Chat, ChatCollection } from "./chat";
import { Message } from "./message";
import { User } from "../user/user";

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
  on(appendMessage, (state, payload: { chatId: string, message: Message<User> }) => {
    let chat = state.list.find(item => item._id == payload.chatId);
    if (chat) {
      const index = state.list.indexOf(chat);
      const list = [...state.list];
      const messages = [...chat.messages, payload.message];
      list[index] = {...chat, messages };
      const current = state.current?._id == chat._id ? list[index] : state.current;
      return { ...state, list, current };
    }
    return state;
  }),
  on(resetChatState, (state) =>  ({...initialState})),
);

export function chatReducer(state: any, action: Action) {
  return _reducer(state, action);
}
