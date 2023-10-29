import { IMessage } from "../../interface/IMessage";
import { IProducer } from "../../interface/producer/IProducer";

export class Producer<T extends IMessage> implements IProducer<T> {
    body: T;
    constructor(body: T) {
        this.body = body;
    }
}