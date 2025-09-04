import xior from 'xior';

export const defaultOptions: Record<string, string> = {
    'Content-Type': 'application/json; charset=utf-8',
    'Accept': 'application/json'
};


export const host = `http://${process.env.NEXT_PUBLIC_HOST}`;

export const userApi = xior.create({
    baseURL: `${host}:4001`,
    headers: defaultOptions
});


export const authApi = xior.create({
    baseURL: `${host}:4002`,
    headers: defaultOptions
});

export const imageApi = xior.create({
    baseURL: `${host}:4003`,
});

export const newsApi = xior.create({
    baseURL: `${host}:4004`,
    headers: defaultOptions
});