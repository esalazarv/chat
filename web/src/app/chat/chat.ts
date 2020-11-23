import { User } from "../user/user";


export interface ChatCollection {
  list: Chat[];
}

export interface Chat {
  _id?: string | null,
  alias: string;
  public: boolean;
  members: User[],
  messages: string[],
  name: string,
  createdAt: string,
  updatedAt: string,
}
