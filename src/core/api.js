import axios from 'axios';

const defaultConfig = {
	headers: {
		'Content-Type': 'application/json',
	},
	timeout: 120 * 1000, // 120s
};

const post = async (url, body, config = defaultConfig) => {
	const { data } = await axios.post(url, body, defaultConfig);
	return data;
};

const api = {
	post,
};

export default api;
