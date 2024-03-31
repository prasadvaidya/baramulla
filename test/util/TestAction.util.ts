import { Action, IAction, IJobContext } from '../../types';

export class TestAction extends Action {
	constructor(action: IAction, jobContext: IJobContext) {
		super(action, jobContext);
	}
	async onStart(): Promise<void> {}
	async onComplete(): Promise<void> {}
	async action(): Promise<void> {}
}
