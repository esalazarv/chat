export interface Message<T> {
  _id?: string | null;
  chat?: string | null;
  content?: string | null;
  sender?: T;
  receiver?: string | null;
  createdAt?: string;
  updatedAt?: string;
}
