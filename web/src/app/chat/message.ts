export interface Message {
  _id?: string | null;
  chat?: string | null;
  content?: string | null;
  sender?: string | null;
  receiver?: string | null;
  createdAt?: string;
  updatedAt?: string;
}
