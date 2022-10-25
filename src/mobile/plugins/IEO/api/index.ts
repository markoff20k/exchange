import axios from 'axios';

const instance = axios.create({
	baseURL: 'http://www.fortem1.com.br/ieo',
	headers: {
		'Access-Control-Allow-Origin': '*',
		'Content-Type': 'application/json',
	},
});

// tslint:disable-next-line: no-default-export
export default instance;
