const userAuthMiddleware = function(req, res, next) {
    console.log('Session: ', req.session);
    if(req.session && req.sessison.userId) {
        req.userId = req.session.userId;
        next()
    } else {
        console.log("Unauthorized not logged in")
        return res.status(401).json({ message: "Unauthorized "});
    }
}

export default userAuthMiddleware;
