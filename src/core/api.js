import axios from 'axios';

const defaultConfig = {
	headers: {
		'Content-Type': 'application/json',
	},
	timeout: 120 * 1000, // 120s
};

const get = async (url, config = defaultConfig) => {
	const { data } = await axios.get(url, config);
	return data;
};

const post = async (url, body, config = defaultConfig) => {
	const { data } = await axios.post(url, body, config);
	return data;
};

const api = {
	get,
	post,
};

export default api;
