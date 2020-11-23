import { createAction, props } from '@ngrx/store';
import { Chat, ChatCollection } from "./chat";
import { Message } from "./message";
import {User} from "../user/user";

export const setChatList = createAction('[Chat] set chat list', props<ChatCollection>());
export const selectChat = createAction('[Chat] select chat data', props<Chat>());
export const appendMessage = createAction('[Chat] append chat message', props<{ chatId: any, message: Message<User>}>())
export const resetChatState = createAction('[Chat] reset chat data');
