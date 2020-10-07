export const TestSequence = {
	VERIFY_URL: 'VERIFY_URL',
	DOWNLOAD_HTML: 'DOWNLOAD_HTML',
	DOWNLOAD_ASSETS: 'DOWNLOAD_ASSETS',
	OPTIMIZE_ASSETS: 'OPTIMIZE_ASSETS',
	INIT_CLONED_SITE: 'INIT_CLONED_SITE',
	PERFORMING_TEST: 'PERFORMING_TEST',
};

export const testSequenceLabels = {
	[TestSequence.VERIFY_URL]: 'Verify site URL',
	[TestSequence.DOWNLOAD_HTML]: 'Download HTML',
	[TestSequence.DOWNLOAD_ASSETS]: 'Download CSS, JavaScript, Images...',
	[TestSequence.OPTIMIZE_ASSETS]: 'Optimize Images & Fonts',
	[TestSequence.INIT_CLONED_SITE]: 'Initialize Cloned Site on Rocket.net',
	[TestSequence.PERFORMING_TEST]: 'Performing Test',
};

export const TestProgressStatus = {
	PENDING: 'PENDING',
	IN_PROGRESS: 'IN_PROGRESS',
	DONE: 'DONE',
};

export const initialTestProgress = {
	[TestSequence.VERIFY_URL]: { status: TestProgressStatus.PENDING },
	[TestSequence.DOWNLOAD_HTML]: {
		status: TestProgressStatus.PENDING,
		filesDone: 0,
		filesCount: 0,
	},
	[TestSequence.DOWNLOAD_ASSETS]: {
		status: TestProgressStatus.PENDING,
		filesDone: 0,
		filesCount: 0,
	},
	[TestSequence.OPTIMIZE_ASSETS]: { status: TestProgressStatus.PENDING },
	[TestSequence.INIT_CLONED_SITE]: { status: TestProgressStatus.PENDING },
	[TestSequence.PERFORMING_TEST]: { status: TestProgressStatus.PENDING },
};

export const rerunTestProgress = {
	[TestSequence.VERIFY_URL]: { status: TestProgressStatus.DONE },
	[TestSequence.DOWNLOAD_HTML]: {
		status: TestProgressStatus.DONE,
		filesDone: 0,
		filesCount: 0,
	},
	[TestSequence.DOWNLOAD_ASSETS]: {
		status: TestProgressStatus.DONE,
		filesDone: 0,
		filesCount: 0,
	},
	[TestSequence.OPTIMIZE_ASSETS]: { status: TestProgressStatus.DONE },
	[TestSequence.INIT_CLONED_SITE]: { status: TestProgressStatus.DONE },
	[TestSequence.PERFORMING_TEST]: { status: TestProgressStatus.IN_PROGRESS },
};
