export const errorResponse = (message = "Something went worng, Please try again.") => {
    const results = { message }
    return {
        is_success: false, results
    }
}
export const successResponse = (data = {}) => {
    return { is_success: true, results: data }
}