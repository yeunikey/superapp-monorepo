import xior from 'xior';

export const defaultOptions: Record<string, string> = {
    'Content-Type': 'application/json; charset=utf-8',
    'Accept': 'application/json'
};


export const host = `http://${process.env.NEXT_PUBLIC_HOST}`;

export const api = xior.create({
    baseURL: `${host}:1000/v1`,
    headers: defaultOptions
});

export const vapi = xior.create({
    baseURL: `${host}:1000/v1`,
});
