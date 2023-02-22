import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

class Security {

  public verificarToken(req: Request, res: Response, next: NextFunction): any {
    if (!req.headers.authorization) {
      res.status(401).json({
        respuesta: "Petición negada por el sistema de seguridad",
      });
    } else {
      try {
        const llavePrivada = String(process.env.PASS_SECRET);
        const token = req.headers.authorization?.split(" ")[1] as string;
        const datos = jwt.verify(token, llavePrivada);
        req.body.datosUsuario = datos;
        next();
      } catch (error) {
        res.status(401).json({ respuesta: "Intento de fraude" });
      }
    }
  }

}
const seguridad = new Security();
export default seguridad;
