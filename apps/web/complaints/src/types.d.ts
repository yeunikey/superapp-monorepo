interface ApiResponse<T = undefined> {
    statusCode: number,
    message?: string,
    data: T
}

export {
    ApiResponse
}