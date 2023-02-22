"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserEntity {
    constructor(name, correo, pass, type) {
        this.nameUser = name;
        this.emailUser = correo;
        this.passwordUser = pass;
        this.typeUser = type;
    }
}
exports.default = UserEntity;
