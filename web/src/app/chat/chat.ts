import { User } from "../user/user";
import { Message } from "./message";


export interface ChatCollection {
  list: Chat[];
}

export interface Chat {
  _id?: string | null,
  alias: string;
  public: boolean;
  members: User[],
  messages: Message<User>[],
  name: string,
  createdAt: string,
  updatedAt: string,
}
