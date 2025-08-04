import xior from 'xior';

export const defaultOptions: Record<string, string> = {
    'Content-Type': 'application/json'
}

// export const baseUrl = 'http://172.20.10.3:3001/v1'
export const baseUrl = 'http://192.168.10.4:4002'
// export const baseUrl = 'https://panel-api.flood.astanait.edu.kz/v1'

export const api = xior.create({
    baseURL: baseUrl,
    headers: defaultOptions
});

export const vapi = xior.create({
    baseURL: baseUrl
});