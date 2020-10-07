import api from './api';
import * as utils from './utils';

export const startCloner = async url => {
	const { job_id } = await api.post(`https://speed.onrocket.com/api/start`, {
		url,
	});
	return job_id;
};

export const getClonerStatus = async (jobId, callback) => {
	const response = await api.get(`https://speed.onrocket.com/api/status?job=${jobId}`);
	switch (response.state) {
		case 'SUCCESS':
			return response.output; // we received URL
		case 'PENDING':
		case 'VERIFYING':
			await utils.wait(0.5);
			return await getClonerStatus(jobId, callback);
		case 'DOWNLOAD_HTML':
		case 'DOWNLOAD_FILES':
			callback(response.state, {
				filesDone: response.statistics.files_done,
				filesCount: response.statistics.files_count,
			});
			await utils.wait(0.5);
			return await getClonerStatus(jobId, callback);
		default:
			return;
	}
};

export const cloneWebsite = async url => {
	//const { new_url } = await api.post(`https://speed.onrocket.com/api/full`, {
	//	url,
	//});
	//return new_url;

	return Promise.resolve('https://compare.onrocket.com/bluesy-saffron-drever');
};

export const fetchPerformanceResults = async url => {
	const performanceResults = await api.post(`https://report.onrocket.com/api/gtmetrix`, { url });
	return performanceResults;
	//// FOR TESTING PURPOSES
	//const mock = {
	//	backend_duration: 76,
	//	connect_duration: 1,
	//	dom_content_loaded_duration: 0,
	//	dom_content_loaded_time: 913,
	//	dom_interactive_time: 913,
	//	first_contentful_paint_time: 828,
	//	first_paint_time: Math.floor(Math.random() * 2000),
	//	fully_loaded_time: 1099,
	//	html_bytes: 4870,
	//	html_load_time: Math.floor(Math.random() * 1000),
	//	onload_duration: 0,
	//	onload_time: 921,
	//	page_bytes: 399657,
	//	page_elements: 17,
	//	page_load_time: Math.floor(Math.random() * 3000),
	//	pagespeed_score: Math.floor(Math.random() * 101),
	//	redirect_duration: 178,
	//	report_url: 'https://gtmetrix.com/reports/www.horseandradish.com/fXDMQeLl',
	//	rum_speed_index: 828,
	//	yslow_score: Math.floor(Math.random() * 101),
	//};

	//return mock;
};
