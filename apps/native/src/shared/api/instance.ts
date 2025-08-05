import xior from 'xior';

export const defaultOptions: Record<string, string> = {
    'Content-Type': 'application/json; charset=utf-8',
    'Accept': 'application/json'
};


// export const baseUrl = 'http://172.20.10.3:3001/v1'
export const host = `http://${process.env.HOST}`;
export const baseUrl = `${host}:4002`
// export const baseUrl = 'https://panel-api.flood.astanait.edu.kz/v1'

export const api = xior.create({
    baseURL: baseUrl,
    headers: defaultOptions
});

export const vapi = xior.create({
    baseURL: 'http://192.168.88.156:4003'
});