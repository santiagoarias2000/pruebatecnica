import { Router } from "express";
import userController from "../controller/UserController";

class UserRoute {
    public apiRouteUser : Router;

    constructor(){
        this.apiRouteUser = Router();
        this.loadRoutes();
    }

    public loadRoutes(): void {
        this.apiRouteUser.post("/logIn", userController.logIn);
        this.apiRouteUser.get("/all", userController.seeAll);
        this.apiRouteUser.post("/create", userController.create);
    }   

}
const userRoute = new UserRoute();
export default userRoute.apiRouteUser;