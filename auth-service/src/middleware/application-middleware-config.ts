import { Express } from "express";
import { json } from "body-parser";
import helmet from "helmet";
import cors from "cors";
import swaggerUi from "swagger-ui-express";

import { swaggerJSDocSpecs } from "../config/swagger-config";

/**
 * this is for the configer the application middleware
 * @param app the express application
 * @returns void
 */
const configApplicationMiddleware = (app: Express) => {
    // swagger ui
    app.use(
        "/api/v1/auth/api-docs",
        swaggerUi.serve,
        swaggerUi.setup(swaggerJSDocSpecs, {
            swaggerOptions: {
                docExpansions: "none",
                persistAuthorization: true,
            },
        })
    );

    app.use(json());

    /*
     * cors configuration
     */
    const corsOptions = {
        origin: [
            "http://nsbm-promentor.tech",
            "https://nsbm-promentor.tech",
            "http://nsbm-promentor.local:3000",
            "https://nsbm-promentor.local:3000",
            "http://nsbm-promentor.local",
            "https://nsbm-promentor.local",
            "http://nsbm-promentor.dev",
            "https://nsbm-promentor.dev",
            "http://nsbm-promentor.dev:3000",
            "https://nsbm-promentor.dev:3000",
            "http://nsbm.app.promentor.local:3000",
            /^http:\/\/[a-zA-Z-]+\.app\.promentor\.local:3000$/,
            /^http:\/\/[a-zA-Z-]+\.app\.promentor\.local:8081$/,
            "http://localhost:8081",
            "https://pro-mentor.live",
        ],
        method: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    };

    app.use(helmet());
    app.use(cors(corsOptions));
};

export default configApplicationMiddleware;
