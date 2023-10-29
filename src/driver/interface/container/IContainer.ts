import { IMessage } from '../../../broker/interface/IMessage';
import { IJob } from '../job/IJob';

export interface IContainerResult {
	success: boolean;
}

export interface IContainer<T extends IMessage, U extends IMessage> {
	version: string;
	name?: string;
	description?: string;
	workflow: IJob<T, U>[];

	initContainer(): IContainerResult;
}
