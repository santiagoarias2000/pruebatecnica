"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importDefault(require("../controller/UserController"));
class UserRoute {
    constructor() {
        this.apiRouteUser = (0, express_1.Router)();
        this.loadRoutes();
    }
    loadRoutes() {
        this.apiRouteUser.post("/logIn", UserController_1.default.logIn);
        this.apiRouteUser.get("/all", UserController_1.default.seeAll);
        this.apiRouteUser.post("/create", UserController_1.default.create);
    }
}
const userRoute = new UserRoute();
exports.default = userRoute.apiRouteUser;
