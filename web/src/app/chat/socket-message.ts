export interface SocketMessage<T> {
  room?: string;
  message: T;
}
