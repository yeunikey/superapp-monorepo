
// requests 
interface ApiResponse<T> {
    statusCode: number,
    message?: string,
    data: T
}

export {
    ApiResponse
}