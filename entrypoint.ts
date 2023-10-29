import yaml from 'yamljs';
import { Container } from './src/driver/impl/container/Container';
import { logger } from './src/logger';
import { IActionClasses } from './src/driver/interface/action/IAction';

export interface IContext {
	actionClasses: IActionClasses;
}

export const entryPoint = (context: IContext) => {
	logger.debug('Workflow started');
	try {
		// TODO: Load yaml files dynamically
		const doc = yaml.load('<PATH/TO/YAML>');

		const container = new Container(doc, context);
		container.initContainer();
		return container;
	} catch (e) {
		logger.error(e);
	}
};
