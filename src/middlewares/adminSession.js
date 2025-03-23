import session from "express-session";
import { adminSessionConfig } from "../configs/sessionConfig.js";

const adminSessionMiddleware = session(adminSessionConfig);

export default adminSessionMiddleware;