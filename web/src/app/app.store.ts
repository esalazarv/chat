import { ActionReducer, ActionReducerMap, MetaReducer } from "@ngrx/store";
import { User } from "./user/user";
import { userReducer } from "./user/user.reducer";
import { localStorageSync } from "ngrx-store-localstorage";

export interface AppState {
  user: User
}
const store: ActionReducerMap<AppState> = {
  user: userReducer,
};

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: ['user'],
    rehydrate: true,
  })(reducer);
}
export const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

export default store;
