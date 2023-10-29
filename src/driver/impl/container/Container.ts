import { IContext } from '../../../../entrypoint';
import { IMessage } from '../../../broker/interface/IMessage';
import { IContainer, IContainerResult } from '../../interface/container/IContainer';
import { IJob, IJobContext } from '../../interface/job/IJob';
import { Job } from '../job/Job';

interface JobDependencies<T extends IMessage, U extends IMessage> {
	dependencies: string[];
	jobInstance: IJob<T, U>;
}
interface Jobs<T extends IMessage, U extends IMessage> {
	[key: string]: JobDependencies<T, U>;
}

export class Container<T extends IMessage, U extends IMessage> implements IContainer<T, U> {
	version!: string;
	workflow!: IJob<T, U>[];
	context: IJobContext = {};
	consumerContext: IContext;
	jobs: Jobs<T, U> = {};

	constructor(parsedDoc: IContainer<T, U>, consumerContext: IContext) {
		const { version, workflow } = parsedDoc;
		this.version = version;
		this.workflow = workflow;
		this.consumerContext = consumerContext;
	}

	initContainer(): IContainerResult {
		const jobs: Jobs<T, U> = this.jobs;

		for (let job of this.workflow) {
			jobs[job.name] = {
				dependencies: [],
				jobInstance: new Job(job, this.consumerContext)
			};
		}

		for (let job of this.workflow) {
			job.dependsOn?.map((dependency) => jobs[dependency].dependencies.push(job.name));
		}
		return { success: true } as IContainerResult;
	}
}
