import * as utils from './utils';

const headers = {
	'Content-Type': 'application/json',
};

export const cloneWebsite = async url => {
	const response = await fetch(`http://178.128.158.164/api/full`, {
		method: 'POST',
		headers,
		body: JSON.stringify({ url }),
	});

	const { new_url } = await response.json();
	return new_url;
};

export const fetchPerformanceResults = async url => {
	const response = await fetch(`http://64.227.57.174/api/gtmetrix`, {
		method: 'POST',
		headers,
		body: JSON.stringify({ url }),
	});
	const performanceResults = await response.json();
	return utils.extractPerformanceProps(performanceResults);

	// FOR TESTING PURPOSES
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
	//await utils.wait(1);
	//return mock;
};
