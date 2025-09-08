import xior from 'xior';

export const defaultOptions: Record<string, string> = {
    'Content-Type': 'application/json; charset=utf-8',
    'Accept': 'application/json'
};

export const host = `http://${process.env.NEXT_PUBLIC_HOST}`;
export const baseURL = `http://${process.env.NEXT_PUBLIC_HOST}:1000/v1`;

export const api = xior.create({
    baseURL: `${baseURL}`,
    headers: defaultOptions
});

export const imageApi = xior.create({
    baseURL: `${baseURL}/images`,
});
