export class errorHandler extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode=statusCode;
    }
}

export const errorMiddleware=(error,req,res,next)=>{
    error.message = error.message || "Internal server error";
    error.statusCode=error.statusCode || 500;

    if(error.code===11000){
        const message=`Duplicate ${Object.keys(error.keyValue)} entered already`
        error=new errorHandler(message,400);
    }
    if(error.name ==="TokenExpiredError"){
        const message="Json web token expired try again";
        error= new errorHandler(message,400);
    }
    if(error.name==="CastError"){
        const message=`Invalid ${error.path}`;
        error=new errorHandler(message,400);

    }

    const errorMessage= error.errorMessage
    ?Object .values (error.errorMessage)
    .map((error)=> error.message)
    .join(" ")
    :error.message;    
    
    
    return res.status(error.statusCode).json({
        success:false,
        message:errorMessage,
    })
}

export default errorHandler;