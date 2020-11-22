import { User } from "../user/user";

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
