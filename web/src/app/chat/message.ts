export interface Message {
  _id?: string | null;
  chat: string;
  content: string;
  sender: string;
  receiver: string;
  createdAt: string;
  updatedAt: string;
}
