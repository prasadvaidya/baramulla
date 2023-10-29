import { IMessage } from "../IMessage";

export interface IProducer<T extends IMessage> {
    body: T
}