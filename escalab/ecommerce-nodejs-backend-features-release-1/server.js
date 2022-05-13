const express = require("express");
//const mongoose = require("mongoose");
const connectDB = require("./database");
const morgan = require("morgan");
//const bodyParser = require("body-parser");
const cors = require("cors");
const { readdirSync } = require("fs");
require("dotenv").config();
const swaggerUI = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerConfig = require("./documentation/swagger.config.json");

// app
const app = express();

/*const swaggerConfig = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Ecommerce MERN",
      version: "1.0.0",
      description: "Information about API and endpoints",
      contact: {
        name: "Miguel Chamorro",
        url: "https://escalab.academy/",
        email: "mchamorro@escalab.academy",
      },
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
    },
    components: {
      securitySchemes: {
        firebase: {
          authorizationUrl: "",
          flow: "implicit",
          type: "oauth2",
          x-google-issuer: "https://securetoken.google.com/ecommerce-sodimac",
          x-google-jwks_uri: "https://www.googleapis.com/service_accounts/v1/metadata/x509/securetoken@system.gserviceaccount.com",
          x-google-audiences: "YOUR-PROJECT-ID",
        },
      },
    },
    security: [
      {
        firebase: []
      },
    ],
    servers: [
      {
        url: "http://localhost:8000",
        description: "Development Server",
      },
      {
        url: "http://256489656656.aws.amazon.com",
        description: "Production Server",
      },
    ],
  },
  apis: ["./routes/*.js"],
};*/

const swaggerDocs = swaggerJsdoc(swaggerConfig);

app.use(
  "/api/docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocs, { explorer: true })
);

// db
/*mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.log("DB CONNECTION ERR", err));*/

// db
connectDB();

// middlewares
app.use(morgan("dev"));
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// routes middleware
readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));

// port
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
