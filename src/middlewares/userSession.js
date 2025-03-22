import session from "express-session";
import { userSessionConfig } from "../configs/sessionConfig";

export default userSessionMiddleware = session(userSessionConfig);
