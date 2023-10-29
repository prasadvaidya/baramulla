import { IConsumer } from '../../../broker/interface/consumer/IConsumer';
import { IMessage } from '../../../broker/interface/IMessage';
import { IProducer } from '../../../broker/interface/producer/IProducer';
import { IAction } from '../action/IAction';

export interface IJobResult {
	success: boolean;
}

export interface IOrchestratorContext<T, U> {
	browser: T;
	page: U;
}

export interface IJobContext {
	[key: string]: Object;
}

export interface IJob<T extends IMessage, U extends IMessage> {
	name: string;
	dependsOn?: string[];
	dependencies?: IJob<T, U>[];
	actions: IAction[];
	context: IJobContext;
	inputMessage?: IConsumer<T>;
	outputMessage?: IProducer<U> | undefined;

	initJob: (
		inputMessage: IConsumer<T>,
		onStartCallback: () => void,
		onCompleteCallback: (outputMessage: IProducer<U> | undefined) => void
	) => Promise<IJobResult>;
}
