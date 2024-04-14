import { IContext } from '../../../../entrypoint';
import { IMessage } from '../../../broker/interface/IMessage';
import { IContainer } from '../../interface/container/IContainer';
import { IJob, IJobContext } from '../../interface/job/IJob';
import { Job } from '../job/Job';

interface IJobDependencies {
	[key: string]: string[];
}

interface IJobBundle<T extends IMessage, U extends IMessage> {
	dependencies: string[];
	jobInstance: IJob<T, U>;
}

export interface IJobs<T extends IMessage, U extends IMessage> {
	[key: string]: IJobBundle<T, U>;
}

export class Container<T extends IMessage, U extends IMessage> implements IContainer<T, U> {
	version!: string;
	workflow!: IJob<T, U>[];
	context: IJobContext = {};
	consumerContext: IContext;
	jobs: IJobs<T, U> = {};

	constructor(parsedDoc: IContainer<T, U>, consumerContext: IContext) {
		const { version, workflow } = parsedDoc;
		this.version = version;
		this.workflow = workflow;
		this.consumerContext = consumerContext;
	}

	initContainer(): IJobs<T, U> {
		const jobs: IJobs<T, U> = this.jobs;

		const jobDependenciesObj: IJobDependencies = {};

		for (let job of this.workflow) {
			job?.dependsOn?.forEach((dependency) => {
				if (jobDependenciesObj[dependency]) jobDependenciesObj[dependency].push(job.name);
				else jobDependenciesObj[dependency] = [job.name];
			});
		}

		for (let job of this.workflow) {
			const jobDependencies = jobDependenciesObj[job.name] || [];

			jobs[job.name] = {
				dependencies: jobDependencies,
				jobInstance: new Job(job, this.consumerContext, jobDependencies)
			};
		}
		return jobs;
	}
}
