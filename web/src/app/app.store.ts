import { ActionReducer, ActionReducerMap, MetaReducer } from "@ngrx/store";
import { localStorageSync } from "ngrx-store-localstorage";
import { userReducer, UserState } from "./user/user.reducer";
import { chatReducer, ChatState } from "./chat/chat.reducers";

export interface AppState {
  user: UserState,
  chat: ChatState,
}
const store: ActionReducerMap<AppState> = {
  user: userReducer,
  chat: chatReducer
};

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: ['user'],
    rehydrate: true,
  })(reducer);
}
export const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

export default store;
