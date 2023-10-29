import { IConsumer } from "../../interface/consumer/IConsumer";
import { IMessage } from "../../interface/IMessage";

export class Consumer<T extends IMessage> implements IConsumer<T> {
    body: T;
    constructor(body: T) {
        this.body = body;
    }
}