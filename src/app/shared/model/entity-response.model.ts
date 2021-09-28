export class EntityResponse<T extends unknown> {
  message: string;
  messages: T;
}
