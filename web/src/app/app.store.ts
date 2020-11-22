import { ActionReducerMap } from "@ngrx/store";
import { User } from "./user/user";
import { userReducer } from "./user/user.reducer";

export interface AppState {
  user: User
}
const store: ActionReducerMap<AppState> = {
  user: userReducer,
};

export default store;
