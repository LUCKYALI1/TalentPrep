import {validationResult} from "express-validator";
import ApiError from "../utils/apiError.js";

const validate = (req , res , next) => {
    const error = validationResult(req);
    if( !error.isEmpty() ){
        const errorMessage = error.array().map((err ) => err.msg)
        return res.status(400).json(new  ApiError(400, "Validation failed", errorMessage));
    }
    next();
};

export default validate;