import yaml from 'yamljs';

import { Consumer, Container, IContainer, IContext, IMessage } from '../../../types';
import { TestAction } from '../../util/TestAction.util';

describe('Test Container class', () => {
	let container: Container<IMessage, IMessage> | undefined;
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

	test('run instance', async () => {
		container = new Container(parsedDoc, consumerContext);

		const initContainerSpy = jest.spyOn(container, 'initContainer');

		const result = container.initContainer();

		expect(initContainerSpy).toHaveBeenCalledTimes(1);
	});
});
