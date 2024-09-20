const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Analise de Dados Oncologico",
      version: "1.0.0",
      description: "API Analise de Dados Oncologico",
    },
    servers: [
      {
        url: "http://localhost:3000/api",
        description: "Servidor de desenvolvimento",
      },
    ],
  },
  apis: ["./routes/*.js"], // Caminho para os arquivos de rotas da sua API
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
