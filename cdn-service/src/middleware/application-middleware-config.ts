import { Express } from "express";
import { json } from "body-parser";
import helmet from "helmet";
import cors from "cors";

/**
 * this is for the configer the application middleware
 * @param app the express application
 * @returns void
 */
const configApplicationMiddleware = (app: Express) => {

    app.use(json());

    /*
     * cors configuration
     */
    const corsOptions = {
        origin: [
            /^http:\/\/[a-zA-Z-]+\.app\.promentor\.local:3000$/,
            /^http:\/\/[a-zA-Z-]+\.app\.promentor\.local:8081$/,
            "http://localhost:8081",
        ],
        method: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    };

    app.use(helmet({
        crossOriginResourcePolicy: false,
    }));
    app.use(cors(corsOptions));
};

export default configApplicationMiddleware;
