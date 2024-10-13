import swaggerJSDoc from "swagger-jsdoc";

/**
 * this is swagger configuration for the project
 */
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Auth Service Service API",
            version: "1.0.0",
        },
        servers: [
            {
                url: `http://${process.env.HOST || "localhost"}:${process.env.PORT || 4000}`,
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    name: "x-auth-token",
                    scheme: "bearer",
                    in: "header",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ["./src/doc/*-doc.ts"], // files containing annotations as above
};

const swaggerJSDocSpecs = swaggerJSDoc(swaggerOptions);

export {
    // eslint-disable-next-line import/prefer-default-export
    swaggerJSDocSpecs,
};
