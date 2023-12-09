const swaggerJsdoc = require("swagger-jsdoc");
let api = process.env.API_URL;

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "eCommerce API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
    },
    servers: [
      {
        url: "http://localhost:3000/ecommerce/v1",
      },
    ],
    security: [
      {
        bearerAuth: [], // Authorization header with Bearer token
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);

module.exports = {
  specs,
};
