import session from "express-session";
import { adminSessionConfig } from "../configs/sessionConfig";

export default adminSessionMiddleware = session(adminSessionConfig);