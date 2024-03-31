import yaml from 'yamljs';

import { Action, Consumer, IContainer, IContext, IJobContext, IMessage } from '../../../types';
import { TestAction } from '../../util/TestAction.util';

describe('Test Action class', () => {
	let consumerMessage: Consumer<IMessage>;
	let consumerContext: IContext;
	let parsedDoc: IContainer<IMessage, IMessage>;

	beforeEach(() => {
		consumerMessage = new Consumer<IMessage>({
			sourceJob: 'step-1',
			targetJob: 'step-2'
		} as IMessage);

		consumerContext = {
			actionClasses: {
				TestAction
			}
		} as IContext;

		parsedDoc = yaml.load('test/artefact/action-test.yaml');
	});

	test('Create overridden instance', async () => {
		const action = new TestAction(parsedDoc.workflow[0].actions[0], {} as IJobContext);
		const onStartSpy = jest.spyOn(action, 'onStart');
		const onCompleteSpy = jest.spyOn(action, 'onComplete');
		const actionSpy = jest.spyOn(action, 'action');

		await action.onStart();
		await action.action();
		await action.onComplete();

		expect(onStartSpy).toHaveBeenCalledTimes(1);
		expect(onCompleteSpy).toHaveBeenCalledTimes(1);
		expect(actionSpy).toHaveBeenCalledTimes(1);
	});

	test('Create base instance', async () => {
		const action = new Action(parsedDoc.workflow[0].actions[0], {} as IJobContext);

		try {
			await action.onStart();
		} catch (error) {
			expect(error).toBeInstanceOf(Error);
		}

		try {
			await action.action();
		} catch (error) {
			expect(error).toBeInstanceOf(Error);
		}

		try {
			await action.onComplete();
		} catch (error) {
			expect(error).toBeInstanceOf(Error);
		}
	});
});
