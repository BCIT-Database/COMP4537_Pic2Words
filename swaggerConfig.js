export const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Pic2Words API",
      version: "1.0.0",
      description: "Automatically generated API documentation",
    },
    servers: [
      {
        url: "http://localhost:5000/api",
        description: "Local Development Server",
      },
      {
        url: "https://stingray-app-jmrty.ondigitalocean.app/api",
        description: "Production Server",
      },
      {
        url: "http://localhost:8080/py_api",
        description: "Local Development python Server",
      },
      {
        url: "https://urchin-app-5vle5.ondigitalocean.app/py_api",
        description: "Production python Server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT", // Optional
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./server/routes/*.js", "./py_server/*.py"], // 어노테이션이 있는 파일 경로
};
