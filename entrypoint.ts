import yaml from 'yamljs';
import { Container } from './src/driver/impl/container/Container';
import { logger } from './src/logger';
import { IActionClasses } from './src/driver/interface/action/IAction';

export interface IContext {
	actionClasses: IActionClasses;
}

export const entryPoint = (context: IContext, filePath: string) => {
	logger.debug('Workflow started');
	try {
		const doc = yaml.load(filePath);

		const container = new Container(doc, context);
		container.initContainer();
		return container;
	} catch (e) {
		logger.error(e);
	}
};
