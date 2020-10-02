export const testSequence = {
	VERIFY_URL: 'VERIFY_URL',
	DOWNLOAD_HTML: 'DOWNLOAD_HTML',
	DOWNLOAD_ASSETS: 'DOWNLOAD_ASSETS',
	OPTIMIZE_ASSETS: 'OPTIMIZE_ASSETS',
	INIT_CLONED_SITE: 'INIT_CLONED_SITE',
	PERFORMING_TEST: 'PERFORMING_TEST',
};

export const testSequenceLabels = {
	[testSequence.VERIFY_URL]: 'Verify site URL',
	[testSequence.DOWNLOAD_HTML]: 'Download HTML',
	[testSequence.DOWNLOAD_ASSETS]: 'Download CSS, JavaScript, Images...',
	[testSequence.OPTIMIZE_ASSETS]: 'Optimize Images & Fonts',
	[testSequence.INIT_CLONED_SITE]: 'Initialize Cloned Site on Rocket',
	[testSequence.PERFORMING_TEST]: 'Performing Test',
};

export const TestProgressStatus = {
	PENDING: 'PENDING',
	IN_PROGRESS: 'IN_PROGRESS',
	DONE: 'DONE',
};

export const initialTestProgress = {
	[testSequence.VERIFY_URL]: TestProgressStatus.PENDING,
	[testSequence.DOWNLOAD_HTML]: TestProgressStatus.PENDING,
	[testSequence.DOWNLOAD_ASSETS]: TestProgressStatus.PENDING,
	[testSequence.OPTIMIZE_ASSETS]: TestProgressStatus.PENDING,
	[testSequence.INIT_CLONED_SITE]: TestProgressStatus.PENDING,
	[testSequence.PERFORMING_TEST]: TestProgressStatus.PENDING,
};

export const rerunTestProgress = {
	[testSequence.VERIFY_URL]: TestProgressStatus.DONE,
	[testSequence.DOWNLOAD_HTML]: TestProgressStatus.DONE,
	[testSequence.DOWNLOAD_ASSETS]: TestProgressStatus.DONE,
	[testSequence.OPTIMIZE_ASSETS]: TestProgressStatus.DONE,
	[testSequence.INIT_CLONED_SITE]: TestProgressStatus.DONE,
	[testSequence.PERFORMING_TEST]: TestProgressStatus.IN_PROGRESS,
};
