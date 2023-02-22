import { Response } from "express";
import UserScheme from "../schemes/UserScheme";
import jwt from "jsonwebtoken";
import encrypCrack from "bcryptjs";

class UserDAO {

    protected static async verifySession(parametres: any, res: Response){
        const theEmail = parametres.emailUser;
        const thePass = parametres.passwordUser;

        UserScheme.findOne({emailUser: theEmail}).exec((error, objectOk)=>{ //El exec tiene dos valores, una q es el error y otro que es el objeto
            if(objectOk){
                const passOk = encrypCrack.compareSync(thePass, objectOk.passwordUser);//compareSync requiere las dos contraseñas que se quieren comparar,"The pass" la primera del front y "objectoOk.passwordUser"la otra del back
                if (passOk) {
                    const elPayLoad = {
                        codUser: objectOk._id,
                        correo: parametres.emailUser,
                        nombre: objectOk.nameUser,
                        typeUser: parametres.typeUser

                    };
                    const myKey = String(process.env.PASS_SECRET);
                    const myTokencito = jwt.sign(elPayLoad, myKey, {expiresIn: 86400}); //Tiempo en el que va a expirar el token (1 dia = 86400) 
                    res.status(200).json({tokenUsta: myTokencito})    
                }else{
                    res.status(400).json({respuesta: "Credenciales NO Válidas"})
                }
                
            }else{
                res.status(400).json({respuesta: "Credenciales NO Válidas"}) 
                       
            }
        });
        

    }

    protected static async consultUser(res: Response): Promise<any> {
        const myUsers = await UserScheme.find().sort({ _id: -1 });
        res.status(200).json(myUsers);

    }

    protected static async createUser(email: any,parametres: any, res: Response): Promise<any> {
        const profile = String(process.env.PROFILE_DEFECT);
        const exist = await UserScheme.findOne(email).exec();//"exec()" Perimte hacer funciones flecha, por dentro, para personalizar resultados
        if (exist) {
            res.status(400).json({ respuesta: "Email is yet already" })

        } else {
            parametres.passwordUser = encrypCrack.hashSync(parametres.passwordUser, 10); 
            const myUser = new UserScheme(parametres);
            myUser.save((error, objectOk) => {
                if (error) {
                    console.log(error);
                    res.status(400).json({ respuesta: "Don't be save!!" })
                } else {

                    const elPayLoad = {
                        codUser: objectOk._id,
                        correo: parametres.emailUser
                    };
                    const myKey = String(process.env.PASS_SECRET);
                    const myTokencito = jwt.sign(elPayLoad, myKey, {expiresIn: 86400}); //Tiempo en el que va a expirar el token (1 dia = 86400) 
                    res.status(200).json({tokenUsta: myTokencito})
                }
            });
        }
    }
}
export default UserDAO;