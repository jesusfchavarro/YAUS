import * as bodyParser from "body-parser";
import chalk from "chalk";
import * as express from 'express';
import * as http from "http";
import * as methodOverride from "method-override";
import "./controllers/helloWorldController";
import { RegisterRoutes } from "./routes";
import * as swaggerUI from "swagger-ui-express";

import * as swaggerJSON from './swagger.json';

const log = console.log;

const server = () => {
  const app = express()
    .use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json())
    .use(methodOverride())
    
    .use((_req: any, res: any, next: Function) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        `Origin, X-Requested-With, Content-Type, Accept, Authorization`,
      );
      next();
    });


    app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJSON));

    RegisterRoutes(app);


    const port = process.env.PORT ? process.env.PORT : 1202;

    return new Promise<http.Server>((resolve) => {
        const s = app.listen(port, () => {
            log(chalk.blueBright(`✓ Started API server at http://localhost:${port}`));
            log(chalk.greenBright(`✓ Started Swagger UI at http://localhost:${port}/docs`));
            resolve(s);
        });
    });
};

server();