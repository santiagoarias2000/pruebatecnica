"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserScheme_1 = __importDefault(require("../schemes/UserScheme"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class UserDAO {
    static verifySession(parametres, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const theEmail = parametres.emailUser;
            const thePass = parametres.passwordUser;
            UserScheme_1.default.findOne({ emailUser: theEmail }).exec((error, objectOk) => {
                if (objectOk) {
                    const passOk = bcryptjs_1.default.compareSync(thePass, objectOk.passwordUser); //compareSync requiere las dos contraseñas que se quieren comparar,"The pass" la primera del front y "objectoOk.passwordUser"la otra del back
                    if (passOk) {
                        const elPayLoad = {
                            codUser: objectOk._id,
                            correo: parametres.emailUser,
                            nombre: objectOk.nameUser,
                            typeUser: parametres.typeUser
                        };
                        const myKey = String(process.env.PASS_SECRET);
                        const myTokencito = jsonwebtoken_1.default.sign(elPayLoad, myKey, { expiresIn: 86400 }); //Tiempo en el que va a expirar el token (1 dia = 86400) 
                        res.status(200).json({ tokenUsta: myTokencito });
                    }
                    else {
                        res.status(400).json({ respuesta: "Credenciales NO Válidas" });
                    }
                }
                else {
                    res.status(400).json({ respuesta: "Credenciales NO Válidas" });
                }
            });
        });
    }
    static consultUser(res) {
        return __awaiter(this, void 0, void 0, function* () {
            const myUsers = yield UserScheme_1.default.find().sort({ _id: -1 });
            res.status(200).json(myUsers);
        });
    }
    static createUser(email, parametres, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const profile = String(process.env.PROFILE_DEFECT);
            const exist = yield UserScheme_1.default.findOne(email).exec(); //"exec()" Perimte hacer funciones flecha, por dentro, para personalizar resultados
            if (exist) {
                res.status(400).json({ respuesta: "Email is yet already" });
            }
            else {
                parametres.passwordUser = bcryptjs_1.default.hashSync(parametres.passwordUser, 10);
                const myUser = new UserScheme_1.default(parametres);
                myUser.save((error, objectOk) => {
                    if (error) {
                        console.log(error);
                        res.status(400).json({ respuesta: "Don't be save!!" });
                    }
                    else {
                        const elPayLoad = {
                            codUser: objectOk._id,
                            correo: parametres.emailUser
                        };
                        const myKey = String(process.env.PASS_SECRET);
                        const myTokencito = jsonwebtoken_1.default.sign(elPayLoad, myKey, { expiresIn: 86400 }); //Tiempo en el que va a expirar el token (1 dia = 86400) 
                        res.status(200).json({ tokenUsta: myTokencito });
                    }
                });
            }
        });
    }
}
exports.default = UserDAO;
