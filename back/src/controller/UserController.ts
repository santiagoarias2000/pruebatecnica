import { Response, Request } from "express";
import UserDAO from "../dao/UserDAO";

class UserController extends UserDAO {

    public logIn(req: Request, res: Response): void {
        UserController.verifySession(req.body, res);
    }
    public seeAll(req: Request, res: Response): void {
        UserController.consultUser(res);
    }
    public create(req: Request, res: Response): void {
        const email = {emailUser: req.body.emailUser}; 
        UserController.createUser(email,req.body,res);
    }
}
const userController = new UserController();
export default userController;