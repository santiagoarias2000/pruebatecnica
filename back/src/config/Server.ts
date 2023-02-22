import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import express from "express";
import ConnectionDB from "./ConnectionDB";
import UserRoutes from "../routes/UserRoutes";
class Server{
    public app: express.Application;

    constructor() {
        dotenv.config({ path: "variables.env" });
        ConnectionDB();
        this.app = express();
        this.loadConfigurations();
        this.loarRoutes();
    }

    public loadConfigurations() {
        this.app.set("PORT", process.env.PORT);
        this.app.use(cors());
        this.app.use(morgan("dev"));
        this.app.use(express.json({ limit: "20mb" }));
        this.app.use(express.urlencoded({ extended: true }));
    }

    public loarRoutes() {
       this.app.use("/api/public/user", UserRoutes)
    }


    public startBackend() {
        this.app.listen(this.app.get("PORT"), () => {
            console.log("Server to up!!! ", this.app.get("PORT"));
        })
    }
}
export default Server;