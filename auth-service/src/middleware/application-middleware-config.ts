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
            "http://sltc-promentor.tech",
            "https://sltc-promentor.tech",
            "http://sltc-promentor.local:3000",
            "https://sltc-promentor.local:3000",
            "http://sltc-promentor.local",
            "https://sltc-promentor.local",
            "http://sltc-promentor.dev",
            "https://sltc-promentor.dev",
            "http://sltc-promentor.dev:3000",
            "https://sltc-promentor.dev:3000",
            "http://sltc.app.promentor.local:3000",
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
