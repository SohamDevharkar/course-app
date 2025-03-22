import "dotenv/config";
import MongoStore from "connect-mongo";

const MONGODB_URL = process.env.MONGO_URL;
const ADMIN_SESSION_SECRET = process.env.SESSION_ADMIN_SECRET;
const USER_SESSION_SECRET = process.env.SESSION_USER_SECRET;

export const adminSessionConfig = {
    secret: ADMIN_SESSION_SECRET,
    resave: false, //for each request, if true it will reset the session cookie.
    saveUninitialized: false, // saves session object in session store only when session object is modified. Discourages saving empty or unchanged session objects.
    store: MongoStore.create({ mongoUrl: MONGODB_URL})
}

export const userSessionConfig = {
    secret: USER_SESSION_SECRET,
    resave: false, //for each request, if true it will reset the session cookie.
    saveUninitialized: false, // saves session object in session store only when session object is modified. Discourages saving empty or unchanged session objects.
    store: MongoStore.create({ mongoUrl: MONGODB_URL})
}

