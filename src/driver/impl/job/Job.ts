import { IContext } from '../../../../entrypoint';
import { IConsumer } from '../../../broker/interface/consumer/IConsumer';
import { IMessage } from '../../../broker/interface/IMessage';
import { IProducer } from '../../../broker/interface/producer/IProducer';
import { IAction } from '../../interface/action/IAction';
import { IJob, IJobContext, IJobResult } from '../../interface/job/IJob';

export class JobContext implements IJobContext {
	[key: string]: Object;
}
export class Job<T extends IMessage, U extends IMessage> implements IJob<T, U> {
	name: string;
	dependsOn?: string[];
	dependencies: string[];
	actions: IAction[];
	context: IJobContext = new JobContext();
	consumerContext: IContext;
	inputMessage?: IConsumer<T>;
	outputMessage?: IProducer<U> | undefined;

	constructor(job: IJob<T, U>, consumerContext: IContext, dependencies: string[]) {
		const { name, dependsOn, actions } = job;
		this.name = name;
		this.dependsOn = dependsOn;
		this.dependencies = dependencies;
		this.actions = actions;
		this.consumerContext = consumerContext;
	}

	async initJob(
		inputMessage: IConsumer<T>,
		onStartCallback: () => void = () => {},
		onCompleteCallback: (outputMessage: IProducer<U> | undefined) => void = () => {}
	): Promise<IJobResult> {
		// TODO: callback could be async
		onStartCallback();

		this.inputMessage = inputMessage;
		for (let action of this.actions) {
			const ActionClasses = this.consumerContext?.actionClasses;
			const interpretedAction = new ActionClasses[action.type](action, this.context);
			await interpretedAction.onStart();
			await interpretedAction.action();
			await interpretedAction.onComplete();
		}

		// TODO: build 'outputMessage' based on granular actions

		const outputMessages: IProducer<U>[] = [];
		for (let dependency of this.dependencies) {
			const message = {
				body: {
					sourceJob: this.name,
					targetJob: dependency,
					createdAt: new Date()
				}
			} as IProducer<U>;
			outputMessages.push(message);
			// TODO: callback could be async
			onCompleteCallback(message);
		}

		return new Promise((resolve, reject) => {
			resolve({
				success: true,
				outputMessages
			});
		});
	}
}
