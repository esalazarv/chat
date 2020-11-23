import { createAction, props } from '@ngrx/store';
import { Chat, ChatCollection } from "./chat";

export const setChatList = createAction('[Chat] set chat list', props<ChatCollection>());
export const selectChat = createAction('[Chat] select chat data', props<Chat>());
export const resetChatState = createAction('[Chat] select chat data');
