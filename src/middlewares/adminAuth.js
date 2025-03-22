const adminAuthMiddleware = function(req, res, next) {
    if(req.session && req.sessison.adminId) {
        req.adminId = req.session.adminId;
        next()
    } else {
        console.log("Unauthorized not logged in")
        return res.status(401).json({ message: "Unauthorized "});
    }
}

export default adminAuthMiddleware;
