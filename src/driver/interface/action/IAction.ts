import { IJobContext } from '../job/IJob';

export interface IActionClasses {
	[key: string]: any;
}

export let ActionClasses: IActionClasses = {};

export type Params = string | undefined;

export interface IAction {
	type: string;
	desc: string;
	params: IBaseParams;
	jobContext: IJobContext;
	output: string[];

	action(): Promise<void>;
	onStart(): Promise<void>;
	onComplete(): Promise<void>;
}

export interface IBaseParams {
	[key: string]: string;
}
