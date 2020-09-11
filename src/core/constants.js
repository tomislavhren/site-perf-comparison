
export const testSequence = {
	VERIFY_URL: 'VERIFY_URL',
	DOWNLOAD_HTML: 'DOWNLOAD_HTML',
	DOWNLOAD_ASSETS: 'DOWNLOAD_ASSETS',
	OPTIMIZE_ASSETS: 'OPTIMIZE_ASSETS',
	INIT_CLONED_SITE: 'INIT_CLONED_SITE',
	START_TIMER: 'START_TIMER',
};

export const testSequenceLabels = {
	[testSequence.VERIFY_URL]: 'Verify site URL',
	[testSequence.DOWNLOAD_HTML]: 'Download HTML',
	[testSequence.DOWNLOAD_ASSETS]: 'Download CSS, JavScript, Images...',
	[testSequence.OPTIMIZE_ASSETS]: 'Optimize Images & Fonts',
	[testSequence.INIT_CLONED_SITE]: 'Initialize Cloned Site on Rocket',
	[testSequence.START_TIMER]: 'Start Timer',
};

export const testSequenceStatus = {
	PENDING: 'PENDING',
	IN_PROGRESS: 'IN_PROGRESS',
	DONE: 'DONE',
};
