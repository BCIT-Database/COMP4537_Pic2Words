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
        url: "http://localhost:8080/api",
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
  apis: ["./server/routes/*.js"], // 어노테이션이 있는 파일 경로
};
