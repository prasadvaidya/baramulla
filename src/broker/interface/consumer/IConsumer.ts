import { IMessage } from "../IMessage";

export interface IConsumer<T extends IMessage> {
    body: T
}