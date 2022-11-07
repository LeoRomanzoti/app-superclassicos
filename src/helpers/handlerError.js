export const handlerError = (error) => {
    if (error?.response?.data?.message) {
        return error?.response?.data?.message
    }
    if (error?.response) {
        return JSON.stringify(error?.response?.data)
    }
    return error?.message
}