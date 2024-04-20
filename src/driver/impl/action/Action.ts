import * as dotenv from 'dotenv';
import { logger } from '../../../logger';
import { IAction, IBaseParams } from '../../interface/action/IAction';
import { IJobContext } from '../../interface/job/IJob';

dotenv.config();

export class Action implements IAction {
	type: string;
	desc: string;
	params: IBaseParams;
	jobContext: IJobContext;
	output: string[];

	constructor(action: IAction, jobContext: IJobContext) {
		logger.debug(action.type);
		const { type, params, desc, output } = action;
		this.type = type;
		this.desc = desc;
		this.params = params;
		this.jobContext = jobContext;
		this.output = output;

		logger.debug(this.params);
	}
	async onStart(): Promise<void> {
		throw new Error('Method not implemented for this Action');
	}
	async onComplete(): Promise<void> {
		throw new Error('Method not implemented for this Action');
	}

	async action(): Promise<void> {
		throw new Error('Method not implemented for this Action');
	}
}
