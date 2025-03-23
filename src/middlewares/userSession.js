import session from "express-session";
import { userSessionConfig } from "../configs/sessionConfig.js";

const userSessionMiddleware = session(userSessionConfig);

export default userSessionMiddleware;
