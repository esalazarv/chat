import { createAction, props } from '@ngrx/store';
import { User } from "./user";

export const setUser = createAction('[User] set user data', props<User>());
export const resetUser = createAction('[User] reset user data');
