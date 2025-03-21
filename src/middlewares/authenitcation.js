function auth(req, res, next) {
    if(req.session.userId) {
        next()
    } else {
        console.log("Unauthorized not logged in")
        res.status(401).send("Unauthorized not logged in");
    }
}

export { auth }