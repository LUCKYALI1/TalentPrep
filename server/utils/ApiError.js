class ApiError extends Error {
    constructor(statusCode  , message = "Something went wrong" , errors = []){
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
        this.date = null;
        this.success = false;
    }
}
export default ApiError;