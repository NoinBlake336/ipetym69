import express,{Express} from 'express';
import config from '../config';
import { connectDB } from '../db';
import bodyParser from 'body-parser';
import { boomErrorHandler, errorHandler, logErrors } from '../middlewares/error.handler';
import { Router } from '../routers';



export class Server {
    app: Express

    constructor(){
        this.app = express();
        this.dbConnection();
        this.middlewares();
        this.router();
        this.errorHandler();
        this.listen();
    };

    async dbConnection(): Promise<void>{
        await connectDB();
    };

    middlewares(){
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended:false}));

    };

    errorHandler(){
        this.app.use(logErrors);
        this.app.use(errorHandler);
        this.app.use(boomErrorHandler);
    }


    router(): void{
        Router(this.app);
    }


    listen(): void{
        this.app.listen(config.port, ()=>{
            console.log('Bienvenido al servidor')
        });
    }
}