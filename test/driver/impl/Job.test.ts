import yaml from 'yamljs';

import { Consumer, IContainer, IContext, IMessage, IProducer, Job, Producer } from '../../../types';
import { TestAction } from '../../util/TestAction.util';

describe('Test Job class', () => {
	let consumerMessage: Consumer<IMessage>;
	let producerMessage: Producer<IMessage>;
	let consumerContext: IContext;
	let parsedDoc: IContainer<IMessage, IMessage>;

	beforeEach(() => {
		consumerMessage = new Consumer<IMessage>({
			sourceJob: 'step-1',
			targetJob: 'step-2'
		} as IMessage);

		producerMessage = new Producer<IMessage>({
			sourceJob: 'step-2',
			targetJob: 'step-3'
		} as IMessage);

		consumerContext = {
			actionClasses: {
				TestAction
			}
		} as IContext;

		parsedDoc = yaml.load('test/artefact/action-test.yaml');
	});

	test('run instance', async () => {
		const onStartCallback = () => {};
		const onCompleteCallback = (producerMessage: IProducer<IMessage> | undefined) => {};

		const job = new Job(parsedDoc.workflow[0], consumerContext);

		const initJobSpy = jest.spyOn(job, 'initJob');

		await job.initJob(consumerMessage, onStartCallback, onCompleteCallback);

		expect(initJobSpy).toHaveBeenCalledTimes(1);
		expect(initJobSpy).toHaveBeenCalledWith(consumerMessage, onStartCallback, onCompleteCallback);
	});
});
