import xior from 'xior';

export const defaultOptions: Record<string, string> = {
    'Content-Type': 'application/json; charset=utf-8',
    'Accept': 'application/json'
};


// export const baseUrl = 'http://172.20.10.3:3001/v1'
export const host = `http://${process.env.HOST}`;
export const baseURL = `http://${process.env.HOST}:1000/v1`;
// export const baseUrl = 'https://panel-api.flood.astanait.edu.kz/v1'

export const api = xior.create({
    baseURL: `${baseURL}`,
    headers: defaultOptions
});

export const imageApi = xior.create({
    baseURL: `${baseURL}/images`,
});