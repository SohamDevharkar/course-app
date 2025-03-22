const exceptionHandler = (err,req, res, next) => {
    console.log(err.stack);
    res.status(500).json({error: "internal server error"});
}

export {
    exceptionHandler
}